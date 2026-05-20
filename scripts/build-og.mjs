#!/usr/bin/env node
// Generates per-post OG images into public/og/<slug>.png from content/blog/*.md.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = resolve(ROOT, "content/blog");
const OUT_DIR = resolve(ROOT, "public/og");
const FONT_CACHE = resolve(ROOT, ".cache/fonts");

const FONT_URLS = {
  "EBGaramond-VF":
    "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf",
  "EBGaramond-Italic-VF":
    "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond-Italic%5Bwght%5D.ttf",
};

async function ensureFont(name, url) {
  await mkdir(FONT_CACHE, { recursive: true });
  const path = resolve(FONT_CACHE, `${name}.ttf`);
  if (existsSync(path)) return path;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`font fetch failed ${name}: ${res.status}`);
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
  return path;
}

function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildSvg({ title, description, date, category }) {
  const titleLines = wrap(title, 26).slice(0, 3);
  const fontSize =
    titleLines.length === 1 ? 96 : titleLines.length === 2 ? 84 : 72;
  const lineH = Math.round(fontSize * 1.02);
  const blockH = (titleLines.length - 1) * lineH;
  const titleTopY = 290 - blockH / 2;

  const titleTspans = titleLines
    .map(
      (l, i) =>
        `<tspan x="600" dy="${i === 0 ? 0 : lineH}">${esc(l)}</tspan>`,
    )
    .join("");

  const descLines = description ? wrap(description, 64).slice(0, 2) : [];
  const descTopY = titleTopY + blockH + 70;
  const descTspans = descLines
    .map(
      (l, i) =>
        `<tspan x="600" dy="${i === 0 ? 0 : 42}">${esc(l)}</tspan>`,
    )
    .join("");

  const meta = [formatDate(date), category].filter(Boolean).join("  ·  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g font-family="EB Garamond" font-size="18" fill="#6b7280" letter-spacing="3">
    <text x="80" y="70" font-weight="500">VISHNU JAYADEVAN</text>
    <text x="1120" y="70" text-anchor="end" font-weight="500">VISHNUJAYADEVAN.COM</text>
  </g>
  <line x1="80" y1="90" x2="1120" y2="90" stroke="#d1d5db" stroke-width="1" stroke-dasharray="2 6"/>
  <text text-anchor="middle" font-family="EB Garamond" font-weight="500" font-size="${fontSize}" fill="#000000" letter-spacing="-2" y="${titleTopY}">${titleTspans}</text>
  ${
    descLines.length
      ? `<text text-anchor="middle" font-family="EB Garamond" font-style="italic" font-size="32" fill="#374151" y="${descTopY}">${descTspans}</text>`
      : ""
  }
  <text x="600" y="540" text-anchor="middle" font-family="EB Garamond" font-size="28" fill="#9ca3af">❦</text>
  <line x1="80" y1="560" x2="1120" y2="560" stroke="#d1d5db" stroke-width="1" stroke-dasharray="2 6"/>
  <text x="600" y="600" text-anchor="middle" font-family="EB Garamond" font-size="16" fill="#6b7280" letter-spacing="3">${esc(
    meta.toUpperCase(),
  )}</text>
</svg>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const fontFiles = await Promise.all(
    Object.entries(FONT_URLS).map(([n, u]) => ensureFont(n, u)),
  );

  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  if (!files.length) {
    console.log("og: no posts found, skipping");
    return;
  }

  for (const file of files) {
    const raw = await readFile(resolve(BLOG_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = basename(file, ".md");
    const svg = buildSvg({
      title: data.title || slug,
      description: data.description || "",
      date: data.date,
      category: data.category || "",
    });
    const resvg = new Resvg(svg, {
      font: {
        fontFiles,
        loadSystemFonts: false,
        defaultFontFamily: "EB Garamond",
      },
      fitTo: { mode: "width", value: 2400 },
    });
    const png = resvg.render().asPng();
    await writeFile(resolve(OUT_DIR, `${slug}.png`), png);
    console.log(`og: ${slug}.png`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
