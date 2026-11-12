<template>
  <div>
    <div role="group" aria-label="Camera" class="ml-auto mb-3 w-fit flex border border-black bg-paper font-mono">
      <button type="button" class="min-h-[44px] px-3 border-r border-[#ddd8cf] text-[11px] tracking-[0.12em] hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black" @click="resetView">RESET</button>
      <button type="button" aria-label="Zoom out" class="w-11 min-h-[44px] border-r border-[#ddd8cf] text-[16px] hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black" @click="zoomBy(1 / 1.25)">−</button>
      <button type="button" aria-label="Zoom in" class="w-11 min-h-[44px] text-[16px] hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black" @click="zoomBy(1.25)">+</button>
    </div>
    <div ref="wrap" class="relative overflow-hidden [--s:4.6px] md:[--s:6.4px] bg-paper text-black shelf-grid" :style="{ height: `calc(${geo.HT + 22} * var(--s))` }">
      <canvas
        ref="canvas"
        role="img"
        :aria-label="`Line drawing of a bookcase holding ${books.length} books in ${geo.sections.length} sections. Switch to List for the titles.`"
        class="absolute inset-0 w-full h-full block"
        :style="{ cursor, touchAction: 'pan-y' }"
      />

      <div aria-hidden="true" class="absolute inset-0 pointer-events-none font-mono">
        <div
          v-for="d in ov.dims"
          :key="d.key"
          class="absolute px-[5px] bg-paper text-[11px] tracking-[0.04em] whitespace-nowrap"
          :style="{ left: d.x + 'px', top: d.y + 'px', transform: `translate(-50%, -50%) rotate(${d.deg}deg)` }"
        >{{ d.text }}</div>
        <div
          v-if="ov.tip"
          class="absolute max-w-[260px] border border-black bg-paper px-2.5 py-1.5 font-garamond leading-tight"
          :style="{ left: ov.tip.x + 'px', top: ov.tip.y + 'px', transform: 'translate(-50%, calc(-100% - 10px))' }"
        >
          <em class="text-[17px]">{{ ov.tip.title }}</em>
          <span class="block text-[14px] text-gray-600">{{ ov.tip.author }}</span>
        </div>
      </div>

      <div
        v-if="detail && ov.card"
        class="absolute left-3 right-3 max-h-[330px] overflow-auto md:right-auto md:w-[300px] border border-black bg-paper px-[18px] pt-4 pb-[18px]"
        :style="{ top: ov.card.top + 'px', left: ov.card.left != null ? ov.card.left + 'px' : undefined }"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="font-garamond italic text-[26px] leading-[1.15]">{{ detail.title }}</div>
          <button type="button" aria-label="Put the book back" class="-mr-2 -mt-2 w-11 h-11 shrink-0 font-mono text-[18px] hover:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black" @click="focus = null">×</button>
        </div>
        <div class="font-garamond text-[18px] text-gray-600 mt-0.5">{{ detail.author }}</div>
        <div class="mt-3.5 pt-3 border-t border-[#ddd8cf]">
          <div v-if="detail.status === 'read'" class="flex items-baseline gap-2.5">
            <span class="text-[22px] tracking-[0.06em] text-[#b8410c]">{{ detail.starText }}</span>
            <span class="font-mono text-[11px] text-gray-600">{{ detail.stars }} / 5</span>
          </div>
          <div v-else class="font-mono text-[11px] tracking-[0.12em] uppercase text-[#b8410c]">{{ statusWord[detail.status] }}</div>
        </div>
        <dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-1.5 mt-3 mb-0 font-mono text-[11px]">
          <dt class="text-gray-600">FIRST PUB.</dt><dd class="m-0">{{ detail.year || "—" }}</dd>
          <dt class="text-gray-600">PAGES</dt><dd class="m-0">{{ detail.pages || "—" }}</dd>
          <template v-if="detail.subjects">
            <dt class="text-gray-600">SUBJECTS</dt><dd class="m-0 leading-[1.5]">{{ detail.subjects }}</dd>
          </template>
        </dl>
      </div>

    </div>
    <p class="flex flex-wrap justify-between gap-x-6 gap-y-1.5 mt-3 mb-0 font-mono text-[11px] tracking-[0.08em] text-gray-600">
      <span>Orange band: read · Grey lettering: not read yet · Pulled forward: reading now · Dashed, leaning: did not finish</span>
      <span>Shelved by call number, then author · drag to move · select a book to take it out</span>
    </p>
  </div>
