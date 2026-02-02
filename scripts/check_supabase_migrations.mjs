import fs from "node:fs";
import path from "node:path";

const migrationsDir = path.resolve("supabase", "migrations");

if (!fs.existsSync(migrationsDir)) {
  console.error(`Missing migrations directory: ${migrationsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(migrationsDir, { withFileTypes: true })
  .filter((d) => d.isFile() && d.name.endsWith(".sql"))
  .map((d) => d.name)
  .sort();

const nonconforming = [];
const versions = new Map();

for (const filename of files) {
  const match = filename.match(/^(\d{14})_.+\.sql$/);
  if (!match) {
    nonconforming.push(filename);
    continue;
  }

  const version = match[1];
  const list = versions.get(version) ?? [];
  list.push(filename);
  versions.set(version, list);
}

const duplicates = [...versions.entries()]
  .filter(([, list]) => list.length > 1)
  .sort(([a], [b]) => a.localeCompare(b));

let ok = true;

if (nonconforming.length) {
  ok = false;
  console.error("Nonconforming migration filenames (expected YYYYMMDDHHMMSS_name.sql):");
  for (const f of nonconforming) console.error(`- ${f}`);
}

if (duplicates.length) {
  ok = false;
  console.error("Duplicate migration versions detected:");
  for (const [v, list] of duplicates) console.error(`- ${v}: ${list.join(", ")}`);
}

if (!ok) {
  process.exit(1);
}

console.log(`OK: ${files.length} migration files validated.`);
