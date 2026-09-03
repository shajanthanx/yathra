/**
 * Development-only screenshot runner.
 *
 * Drives headless Chrome over every screen at a phone viewport so the UI can be
 * reviewed in all three languages and both themes. Nothing here ships with the
 * application.
 *
 *   node devtools/shots.js [outputDir] [--lang en] [--appearance light]
 *                          [--only home] [--width 390] [--height 844]
 *
 * Screens marked `tall` are captured twice: once at the real viewport, which is
 * what a phone actually shows, and once tall so the part below the fold can be
 * reviewed too. The viewport shot is the authoritative one — an over-tall
 * iframe leaves faint paint artefacts from the fixed tab bar.
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
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
const outDir = path.resolve(args.find((arg) => !arg.startsWith('--')) || 'devtools/shots');
function flag(name, fallback) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
}

const lang = flag('lang', 'en');
const appearance = flag('appearance', 'light');
const port = flag('port', '8090');
const width = Number(flag('width', '390'));
const height = Number(flag('height', '844'));
const only = flag('only', '');

/** How tall a "tall" capture is, so a long screen fits in one image. */
const TALL_HEIGHT = 2400;

/** Screens worth reviewing, with the state each one needs. */
const SCREENS = [
  { name: 'onboarding-language', path: '/onboarding', fresh: true },
  { name: 'onboarding-year', path: '/onboarding/year', fresh: true },
  { name: 'onboarding-stream', path: '/onboarding/stream', fresh: true },
  { name: 'home', path: '/', tall: true },
  { name: 'home-active-session', path: '/', state: 'active-session' },
  { name: 'home-empty', path: '/', state: 'empty', tall: true },
  { name: 'subjects', path: '/subjects' },
  { name: 'subject-physics', path: '/subject/physics', tall: true },
  { name: 'plan', path: '/plan', tall: true },
  { name: 'plan-empty', path: '/plan', state: 'empty' },
  { name: 'task-new', path: '/task', tall: true },
  { name: 'progress', path: '/progress', tall: true },
  { name: 'progress-empty', path: '/progress', state: 'empty' },
  { name: 'weekly-review', path: '/weekly-review', tall: true },
  { name: 'catch-up', path: '/catch-up', tall: true },
  { name: 'study', path: '/study' },
  { name: 'study-running', path: '/study', state: 'active-session' },
  { name: 'past-papers', path: '/past-papers' },
  { name: 'past-papers-physics', path: '/past-papers/physics', tall: true },
  { name: 'more', path: '/more', tall: true },
  { name: 'settings-exam', path: '/settings/exam' },
  { name: 'settings-data', path: '/settings/data' },
  { name: 'settings-profile', path: '/settings/profile' },
  { name: 'settings-about', path: '/settings/about' },
];

fs.mkdirSync(outDir, { recursive: true });

function capture(screen, captureHeight, suffix) {
  const params = new URLSearchParams({ next: screen.path, lang, appearance });
  if (screen.fresh) params.set('fresh', '1');
  if (screen.state) params.set('state', screen.state);

  const inner = `/__seed?${params.toString()}`;
  const frame = new URLSearchParams({ src: inner, w: String(width), h: String(captureHeight) });
  const url = `http://localhost:${port}/__frame?${frame.toString()}`;
  const outFile = path.join(outDir, `${screen.name}${suffix}.png`);

  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-sandbox',
      '--force-device-scale-factor=1',
      `--window-size=${width},${captureHeight}`,
      '--virtual-time-budget=9000',
      `--screenshot=${outFile}`,
      url,
    ],
    { stdio: 'pipe', timeout: 60000 },
  );
}

for (const screen of SCREENS) {
  if (only && !screen.name.includes(only)) continue;

  try {
    capture(screen, height, '');
    if (screen.tall) capture(screen, Math.max(height, TALL_HEIGHT), '-tall');
    process.stdout.write(`${screen.name} ok\n`);
  } catch (error) {
    process.stdout.write(`${screen.name} FAILED: ${error.message.split('\n')[0]}\n`);
  }
}

process.stdout.write(`\nScreenshots in ${outDir}\n`);