</template>

<script setup>
import * as THREE from "three";

// shelves: [{ label, books: [{ title, author, stars, status, year, pages, subjects }] }], in shelf order
const props = defineProps({ shelves: { type: Array, required: true } });

const INK = "#1b1b1b", FILL = "#fbfaf7", FILL_HI = "#f4e2d4", ACCENT = "#b8410c", HATCH = "rgba(27,27,27,0.4)";
const statusWord = { "in-progress": "Reading now", dnf: "Did not finish", shelf: "Not read yet" };
const YAW = 0.3, PITCH = 0.14;
// Scene units are cm. One bookcase; shelves share boards; a shelf is at most MAX_ROW long.
const COMP = 29, BOARD = 2, DEPTH = 26, LEAN = 0.24, MIN_ROW = 90, MAX_ROW = 170;
const H = COMP + 2 * BOARD, Z = DEPTH / 2;

const hash = (s, k) => {
  let h = 2166136261 ^ k;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 10000) / 10000;
};

const books = props.shelves.flatMap((sh, s) =>
  sh.books.map((b) => {
    const stars = Number(b.stars) || 0;
    const status = b.status && b.status !== "completed" ? b.status : "read";
    const pages = Number(b.pages) || 0;
    return {
      ...b, shelf: s, status, stars, pages,
      starText: "★".repeat(Math.floor(stars)) + (stars % 1 ? "½" : ""),
      // thickness from the real page count when known, else a stable guess
      t: pages ? 1.3 + pages * 0.0074 : 3.1 + hash(b.title, 1) * 2.4,
      h: 19 + hash(b.title, 2) * 5,
      d: 13.5 + hash(b.title, 3) * 3.5,
    };
  }),
);

// Shelve like a library: classes in call-number order, each in its own compartment sized to its books.
// Compartments pack left to right into shelves (top first) and stretch so every shelf is the case's width.
// A class longer than a shelf continues in a second compartment on the next shelf.
function plan() {
  const chunks = [];
  props.shelves.forEach((sh, s) => {
    const ids = books.map((_, i) => i).filter((i) => books[i].shelf === s);
    if (!ids.length) return;
    const standing = ids.filter((i) => books[i].status !== "dnf");
    const leaning = ids.filter((i) => books[i].status === "dnf");
    const units = standing.map((i) => ({ w: books[i].t + 0.25, i }));
    if (leaning.length) {
      const span = 25 * Math.sin(LEAN) + leaning.reduce((a, i) => a + books[i].t / Math.cos(LEAN) + 0.2, 0) + books[leaning.at(-1)].t;
      units.push({ w: span + 0.4, lean: leaning });
    } else units.push({ w: 8, end: true });
    const sec = { label: sh.label, count: ids.length };
    let c = null;
    units.forEach((u) => {
      if (!c || c.len + u.w > MAX_ROW) { c = { sec: c ? null : sec, units: [], len: 0.8 }; chunks.push(c); }
      c.units.push(u); c.len += u.w;
    });
  });
  const inner = Math.max(MIN_ROW, Math.min(MAX_ROW, Math.max(...chunks.map((c) => c.len))));
  const rows = [];
  chunks.forEach((c) => {
    const last = rows.at(-1);
    if (last && last.reduce((a, x) => a + x.len + BOARD, 0) + c.len <= inner) last.push(c);
    else rows.push([c]);
  });
  const sections = [], pos = [], row = [], ends = [], bays = [];
  rows.forEach((cs, r) => {
    const sum = cs.reduce((a, c) => a + c.len, 0);
    const extra = inner - sum - BOARD * (cs.length - 1);
    let x = BOARD;
    cs.forEach((c) => {
      const w = c.len + (extra * c.len) / sum;
      bays.push({ x, w, r });
      if (c.sec) sections.push({ ...c.sec, r, x0: x + 0.4 });
      let cur = x + 0.4;
      c.units.forEach((u) => {
        if (u.i != null) { pos[u.i] = cur + books[u.i].t / 2; row[u.i] = r; }
        else if (u.lean) {
          let p = null;
          u.lean.forEach((i) => { p = p == null ? cur + books[i].h * Math.sin(LEAN) + 0.3 : p + books[i].t / Math.cos(LEAN) + 0.2; pos[i] = p; row[i] = r; });
        } else ends.push({ x: cur + 0.3, r });
        cur += u.w;
      });
      x += w + BOARD;
    });
  });
  const R = rows.length;
  const base = (k) => (R - 1 - k) * (H - BOARD); // neighbouring shelves share a board
  return { bays, pos, row, sections, ends, W: inner + 2 * BOARD, R, base, HT: R * (H - BOARD) + BOARD };
}
const geo = plan();

