#!/usr/bin/env node
// Generates social images and site icons into public/:
//   og.png + og.svg (site default), og/<slug>.png (one per post),
//   icon-512.png, apple-touch-icon.png, favicon-32.png, favicon.ico.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { Resvg } from "@resvg/resvg-js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = resolve(ROOT, "content/blog");
const PUBLIC_DIR = resolve(ROOT, "public");
const OUT_DIR = resolve(PUBLIC_DIR, "og");
const FONT_CACHE = resolve(ROOT, ".cache/fonts");

const FONT_URLS = {
  "EBGaramond-VF":
    "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf",
  "EBGaramond-Italic-VF":
    "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond-Italic%5Bwght%5D.ttf",
  "IBMPlexMono-Regular":
    "https://github.com/google/fonts/raw/main/ofl/ibmplexmono/IBMPlexMono-Regular.ttf",
  "IBMPlexMono-Medium":
    "https://github.com/google/fonts/raw/main/ofl/ibmplexmono/IBMPlexMono-Medium.ttf",
};

// Broadsheet palette, as on the site.
const PAPER = "#fbfaf7";
const INK = "#111111";
const MUTED = "#555555";
const BODY = "#333333";
const HAIRLINE = "#ddd8cf";
const SERIF = "EB Garamond";
const MONO = "IBM Plex Mono";

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
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Name and site url over a black rule, shared by both social images.
const topBar = `
  <g font-family="${MONO}" font-size="16" letter-spacing="2.56">
    <text x="72" y="84" font-weight="500" fill="${INK}">VISHNU JAYADEVAN</text>
    <text x="1128" y="84" text-anchor="end" fill="${MUTED}">VISHNUJAYADEVAN.COM</text>
  </g>
  <rect x="72" y="106" width="1056" height="1" fill="${INK}"/>`;

function siteSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>${topBar}
  <text font-family="${SERIF}" font-size="64" letter-spacing="-1" fill="${INK}">
    <tspan x="72" y="262">Hello, I am <tspan font-style="italic">Vishnu Jayadevan.</tspan></tspan>
    <tspan x="72" y="334" fill="${MUTED}">I build software. I have opinions about</tspan>
    <tspan x="72" y="406" fill="${MUTED}">how it should be built.</tspan>
  </text>
  <rect x="72" y="530" width="1056" height="1" fill="${HAIRLINE}"/>
  <g font-family="${MONO}" font-size="17" fill="${MUTED}">
    <text x="72" y="568">Staff Software Engineer, Harness</text>
    <text x="440" y="568">Bangalore, IN · 12.97° N, 77.59° E</text>
  </g>
</svg>`;
}

function postSvg({ title, description, date, category }) {
  const titleLines = wrap(title, 40).slice(0, 3);
  const allDesc = description ? wrap(description, 84) : [];
  const descLines = allDesc.slice(0, 2);
  if (allDesc.length > 2) descLines[1] = descLines[1].replace(/[\s,.;:]*$/, "…");
  const titleLH = 70;
  const descLH = 38;
  // Stack meta, title and summary, centred between the two rules (106..574).
  const height = 17 + 30 + titleLines.length * titleLH + (descLines.length ? 30 + descLines.length * descLH : 0);
  let y = Math.round(340 - height / 2) + 17;
  const meta = [formatDate(date), category].filter(Boolean).join(" · ");
  const metaY = y;
  y += 30 + 52;
  const titleTspans = titleLines
    .map((l, i) => `<tspan x="72" y="${y + i * titleLH}">${esc(l)}</tspan>`)
    .join("");
  y += (titleLines.length - 1) * titleLH + 30 + descLH;
  const descTspans = descLines
    .map((l, i) => `<tspan x="72" y="${y + i * descLH}">${esc(l)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>${topBar}
  <text x="72" y="${metaY}" font-family="${MONO}" font-size="17" fill="${MUTED}">${esc(meta)}</text>
  <text font-family="${SERIF}" font-size="66" letter-spacing="-1.3" fill="${INK}">${titleTspans}</text>
  ${descLines.length ? `<text font-family="${SERIF}" font-style="italic" font-size="28" fill="${BODY}">${descTspans}</text>` : ""}
  <rect x="72" y="574" width="1056" height="1" fill="${INK}"/>
</svg>`;
}

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${INK}"/>
  <text x="256" y="322" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="300" letter-spacing="-12" fill="${PAPER}">vj</text>
</svg>`;

// ICO files may embed a PNG directly: 6-byte header, one 16-byte entry, then the image.
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const fontFiles = await Promise.all(
    Object.entries(FONT_URLS).map(([n, u]) => ensureFont(n, u)),
  );
  const render = (svg, width) =>
    new Resvg(svg, {
      font: { fontFiles, loadSystemFonts: false, defaultFontFamily: SERIF },
      fitTo: { mode: "width", value: width },
    })
      .render()
      .asPng();

  const site = siteSvg();
  await writeFile(resolve(PUBLIC_DIR, "og.svg"), site);
  await writeFile(resolve(PUBLIC_DIR, "og.png"), render(site, 2400));
  console.log("og: og.png");

  await writeFile(resolve(PUBLIC_DIR, "icon-512.png"), render(iconSvg, 512));
  await writeFile(resolve(PUBLIC_DIR, "apple-touch-icon.png"), render(iconSvg, 180));
  const favicon = render(iconSvg, 32);
  await writeFile(resolve(PUBLIC_DIR, "favicon-32.png"), favicon);
  await writeFile(resolve(PUBLIC_DIR, "favicon.ico"), pngToIco(favicon, 32));
  console.log("og: icons");

  const files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = await readFile(resolve(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = basename(file, ".md");
    const h1Match = content.match(/^#\s+(.+)$/m);
    const firstParaMatch = content.replace(/^#.+$/m, "").match(/\n\n([^\n#`>][^\n]+)/);
    const svg = postSvg({
      title: data.title || (h1Match && h1Match[1]) || slug,
      description: data.description || (firstParaMatch && firstParaMatch[1]) || "",
      date: data.date,
      category: data.category || "",
    });
    await writeFile(resolve(OUT_DIR, `${slug}.png`), render(svg, 2400));
    console.log(`og: ${slug}.png`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
