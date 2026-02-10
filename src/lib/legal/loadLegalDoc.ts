import { promises as fs } from "fs";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs");

function stripPageMarkers(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^---\s*Page\s*\d+\s*---$/i.test(trimmed)) return true;
  if (/^Page\s+\d+\s+of\s+\d+$/i.test(trimmed)) return true;
  if (/^Strona\s+\d+\s+z\s+\d+$/i.test(trimmed)) return true;
  if (/^\d+$/.test(trimmed)) return true;
  return false;
}

export async function loadLegalDoc(filename: string): Promise<string> {
  const filePath = path.join(DOCS_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const normalized = raw
    .replaceAll("https://www.roxstreamai.com/privacy-policy", "https://www.roxstreamai.com/privacy")
    .split(/\r?\n/)
    .filter((line) => !stripPageMarkers(line))
    .join("\n");

  return normalized.trim();
}