const wrap = ref(null);
const canvas = ref(null);
const hover = ref(null);
const focus = ref(null);
const cursor = ref("grab");
const ov = shallowRef({ dims: [], tip: null, card: null });
const detail = computed(() => (focus.value == null ? null : books[focus.value]));

let renderer, scene, cam, ray, root, items = [], raf = 0, ro, detach, dirty = true, ovKey = "";
let w = 0, h = 0, halfW = 1, halfH = 1;
const CY = geo.HT / 2 - 1;
const v = { zoom: 1, cx: 0, cy: CY, cz: 0 };
const goal = { ...v };
const reduceMotion = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// world cm per screen px along the shelf, at a zoom
const pxPerCm = (zoom) => ((h * zoom) / (2 * halfH)) * Math.cos(YAW);
const minZoom = () => Math.min(1, w / ((geo.W + 30) * pxPerCm(1)));
// keep the view on the shelf: the left end shows the height dimension, the right end stops just past the case
function clampCx(cx, zoom = goal.zoom) {
  const half = w / 2 / pxPerCm(zoom);
  const lo = -16 + half, hi = geo.W + 8 - half;
  return lo > hi ? (geo.W - 8) / 2 : Math.min(hi, Math.max(lo, cx));
}
function clampCy(cy, zoom = goal.zoom) {
  const half = halfH / zoom;
  const lo = -14 + half, hi = geo.HT + 14 - half;
  return lo > hi ? CY : Math.min(hi, Math.max(lo, cy));
}
function setZoom(z) {
  goal.zoom = Math.min(4, Math.max(minZoom(), z));
  goal.cx = clampCx(goal.cx);
  goal.cy = clampCy(goal.cy);
}
function zoomBy(f) { setZoom(goal.zoom * f); }
function resetView() { focus.value = null; Object.assign(goal, { zoom: 1, cy: CY, cz: 0 }); goal.cx = clampCx(-Infinity, 1); }
function toggleFocus(i) { focus.value = i == null || focus.value === i ? null : i; }

function resize() {
  const first = !w;
  w = wrap.value.clientWidth; h = wrap.value.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  halfH = (geo.HT + 22) / 2; // the case fills the height: labels above, dimensions below
  halfW = halfH * (w / h);
  if (first) { goal.cx = v.cx = clampCx(-Infinity, 1); } else { goal.cx = clampCx(goal.cx); }
  dirty = true;
}

