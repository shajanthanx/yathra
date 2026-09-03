/**
 * Development-only console check.
 *
 * Loads the Expo web dev server with realistic data and reports every console
 * error and warning the app produces, over the Chrome DevTools Protocol. Node
 * exposes a global WebSocket, so this needs no dependencies. Nothing here
 * ships with the application.
 *
 * This is a separate check from the screenshot harness on purpose: that runs
 * against `expo export`, a production bundle, and React DOM's attribute
 * validation and react-native-web's deprecation notices only run in
 * development. A clean production build is not evidence of a clean console.
 *
 *   npx expo start --web --port 8082          # in one shell
 *   node devtools/console.js                  # in another
 *
 * Exits non-zero when anything was logged, so it can be used as a gate.
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
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
}

const appUrl = flag('url', 'http://localhost:8082/');
const lang = flag('lang', 'en');
const appearance = flag('appearance', 'light');
const debugPort = Number(flag('debug-port', '9333'));
/** How long to sit on the loaded app collecting messages. */
const settleMs = Number(flag('settle', '20000'));

const seed = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'),
);
seed['yathra:settings'] = { language: lang, appearance, onboardingComplete: true };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yathra-console-'));
  const chrome = spawn(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
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
      // Chrome is not listening yet.
    }
  }
  if (!target) throw new Error('could not reach Chrome over CDP');

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }));

  let nextId = 0;
  const pending = new Map();
  const messages = [];

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result);
      pending.delete(message.id);
      return;
    }

    if (
      message.method === 'Runtime.consoleAPICalled' &&
      ['error', 'warning'].includes(message.params.type)
    ) {
      messages.push({
        kind: message.params.type,
        text: message.params.args
          .map((arg) => arg.value ?? arg.description ?? arg.preview?.description ?? '')
          .join(' '),
      });
    }

    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails;
      messages.push({
        kind: 'exception',
        text: details.exception?.description ?? details.exception?.value ?? details.text,
      });
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      nextId += 1;
      pending.set(nextId, resolve);
      socket.send(JSON.stringify({ id: nextId, method, params }));
    });

  await send('Runtime.enable');
  await send('Page.enable');

  // Load once to establish the origin, seed it, then load the app for real so
  // the run starts from a profile that actually reaches every screen.
  await send('Page.navigate', { url: appUrl });
  await sleep(6000);
  await send('Runtime.evaluate', {
    expression: `localStorage.clear();${Object.entries(seed)
      .map(
        ([key, value]) =>
          `localStorage.setItem(${JSON.stringify(key)}, ${JSON.stringify(JSON.stringify(value))});`,
      )
      .join('')}true`,
  });

  messages.length = 0;
  await send('Page.navigate', { url: appUrl });
  await sleep(settleMs);

  socket.close();
  chrome.kill();
  // Best-effort: Chrome may still hold the profile directory for a moment after
  // being killed, and failing to delete a temp directory must not fail the check.
  await sleep(500);
  try {
    fs.rmSync(profileDir, { recursive: true, force: true });
  } catch {
    // Left behind in the system temp directory; harmless.
  }

  const seen = new Set();
  const unique = messages.filter((message) => {
    const key = `${message.kind}|${message.text.slice(0, 300)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) {
    process.stdout.write(`Console clean (${lang}, ${appearance}).\n`);
    process.exit(0);
  }

  process.stdout.write(`${unique.length} console message(s):\n\n`);
  for (const message of unique) {
    process.stdout.write(`[${message.kind}] ${message.text.slice(0, 1600)}\n\n`);
  }
  process.exit(1);
}

main().catch((error) => {
  process.stderr.write(`console check failed: ${error.message}\n`);
  process.exit(1);
});
