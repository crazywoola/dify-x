const fs = require('fs/promises');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DECK_PATH = path.resolve(REPO_ROOT, 'agent-systems', 'index.html');
const OUTPUT_ROOT = path.resolve(REPO_ROOT, 'output');
const CHROME_BIN = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DEBUG_PORT = 9222;
const PROFILE_DIR = '/tmp/agent-systems-export-profile';
const WINDOW_WIDTH = 1920;
const WINDOW_HEIGHT = 1080;
const DEVICE_SCALE_FACTOR = 2;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeTitle(title) {
  const normalized = String(title || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  return normalized || 'slide';
}

async function waitForJson(url, timeoutMs = 15000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      // Browser not ready yet.
    }
    await sleep(200);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();

    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve);
      this.ws.addEventListener('error', reject);
    });

    this.ws.addEventListener('message', (event) => {
      const payload = JSON.parse(event.data.toString());
      if (payload.id) {
        const pending = this.pending.get(payload.id);
        if (!pending) return;
        this.pending.delete(payload.id);
        if (payload.error) pending.reject(new Error(payload.error.message));
        else pending.resolve(payload.result);
        return;
      }

      const handlers = this.events.get(payload.method) || [];
      for (const handler of handlers) handler(payload.params || {});
    });
  }

  async connect() {
    await this.ready;
  }

  on(method, handler) {
    const handlers = this.events.get(method) || [];
    handlers.push(handler);
    this.events.set(method, handlers);
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const message = JSON.stringify({ id, method, params });

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(message);
    });
  }

  close() {
    this.ws.close();
  }
}

async function launchChrome() {
  await fs.rm(PROFILE_DIR, { recursive: true, force: true });

  const child = spawn(
    CHROME_BIN,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${PROFILE_DIR}`,
      `--window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT}`,
      'about:blank',
    ],
    {
      stdio: 'ignore',
    }
  );

  return child;
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  return result.result ? result.result.value : undefined;
}

async function main() {
  const chrome = await launchChrome();

  try {
    const targets = await waitForJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find((target) => target.type === 'page');
    if (!pageTarget) throw new Error('Could not find page target');

    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      mobile: false,
    });
    await client.send('Emulation.setDefaultBackgroundColorOverride', {
      color: { r: 0, g: 0, b: 0, a: 0 },
    });

    const deckUrl = pathToFileURL(DECK_PATH).href;
    await client.send('Page.navigate', { url: deckUrl });
    await sleep(1500);

    await evaluate(
      client,
      `(() => new Promise((resolve, reject) => {
        const startedAt = Date.now();
        const check = () => {
          const revealReady = window.Reveal && window.Reveal.isReady && window.Reveal.isReady();
          const imagesReady = Array.from(document.images).every((img) => img.complete);
          if (revealReady && imagesReady) {
            document.fonts.ready.then(resolve);
            return;
          }
          if (Date.now() - startedAt > 15000) {
            reject(new Error('Reveal deck did not become ready in time.'));
            return;
          }
          setTimeout(check, 100);
        };
        check();
      }))()`
    );

    await evaluate(
      client,
      `(() => {
        const style = document.createElement('style');
        style.setAttribute('data-export-style', 'true');
        style.textContent = \`
          html, body, .reveal-viewport, .reveal, .slides, .backgrounds,
          .slide-background, .slide-background-content {
            background: transparent !important;
          }

          .lang-switch,
          .nordic-logo,
          .reveal .controls,
          .reveal .progress,
          .reveal .slide-number {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        \`;
        document.head.appendChild(style);
        Reveal.configure({ controls: false, progress: false, slideNumber: false });
        Reveal.layout();
        return true;
      })()`
    );

    const slides = await evaluate(
      client,
      `(() => {
        const root = document.querySelector('.slides');
        const topSections = Array.from(root.children).filter((node) => node.tagName === 'SECTION');

        function parsePartNumber(text) {
          const value = String(text || '').trim();
          const partMatch = value.match(/part\\s*(\\d+)/i);
          if (partMatch) return Number(partMatch[1]);

          const zhMap = {
            '第一部分': 1,
            '第二部分': 2,
            '第三部分': 3,
            '第四部分': 4,
            '第五部分': 5,
          };

          if (value in zhMap) return zhMap[value];
          return null;
        }

        const topMeta = topSections.map((section, index) => {
          const marker = Array.from(section.children).find((node) => node.tagName === 'SECTION') || section;
          const tagText = marker.querySelector('.section-tag')?.textContent?.trim() || '';
          return {
            index,
            part: parsePartNumber(tagText),
          };
        });

        const partStacks = topMeta.filter((item) => item.part !== null);
        const firstPartIndex = partStacks[0]?.index ?? 0;
        const lastPartIndex = partStacks[partStacks.length - 1]?.index ?? topSections.length - 1;
        const lastPartNumber = partStacks[partStacks.length - 1]?.part ?? 0;

        function folderForTopIndex(topIndex) {
          const directPart = topMeta.find((item) => item.index === topIndex)?.part;
          if (directPart !== null && directPart !== undefined) return 'part-' + directPart;
          if (topIndex < firstPartIndex) return 'part-0-intro';
          if (topIndex > lastPartIndex) return 'part-' + (lastPartNumber + 1) + '-closing';
          return 'part-unknown';
        }

        return Reveal.getSlides().map((slide, index) => {
          const indices = Reveal.getIndices(slide);
          let topLevel = slide;
          while (topLevel.parentElement && !topLevel.parentElement.classList.contains('slides')) {
            topLevel = topLevel.parentElement;
          }

          const topIndex = topSections.indexOf(topLevel);
          const title =
            slide.querySelector('h1, h2, h3, h4')?.textContent?.trim() ||
            slide.querySelector('.card-heading')?.textContent?.trim() ||
            '';

          return {
            order: index + 1,
            h: indices.h ?? 0,
            v: indices.v ?? 0,
            folder: folderForTopIndex(topIndex),
            title,
          };
        });
      })()`
    );

    await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_ROOT, { recursive: true });

    const manifest = [];

    for (const slide of slides) {
      const folderPath = path.join(OUTPUT_ROOT, slide.folder);
      const fileName = `${String(slide.order).padStart(2, '0')}-h${String(slide.h).padStart(2, '0')}-v${String(slide.v).padStart(2, '0')}-${sanitizeTitle(slide.title)}.png`;
      const outputPath = path.join(folderPath, fileName);

      await fs.mkdir(folderPath, { recursive: true });

      await evaluate(
        client,
        `(() => {
          Reveal.slide(${slide.h}, ${slide.v});
          Reveal.layout();
          return new Promise((resolve) => setTimeout(resolve, 250));
        })()`
      );

      await evaluate(
        client,
        `(() => {
          const imagesReady = Array.from(document.images).every((img) => img.complete);
          return document.fonts.ready.then(() => imagesReady);
        })()`
      );

      const screenshot = await client.send('Page.captureScreenshot', {
        format: 'png',
        omitBackground: true,
        fromSurface: true,
        captureBeyondViewport: false,
      });

      await fs.writeFile(outputPath, Buffer.from(screenshot.data, 'base64'));
      manifest.push({
        file: path.relative(OUTPUT_ROOT, outputPath),
        title: slide.title,
        h: slide.h,
        v: slide.v,
      });
    }

    await fs.writeFile(
      path.join(OUTPUT_ROOT, 'manifest.json'),
      `${JSON.stringify(manifest, null, 2)}\n`,
      'utf8'
    );

    client.close();
  } finally {
    chrome.kill('SIGKILL');
    await fs.rm(PROFILE_DIR, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