function disposeRoot() {
  scene.remove(root);
  root.traverse((o) => {
    o.geometry?.dispose();
    [].concat(o.material || []).forEach((m) => { m.map?.dispose(); m.dispose(); });
  });
}

// shortcut: one small canvas texture per spine (~100 KB of GPU memory each); move to an atlas past ~1000 books
function spineTex(bk) {
  const k = 20, W = Math.round(bk.t * k), Hh = Math.round(bk.h * k);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = Hh;
  const x = cv.getContext("2d");
  x.fillStyle = FILL; x.fillRect(0, 0, W, Hh);
  // read books carry a solid band at the head of the spine; unread ones are lettered in grey
  if (bk.status === "read") { x.fillStyle = ACCENT; x.fillRect(0, Hh * 0.02, W, Hh * 0.05); }
  x.strokeStyle = INK; x.lineWidth = 1;
  [0.07, 0.93, 0.945].forEach((p) => { x.beginPath(); x.moveTo(0, Hh * p); x.lineTo(W, Hh * p); x.stroke(); });
  x.fillStyle = bk.status === "shelf" ? "#8a8780" : INK;
  x.translate(W / 2, 0); x.rotate(Math.PI / 2); // text runs top to bottom, as on a real spine
  x.textBaseline = "middle";
  const top = Hh * 0.11, bottom = Hh * (bk.call ? 0.76 : 0.89);
  const mono = `500 ${Math.min(W * 0.26, 9)}px "IBM Plex Mono", "Noto Serif Malayalam", monospace`;
  x.font = mono;
  const au = String(bk.author).toUpperCase();
  const room = bottom - top - x.measureText(au).width - 16;
  let fs = Math.min(W * 0.52, 20);
  x.font = `italic ${fs}px "EB Garamond", "Noto Serif Malayalam", serif`;
  const tw = x.measureText(bk.title).width;
  if (tw > room) { fs = Math.max(6, (fs * room) / tw); x.font = `italic ${fs}px "EB Garamond", "Noto Serif Malayalam", serif`; }
  x.textAlign = "left"; x.fillText(bk.title, top, W * 0.04);
  x.font = mono; x.textAlign = "right"; x.fillText(au, bottom, W * 0.04);
  if (bk.call) {
    // library label: call number over the first letters of the author's surname
    x.setTransform(1, 0, 0, 1, 0, 0);
    const lw = W * 0.84, lh = Hh * 0.1, ly = Hh * 0.8;
    x.fillStyle = "#fff"; x.fillRect((W - lw) / 2, ly, lw, lh);
    x.strokeRect((W - lw) / 2, ly, lw, lh);
    x.fillStyle = INK; x.textAlign = "center"; x.textBaseline = "middle";
    const sn = String(bk.author).split(/,| and /)[0].trim().split(/\s+/).pop().slice(0, 3).toUpperCase();
    const fit = (str, max) => { x.font = `500 ${max}px "IBM Plex Mono", "Noto Serif Malayalam", monospace`; const m = x.measureText(str).width; if (m > lw * 0.9) x.font = `500 ${(max * lw * 0.9) / m}px "IBM Plex Mono", "Noto Serif Malayalam", monospace`; };
    fit(bk.call, Math.min(lh * 0.32, 13)); x.fillText(bk.call, W / 2, ly + lh * 0.32);
    fit(sn, Math.min(lh * 0.32, 13)); x.fillText(sn, W / 2, ly + lh * 0.7);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

function edgeTex(bay, labels) {
  const k = 24, W = Math.round(bay.w * k), Hh = Math.round(BOARD * k);
  const cv = document.createElement("canvas"); cv.width = W; cv.height = Hh;
  const x = cv.getContext("2d");
  x.fillStyle = FILL; x.fillRect(0, 0, W, Hh);
  x.fillStyle = INK; x.textBaseline = "middle";
  x.font = `600 ${Math.round(Hh * 0.72)}px "IBM Plex Mono", monospace`;
  labels.forEach((sec, n) => {
    const at = (sec.x0 - bay.x) * k, room = ((labels[n + 1]?.x0 ?? bay.x + bay.w) - sec.x0 - 0.6) * k;
    const name = sec.label.toUpperCase();
    // a short section gets a shorter label: full, then name only, then just the class number
    const text = [`${name} · ${sec.count}`, name, name.split(" ")[0]].find((t) => x.measureText(t).width <= room) ?? name.split(" ")[0];
    x.fillText(text, at, Hh / 2);
  });
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

function build() {
  if (root) disposeRoot();
  root = new THREE.Group();
  scene.add(root);
  const lineMat = () => new THREE.LineBasicMaterial({ color: INK });
  const fillMat = (map) => new THREE.MeshBasicMaterial({ color: map ? 0xffffff : FILL, map: map || null, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  // edges behind surfaces show as faint dashes, like hidden lines on a drawing
  const hiddenMat = new THREE.LineDashedMaterial({ color: INK, dashSize: 1.1, gapSize: 0.9, transparent: true, opacity: 0.32, depthFunc: THREE.GreaterDepth, depthWrite: false });

  const hc = document.createElement("canvas"); hc.width = hc.height = 32;
  const hx = hc.getContext("2d");
  hx.fillStyle = FILL; hx.fillRect(0, 0, 32, 32);
  hx.strokeStyle = HATCH; hx.lineWidth = 1.2;
  for (let k = -32; k <= 64; k += 8) { hx.beginPath(); hx.moveTo(k, 32); hx.lineTo(k + 32, 0); hx.stroke(); }
  const hatchFor = (u, vv) => {
    const t = new THREE.CanvasTexture(hc);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(u / 1.4, vv / 1.4);
    return t;
  };

  const box = (bw, bh, bd, x, y, z, hatch, front) => {
    const g = new THREE.BoxGeometry(bw, bh, bd);
    const f = fillMat();
    const m = new THREE.Mesh(g, [f, f, f, f, front ? fillMat(front) : hatch ? fillMat(hatchFor(bw, bh)) : f, f]);
    m.position.set(x, y, z); root.add(m);
    const eg = new THREE.EdgesGeometry(g, 1);
    m.add(new THREE.LineSegments(eg, lineMat()));
    const hd = new THREE.LineSegments(eg, hiddenMat); hd.computeLineDistances(); hd.renderOrder = 5; m.add(hd);
  };
  const segs = (pts) => root.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(...p))), lineMat()));

  const W = geo.W, HT = geo.HT;
  // carcass: full-height sides, a divider after each compartment, a board under every shelf and one on top
  box(BOARD, HT, DEPTH, BOARD / 2, HT / 2, 0, true);
  box(BOARD, HT, DEPTH, W - BOARD / 2, HT / 2, 0, true);
  // section names are lettered on the front edge of the board under the books, like library shelf labels
  geo.bays.forEach((b) => {
    const labels = geo.sections.filter((sec) => sec.r === b.r && sec.x0 >= b.x && sec.x0 < b.x + b.w);
    box(b.w, BOARD, DEPTH, b.x + b.w / 2, geo.base(b.r) + BOARD / 2, 0, true, labels.length ? edgeTex(b, labels) : null);
    if (b.x + b.w + BOARD < W - 0.5) box(BOARD, COMP, DEPTH, b.x + b.w + BOARD / 2, geo.base(b.r) + BOARD + COMP / 2, 0, true);
    if (b.r === 0) box(b.w, BOARD, DEPTH, b.x + b.w / 2, HT - BOARD / 2, 0, true);
  });
  box(W - 2 * BOARD, HT - 2 * BOARD, 0.8, W / 2, HT / 2, -Z + 0.4, false);

  // dimension lines with arrowheads: length (below), height (left end)
  const a = 1.6, b = 0.55, dx = -6;
  segs([
    [0, -1, Z], [0, -8, Z], [W, -1, Z], [W, -8, Z], [0, -6, Z], [W, -6, Z],
    [0, -6, Z], [a, -6 + b, Z], [0, -6, Z], [a, -6 - b, Z],
    [W, -6, Z], [W - a, -6 + b, Z], [W, -6, Z], [W - a, -6 - b, Z],
    [-1, 0, Z], [dx - 2, 0, Z], [-1, HT, Z], [dx - 2, HT, Z], [dx, 0, Z], [dx, HT, Z],
    [dx, 0, Z], [dx + b, a, Z], [dx, 0, Z], [dx - b, a, Z],
    [dx, HT, Z], [dx + b, HT - a, Z], [dx, HT, Z], [dx - b, HT - a, Z],
  ]);

  // books; did-not-finish books lean against their neighbours at the end of their section
  items = books.map((bk, i) => {
    const { t, h: bh, d } = bk;
    const g = new THREE.BoxGeometry(t, bh, d);
    const side = fillMat();
    const mesh = new THREE.Mesh(g, [side, side, side, side, fillMat(spineTex(bk)), side]);
    mesh.userData.i = i;
    const dnf = bk.status === "dnf";
    const em = dnf ? new THREE.LineDashedMaterial({ color: INK, dashSize: 0.9, gapSize: 0.6 }) : lineMat();
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(g, 1), em);
    if (dnf) edges.computeLineDistances();
    mesh.add(edges);
    const grp = new THREE.Group();
    grp.add(mesh);
    const z0 = Z - 1.4 - d / 2 + (bk.status === "in-progress" ? 4.5 : 0);
    grp.position.set(geo.pos[i], geo.base(geo.row[i]) + BOARD, z0);
    if (dnf) { mesh.position.set(t / 2, bh / 2, 0); grp.rotation.z = LEAN; }
    else mesh.position.set(0, bh / 2, 0);
    if (bk.status === "in-progress") {
      const card = new THREE.Mesh(new THREE.BoxGeometry(0.15, 5, 4), new THREE.MeshBasicMaterial({ color: ACCENT }));
      card.position.set(0, bh / 2 + 1.6, d / 2 - 4);
      mesh.add(card);
    }
    root.add(grp);
    return { grp, mesh, side, em, z0, goalZ: z0, h: bh, d };
  });
  geo.ends.forEach((e) => {
    const y = geo.base(e.r);
    box(0.4, 13, 10, e.x + 0.2, y + BOARD + 6.5, Z - 6.5, false);
    box(7, 0.4, 10, e.x + 3.5, y + BOARD + 0.2, Z - 6.5, false);
  });
  ovKey = "";
  applyHighlight();
  syncFocus(true);
  dirty = true;
}

