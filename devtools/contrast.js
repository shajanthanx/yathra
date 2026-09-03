/**
 * Development-only contrast check.
 *
 * Reads a captured screenshot and reports the worst-case WCAG contrast ratio
 * between given foreground colours and the pixels actually rendered behind
 * them, over a region of the image. Decoding happens in headless Chrome via a
 * canvas, so this needs no image library. Nothing here ships with the app.
 *
 *   node devtools/contrast.js <png> --region x,y,w,h --fg #ffffff,#d5d7e0
 *
 * This exists because the hero draws text over an illustration. A scrim keeps
 * that legible, but how legible is a property of the composited pixels, not of
 * the token values — so it has to be measured rather than reasoned about.
 * Exits non-zero if any foreground falls below the 4.5:1 body-text bar.
 */
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];

const browser = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
if (!browser) {
  process.stderr.write('No Chrome or Edge found.\n');
  process.exit(1);
}

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--'));
if (!file) {
  process.stderr.write('Usage: node devtools/contrast.js <png> [--region x,y,w,h] [--fg #fff]\n');
  process.exit(1);
}
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
}

const region = flag('region', '').split(',').map(Number);
const foregrounds = flag('fg', '#ffffff').split(',');
const minimum = Number(flag('min', '4.5'));
/**
 * `r,g,b,a` to alpha-composite over every sampled pixel before measuring.
 *
 * This is how the hero's scrim is checked. Measuring a finished screenshot
 * would sample the white glyphs themselves and report 1:1, so the illustration
 * is measured instead with the scrim applied at the lowest alpha it ever
 * reaches — a conservative bound on the real contrast.
 */
const over = flag('over', '');
const debugPort = Number(flag('debug-port', '9334'));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** WCAG relative luminance of an 8-bit channel triple. */
function luminance(r, g, b) {
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function parseHex(hex) {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

const contrast = (a, b) => {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

async function main() {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yathra-contrast-'));
  const chrome = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--allow-file-access-from-files',
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );

  let target = null;
  for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
    await sleep(500);
    try {
      const targets = await fetch(`http://localhost:${debugPort}/json/list`).then((r) => r.json());
      target = targets.find((entry) => entry.type === 'page');
    } catch {
      // Not listening yet.
    }
  }
  if (!target) throw new Error('could not reach Chrome over CDP');

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));

  let nextId = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      nextId += 1;
      pending.set(nextId, resolve);
      socket.send(JSON.stringify({ id: nextId, method, params }));
    });

  await send('Runtime.enable');

  // Read the pixels in the browser and hand back a small histogram rather than
  // megabytes of image data.
  const dataUrl = `data:image/png;base64,${fs.readFileSync(path.resolve(file)).toString('base64')}`;
  const expression = `
    (async () => {
      const image = new Image();
      image.src = ${JSON.stringify(dataUrl)};
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      const [rx, ry, rw, rh] = ${JSON.stringify(
        region.length === 4 ? region : null,
      )} ?? [0, 0, canvas.width, canvas.height];
      const { data } = context.getImageData(rx, ry, rw, rh);
      const pixels = [];
      for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i], data[i + 1], data[i + 2]]);
      }
      return JSON.stringify({ width: canvas.width, height: canvas.height, pixels });
    })()
  `;

  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  socket.close();
  chrome.kill();
  await sleep(500);
  try {
    fs.rmSync(profileDir, { recursive: true, force: true });
  } catch {
    // Harmless.
  }

  const payload = result.result?.result?.value;
  if (!payload) throw new Error('could not read pixels: ' + JSON.stringify(result.result));
  const { width, height, pixels } = JSON.parse(payload);

  // Composite the scrim in sRGB, which is what the renderers do.
  const scrim = over ? over.split(',').map(Number) : null;
  const blend = ([r, g, b]) => {
    if (!scrim) return [r, g, b];
    const [sr, sg, sb, alpha] = scrim;
    return [
      alpha * sr + (1 - alpha) * r,
      alpha * sg + (1 - alpha) * g,
      alpha * sb + (1 - alpha) * b,
    ];
  };

  // The worst case for light text is the lightest pixel behind it.
  let brightest = 0;
  for (const pixel of pixels) {
    const [r, g, b] = blend(pixel);
    const l = luminance(r, g, b);
    if (l > brightest) brightest = l;
  }

  const area = region.length === 4 ? region.join(',') : `0,0,${width},${height}`;
  process.stdout.write(`${path.basename(file)} region ${area} (${pixels.length} px)\n`);

  let failed = false;
  for (const fg of foregrounds) {
    const [r, g, b] = parseHex(fg);
    const ratio = contrast(luminance(r, g, b), brightest);
    const verdict = ratio >= minimum ? 'PASS' : 'FAIL';
    if (ratio < minimum) failed = true;
    process.stdout.write(`  ${fg} worst-case ${ratio.toFixed(2)}:1  ${verdict}\n`);
  }

  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  process.stderr.write(`contrast check failed: ${error.message}\n`);
  process.exit(1);
});
