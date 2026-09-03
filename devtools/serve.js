/**
 * Development-only static server for the exported web build.
 *
 * Serves the single-page export with a fallback to index.html, plus a `/__seed`
 * route that writes a snapshot into localStorage and then navigates to a screen.
 * That lets headless Chrome capture any screen without clicking through the
 * whole app. Nothing here ships with the application.
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '.export-check', 'web');
const SEED_FILE = path.join(__dirname, 'seed-data.json');
const PORT = Number(process.env.PORT || 8090);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function seedPage(nextPath, overrides) {
  const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
  Object.assign(seed, overrides);
  return `<!doctype html><meta charset="utf-8"><title>seeding</title><script>
    try { localStorage.clear(); } catch (e) {}
    const seed = ${JSON.stringify(seed)};
    for (const [key, value] of Object.entries(seed)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    location.replace(${JSON.stringify(nextPath)});
  </script>`;
}

/**
 * Headless Chrome ignores --window-size for the CSS viewport, so the app is
 * rendered inside an iframe of an exact phone size and the frame is captured.
 */
function framePage(innerUrl, width, height) {
  return `<!doctype html><meta charset="utf-8"><title>frame</title>
    <style>html,body{margin:0;padding:0;background:#fff}
    iframe{width:${width}px;height:${height}px;border:0;display:block}</style>
    <iframe src="${innerUrl.replace(/"/g, '&quot;')}"></iframe>`;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/__frame') {
    const inner = url.searchParams.get('src') || '/';
    const width = Number(url.searchParams.get('w') || 390);
    const height = Number(url.searchParams.get('h') || 844);
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(framePage(inner, width, height));
    return;
  }

  if (url.pathname === '/__seed') {
    const next = url.searchParams.get('next') || '/';
    const overrides = {};
    const language = url.searchParams.get('lang');
    const appearance = url.searchParams.get('appearance');
    const fresh = url.searchParams.get('fresh') === '1';

    if (language || appearance) {
      overrides['yathra:settings'] = {
        language: language || 'en',
        appearance: appearance || 'system',
        onboardingComplete: true,
      };
    }
    const state = url.searchParams.get('state');
    if (state === 'active-session') {
      // A session left running, so the study timer and Home's resume banner
      // can both be reviewed.
      overrides['yathra:activeSession'] = {
        id: 'seed-active-session',
        subjectId: 'physics',
        topicId: 'physics:current-electricity/electromagnetic-induction',
        plannedSeconds: 45 * 60,
        accumulatedSeconds: 0,
        runningSince: Date.now() - 12 * 60 * 1000,
        startedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      };
    }
    if (state === 'empty') {
      // A complete profile with nothing recorded against it, so every empty
      // state is reviewed rather than assumed.
      overrides['yathra:tasks'] = [];
      overrides['yathra:sessions'] = [];
      overrides['yathra:topicProgress'] = {};
      overrides['yathra:pastPapers'] = {};
      overrides['yathra:activeSession'] = null;
    }

    if (fresh) {
      // A first launch: no profile, no data, onboarding not yet done. The
      // appearance is still forced so light and dark can both be reviewed.
      const settings = {
        language: language || 'en',
        appearance: appearance || 'system',
        onboardingComplete: false,
      };
      const page = `<!doctype html><meta charset="utf-8"><script>
        try { localStorage.clear(); } catch (e) {}
        localStorage.setItem('yathra:settings', JSON.stringify(${JSON.stringify(settings)}));
        location.replace(${JSON.stringify(next)});
      </script>`;
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(page);
      return;
    }

    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(seedPage(next, overrides));
    return;
  }

  const filePath = path.join(ROOT, decodeURIComponent(url.pathname));
  if (filePath.startsWith(ROOT) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Single-page export: every unknown path is handled by the client router.
  res.writeHead(200, { 'Content-Type': MIME['.html'] });
  fs.createReadStream(path.join(ROOT, 'index.html')).pipe(res);
});

server.listen(PORT, () => {
  process.stdout.write(`serving ${ROOT} on http://localhost:${PORT}\n`);
});