function applyHighlight() {
  items.forEach((it, i) => {
    const hot = i === hover.value || i === focus.value;
    it.side.color.set(hot ? FILL_HI : FILL);
    it.em.color.set(hot ? ACCENT : INK);
  });
  dirty = true;
}

function syncFocus(instant) {
  const f = focus.value;
  items.forEach((it, i) => { it.goalZ = it.z0 + (i === f ? 9 : 0); if (instant) it.grp.position.z = it.goalZ; });
  dirty = true;
}

function pushOverlay() {
  const P = (x, y, z) => {
    const p = new THREE.Vector3(x, y, z).project(cam);
    return [Math.round(((p.x + 1) / 2) * w), Math.round(((1 - p.y) / 2) * h)];
  };
  const dim = (key, text, p0, p1) => {
    const p = P(...p0), q = P(...p1);
    let deg = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
    if (deg > 90) deg -= 180;
    if (deg <= -90) deg += 180;
    // a long dimension's label follows the view so it stays readable
    const x = Math.min(Math.max((p[0] + q[0]) / 2, Math.max(p[0], 40) + 30), Math.min(q[0], w - 40) - 30);
    const y = p[1] + ((q[1] - p[1]) * (x - p[0])) / ((q[0] - p[0]) || 1);
    return { key, text, x: Math.round(Math.abs(q[0] - p[0]) > 80 ? x : (p[0] + q[0]) / 2), y: Math.round(Math.abs(q[0] - p[0]) > 80 ? y : (p[1] + q[1]) / 2), deg: Math.round(deg) };
  };
  const W = geo.W;
  const dims = [
    dim("w", String(Math.round(W * 10)), [0, -6, Z], [W, -6, Z]),
    dim("h", String(Math.round(geo.HT * 10)), [-6, 0, Z], [-6, geo.HT, Z]),
  ].filter((d) => d.x > -60 && d.x < w + 60);
  let tip = null;
  const hv = hover.value;
  if (hv != null && hv !== focus.value && items[hv]) {
    const it = items[hv];
    const p = it.mesh.localToWorld(new THREE.Vector3(0, it.h / 2, it.d / 2));
    const [x, y] = P(p.x, p.y, p.z);
    tip = { x: Math.min(w - 140, Math.max(140, x)), y, title: books[hv].title, author: books[hv].author };
  }
  // the details card sits beside the selected book: right of it, or left when the book is on the right half
  let card = null;
  if (focus.value != null && items[focus.value]) {
    const it = items[focus.value];
    const p = it.mesh.localToWorld(new THREE.Vector3(0, it.h / 2, it.d / 2));
    const [x, y] = P(p.x, p.y, p.z);
    card = w < 768 ? { top: Math.max(12, Math.min(h - 340, y + 60)) } : { top: Math.max(12, Math.min(h - 340, y - 120)), left: x < w / 2 ? x + 40 : x - 340 };
  }
  const next = { dims, tip, card };
  const key = JSON.stringify(next);
  if (key !== ovKey) { ovKey = key; ov.value = next; }
}

