import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, "..", "..", "export_roxy_web_montazh", "assets");
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const FIGMA_ASSETS_DIR = path.resolve(__dirname, "..", "..", "figma_export", "assets");

async function exists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  if (await exists(PUBLIC_DIR)) {
    await copyDir(PUBLIC_DIR, path.join(OUT_DIR, "public"));
  }

  if (await exists(FIGMA_ASSETS_DIR)) {
    await copyDir(FIGMA_ASSETS_DIR, path.join(OUT_DIR, "figma_export"));
  }

  process.stdout.write(`Assets copied to ${OUT_DIR}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
