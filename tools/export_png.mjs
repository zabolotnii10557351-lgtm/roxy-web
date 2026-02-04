import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXPORT_PORT = process.env.EXPORT_PORT || "4173";
const BASE_URL =
  process.env.EXPORT_BASE_URL || `http://127.0.0.1:${EXPORT_PORT}`;
const START_SERVER = process.env.EXPORT_START_SERVER !== "0";
const SERVER_CWD = path.resolve(__dirname, "..");
const ROUTES_JSON = path.resolve(__dirname, "..", "..", "figma_export", "routes.json");
const OUT_DIR = path.resolve(__dirname, "..", "..", "export_roxy_web_montazh", "png");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  tablet: { width: 1024, height: 768, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
};

function normalizePathname(p) {
  if (!p || p === "/") return "home";
  return p.replace(/^\//, "").replace(/\//g, "__").replace(/[^\w.-]+/g, "_");
}

async function readRoutes() {
  const raw = await fs.readFile(ROUTES_JSON, "utf8");
  const entries = JSON.parse(raw);
  const set = new Set();

  for (const entry of entries) {
    if (entry.type === "dynamic" && Array.isArray(entry.samples)) {
      for (const sample of entry.samples) set.add(sample);
    } else if (entry.path) {
      set.add(entry.path);
    }
  }

  return Array.from(set);
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

let serverProcess = null;

async function startServer() {
  if (!START_SERVER) return;
  await new Promise((resolve, reject) => {
    const args = ["run", "dev", "--", "--port", EXPORT_PORT];
    const proc = spawn("npm", args, {
      cwd: SERVER_CWD,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env },
    });
    serverProcess = proc;

    const timeout = setTimeout(() => {
      reject(new Error("Server start timeout"));
    }, 120_000);

    const onData = (data) => {
      const text = data.toString();
      if (text.includes("Ready in") || text.includes("ready in")) {
        clearTimeout(timeout);
        resolve();
      }
    };

    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("exit", (code) => {
      clearTimeout(timeout);
      if (code && code !== 0) {
        reject(new Error(`Server exited with code ${code}`));
      }
    });
  });
}

function stopServer() {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill();
  }
}

async function captureAll() {
  await startServer();
  await ensureDir(OUT_DIR);
  const routes = await readRoutes();
  const browser = await chromium.launch();
  const manifest = [];

  for (const [label, viewport] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile || false,
      deviceScaleFactor: viewport.deviceScaleFactor || 1,
    });
    const page = await context.newPage();

    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      const name = normalizePathname(route);
      const filename = `${name}__${label}.png`;
      const outPath = path.join(OUT_DIR, filename);

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
        await page.waitForTimeout(1000);
        await page.screenshot({ path: outPath, fullPage: true });
        manifest.push({ route, url, viewport: label, file: filename });
        process.stdout.write(`Captured: ${filename}\n`);
      } catch (err) {
        manifest.push({ route, url, viewport: label, error: String(err) });
        process.stderr.write(`Failed: ${url} (${label})\n`);
      }
    }

    await page.close();
    await context.close();
  }

  await browser.close();
  stopServer();
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  process.stdout.write(`\nDone. Manifest: ${manifestPath}\n`);
}

captureAll().catch((err) => {
  console.error(err);
  stopServer();
  process.exit(1);
});