function step() {
  raf = requestAnimationFrame(step);
  if (!w) return;
  const k = reduceMotion ? 1 : 0.14;
  let moving = false;
  for (const key of ["zoom", "cx", "cy", "cz"]) {
    const d = goal[key] - v[key];
    if (Math.abs(d) > 1e-3) { v[key] += d * k; moving = true; } else v[key] = goal[key];
  }
  for (const it of items) {
    const d = it.goalZ - it.grp.position.z;
    if (Math.abs(d) > 1e-3) { it.grp.position.z += d * (reduceMotion ? 1 : 0.16); moving = true; } else it.grp.position.z = it.goalZ;
  }
  if (!moving && !dirty) return;
  dirty = false;
  Object.assign(cam, { left: -halfW, right: halfW, top: halfH, bottom: -halfH, zoom: v.zoom });
  const cp = Math.cos(PITCH);
  cam.position.set(v.cx + Math.sin(YAW) * cp * 400, v.cy + Math.sin(PITCH) * 400, v.cz + Math.cos(YAW) * cp * 400);
  cam.lookAt(v.cx, v.cy, v.cz);
  cam.updateProjectionMatrix();
  renderer.render(scene, cam);
  pushOverlay();
}

function attach() {
  const el = canvas.value;
  let drag = null;
  const pick = (e) => {
    const r = el.getBoundingClientRect();
    ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), cam);
    const hit = ray.intersectObjects(items.map((it) => it.mesh), false)[0];
    return hit ? hit.object.userData.i : null;
  };
  const pan = (dxPx, dyPx = 0) => {
    goal.cx = v.cx = clampCx(goal.cx - dxPx / pxPerCm(goal.zoom));
    if (dyPx) goal.cy = v.cy = clampCy(goal.cy + (dyPx * 2 * halfH) / (h * goal.zoom));
    dirty = true;
  };
  // two fingers on the canvas = pinch zoom; touch-action: pan-y leaves pinches and sideways drags to us
  const pts = new Map();
  let pinch = null;
  const gap = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
  const down = (e) => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    el.setPointerCapture?.(e.pointerId);
    if (pts.size === 2) { pinch = { d: gap(), zoom: goal.zoom }; drag = null; return; }
    drag = { x: e.clientX, y: e.clientY, moved: 0 };
  };
  const move = (e) => {
    if (pts.has(e.pointerId)) pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pts.size === 2) {
      setZoom((pinch.zoom * gap()) / pinch.d);
      v.zoom = goal.zoom; v.cx = goal.cx; v.cy = goal.cy; dirty = true;
      return;
    }
    if (drag) {
      const ddx = e.clientX - drag.x, ddy = e.clientY - drag.y;
      drag.moved += Math.abs(ddx) + Math.abs(ddy);
      drag.x = e.clientX; drag.y = e.clientY;
      // touch keeps vertical drags for page scrolling (touch-action: pan-y)
      if (drag.moved > 4) { pan(ddx, e.pointerType === "touch" ? 0 : ddy); cursor.value = "grabbing"; hover.value = null; }
      return;
    }
    if (e.pointerType !== "mouse") return; // no hover labels for touch
    const i = pick(e);
    if (i !== hover.value) { hover.value = i; cursor.value = i == null ? "grab" : "pointer"; }
  };
  const up = (e) => {
    pts.delete(e.pointerId);
    if (pinch) { if (pts.size === 0) pinch = null; return; } // lifting a pinch never counts as a click
    if (drag && drag.moved <= 4) toggleFocus(pick(e));
    drag = null; cursor.value = "grab";
  };
  const cancel = (e) => { pts.delete(e.pointerId); if (pts.size === 0) pinch = null; drag = null; };
  const out = () => { if (!drag) hover.value = null; };
  // trackpad pinch arrives as ctrl+wheel; sideways swipes and shift+wheel move along; plain vertical wheel scrolls the page
  const wheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setZoom(goal.zoom * Math.exp(-e.deltaY * 0.01));
      v.zoom = goal.zoom; v.cx = goal.cx; v.cy = goal.cy;
      dirty = true;
      return;
    }
    const sideways = e.shiftKey ? e.deltaY : Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
    if (!sideways) return;
    e.preventDefault();
    pan(-sideways);
  };
  const evs = { pointerdown: down, pointermove: move, pointerup: up, pointercancel: cancel, pointerleave: out };
  Object.entries(evs).forEach(([n, f]) => el.addEventListener(n, f));
  el.addEventListener("wheel", wheel, { passive: false });
  detach = () => {
    Object.entries(evs).forEach(([n, f]) => el.removeEventListener(n, f));
    el.removeEventListener("wheel", wheel);
  };
}

watch([hover, focus], () => renderer && applyHighlight());
watch(focus, () => renderer && syncFocus(false));

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene();
  cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000);
  ray = new THREE.Raycaster();
  resize();
  build();
  ro = new ResizeObserver(resize);
  ro.observe(wrap.value);
  attach();
  step();
  // spines are drawn into canvases, so redraw them once the web fonts arrive
  Promise.all([
    document.fonts.load('italic 20px "EB Garamond"'),
    document.fonts.load('500 12px "IBM Plex Mono"'),
    document.fonts.load('20px "Noto Serif Malayalam"', "മലയാളം"),
  ]).catch(() => {}).then(() => renderer && build());
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  ro?.disconnect();
  detach?.();
  if (root) disposeRoot();
  renderer?.dispose();
  renderer = null;
});
</script>

<style scoped>
.shelf-grid {
  background-image: linear-gradient(rgba(27, 27, 27, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(27, 27, 27, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: -1px -1px;
}
/* referenced so @nuxt/fonts ships the Malayalam face for spine text */
.shelf-grid canvas {
  font-family: "Noto Serif Malayalam", serif;
}
</style>
