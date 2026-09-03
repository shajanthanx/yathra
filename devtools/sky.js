/**
 * Development-only: rasterise the hero's sky illustration.
 *
 * `assets/sky.svg` cannot be rendered by react-native-svg — thirteen of its
 * radial gradients inherit their stops through `xlink:href`, which is not
 * supported, and it depends on seven `feGaussianBlur` filters. So the SVG is
 * kept as the source of truth and rasterised once, here, into the PNG the app
 * actually loads. Nothing in this file ships with the application.
 *
 *   node devtools/sky.js [--width 800]
 *
 * The output is deliberately modest: the illustration is soft and has no fine
 * detail, so upscaling it to a phone's pixel density costs nothing visible,
 * while a larger source would only add weight to the bundle.
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

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
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
}

const width = Number(flag('width', '800'));
const aspect = Number(flag('aspect', '0.62'));
const height = Math.round(width * aspect);

/**
 * Which band of the artwork the hero shows.
 *
 * The illustration is a tall scene: plain sky at the top, the mountain ridge
 * and clouds across the middle, dark foreground below. The hero only reveals a
 * shallow strip of it — the rest is behind the inset card — so cropping to the
 * ridge is what makes the artwork visible at all. Full artwork is
 * "0 0 1604.2 1109.8".
 */
const viewBox = flag('viewbox', '0 470 1604.2 500');

const assets = path.join(__dirname, '..', 'assets');
const source = path.join(assets, 'sky.svg');
const page = path.join(assets, '.sky-render.html');
const output = path.join(assets, 'sky.png');

const svg = fs
  .readFileSync(source, 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`)
  // Fill the viewport and crop, rather than letterboxing inside it.
  .replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ');

fs.writeFileSync(
  page,
  `<!doctype html>
<meta charset="utf-8">
<title>sky</title>
<style>
  html, body { margin: 0; padding: 0; background: #050038; overflow: hidden; }
  svg { display: block; width: 100vw; height: 100vh; }
</style>
${svg}
`,
  'utf8',
);

try {
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${width},${height}`,
      '--virtual-time-budget=8000',
      `--screenshot=${output}`,
      pathToFileURL(page).href,
    ],
    { stdio: 'pipe', timeout: 60000 },
  );
} finally {
  fs.rmSync(page, { force: true });
}

const kb = (fs.statSync(output).size / 1024).toFixed(1);
process.stdout.write(`assets/sky.png written at ${width}x${height} (${kb} KB)\n`);
