#!/usr/bin/env node
// Flatten .output/public/blog/<slug>/index.html → .output/public/blog/<slug>.html
// so GitHub Pages serves the post at /blog/<slug> without the directory-canon 301.
import { readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = resolve(ROOT, ".output/public/blog");

if (!existsSync(BLOG_DIR)) {
  console.log("flatten-blog: no .output/public/blog; skipping");
  process.exit(0);
}

const entries = await readdir(BLOG_DIR, { withFileTypes: true });
const reserved = new Set(["category", "index.html"]);

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  if (reserved.has(entry.name)) continue;

  const dir = resolve(BLOG_DIR, entry.name);
  const indexPath = resolve(dir, "index.html");

  if (!existsSync(indexPath)) continue;

  const target = resolve(BLOG_DIR, `${entry.name}.html`);
  await copyFile(indexPath, target);
  console.log(`flatten-blog: copied ${entry.name}/index.html -> ${entry.name}.html`);
}
