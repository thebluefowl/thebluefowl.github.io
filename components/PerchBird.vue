<template>
  <canvas ref="cv" aria-hidden="true" style="position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:50" />
</template>

<script setup lang="ts">
const cv = ref<HTMLCanvasElement>();
let stop = () => {}, dead = false;
onBeforeUnmount(() => { dead = true; stop(); });

onMounted(async () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const THREE = await import("three");
  const canvas = cv.value;
  if (!canvas || dead) return;

  const R = (a: number, b: number) => a + Math.random() * (b - a);
  const ease = (u: number) => -(Math.cos(Math.PI * u) - 1) / 2;
  let W = innerWidth, H = innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const cam = new THREE.OrthographicCamera(0, W, 0, -H, -500, 500);
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(-50, 100, 200);
  scene.add(sun);
  const resize = () => {
    W = innerWidth; H = innerHeight;
    renderer.setSize(W, H, false);
    cam.right = W; cam.bottom = -H;
    cam.updateProjectionMatrix();
  };
  resize();

  // ---- bird (origin = feet, +x = forward, ~22px long)
  const mat = (c: number) => new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide });
  const blue = 0x2f5d9b;
  const ball = (r: number, c: number, p: number[], s = [1, 1, 1]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mat(c));
    m.position.set(p[0], p[1], p[2]); m.scale.set(s[0], s[1], s[2]);
    return m;
  };
  const outer = new THREE.Group(), inner = new THREE.Group(), head = new THREE.Group();
  inner.rotation.set(0.2, 0.4, 0);
  outer.add(inner);
  inner.add(ball(1, blue, [0, 6, 0], [7, 4, 4]), ball(1, 0xcfdcef, [2, 4.6, 0], [5, 3, 3.3]));
  head.position.set(6, 9.5, 0);
  head.add(ball(3, blue, [0, 0, 0]), ball(0.6, 0, [1.5, 0.8, 2.5]), ball(0.6, 0, [1.5, 0.8, -2.5]));
  const beak = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3, 8), mat(0xe0a030));
  beak.position.set(3.5, -0.2, 0); beak.rotation.z = -Math.PI / 2;
  head.add(beak);
  inner.add(head);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(8, 0.6, 3.5), mat(blue));
  tail.position.set(-9, 8, 0); tail.rotation.z = 0.35;
  inner.add(tail);
  for (const z of [-1.2, 1.2]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3), mat(0xe0a030));
    leg.position.set(0, 1.5, z);
    inner.add(leg);
  }
  const wingShape = new THREE.Shape().moveTo(-3, 0).lineTo(3, 0).lineTo(-2, 11).closePath();
  const wingGeo = new THREE.ShapeGeometry(wingShape).rotateX(Math.PI / 2); // span along +z
  const wings = [0, Math.PI].map((ry) => {
    const p = new THREE.Object3D();
    p.position.set(0, 8, 0); p.rotation.y = ry;
    p.add(new THREE.Mesh(wingGeo, mat(0x264f87)));
    inner.add(p);
    return p;
  });
  scene.add(outer);
  outer.visible = false;
  const flap = (a: number) => { wings[0].rotation.x = a; wings[1].rotation.x = -a; };

  // ---- perches
  type Perch = { kind: "char"; node: Text; index: number } | { kind: "ledge"; el: Element; fx: number; bottom: boolean };
  const inView = (x: number, y: number) => x > -40 && x < W + 40 && y > -40 && y < H + 40;
  const ctx = document.createElement("canvas").getContext("2d")!;
  const perchPoint = (p: Perch) => {
    let x: number, y: number;
    if (p.kind === "ledge") {
      const r = p.el.getBoundingClientRect();
      if (!r.width) return null; // hidden element
      x = r.left + p.fx * r.width; y = p.bottom ? r.bottom - 1 : r.top;
    } else {
      const el = p.node.parentElement;
      if (!el || !p.node.isConnected) return null;
      const rg = document.createRange();
      rg.setStart(p.node, p.index); rg.setEnd(p.node, p.index + 1);
      const r = rg.getClientRects()[0];
      if (!r) return null;
      // range rect spans the font's ascent+descent, so baseline = top + fontAscent; glyph top = baseline - glyph ascent
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = ctx.measureText(p.node.data[p.index]);
      y = r.top + m.fontBoundingBoxAscent - m.actualBoundingBoxAscent;
      x = r.left + r.width / 2;
    }
    return inView(x, y) ? { x, y } : null;
  };
  const charNodes = () => {
    const els = [...document.querySelectorAll("main h1, main h2, main h3"), ...[...document.querySelectorAll("main a *")].filter((e) => parseFloat(getComputedStyle(e).fontSize) >= 20)];
    const nodes: Text[] = [];
    for (const e of els) {
      const tw = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) if (/\S/.test((n as Text).data)) nodes.push(n as Text);
    }
    return nodes;
  };
  const pos = { x: 0, y: 0 };
  const pickPerch = (minDist = 80): Perch | null => {
    const nodes = charNodes();
    // visible horizontal rules: any element's drawn top or bottom border (header line, section rules, list dividers)
    const ledges: { el: Element; bottom: boolean }[] = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      for (const bottom of [false, true]) {
        const side = bottom ? "Bottom" : "Top";
        if (cs[`border${side}Style`] !== "none" && parseFloat(cs[`border${side}Width`]) > 0) ledges.push({ el, bottom });
      }
    }
    const cands: Perch[] = [];
    for (let i = 0; i < 40; i++) {
      if (nodes.length && (Math.random() < 0.6 || !ledges.length)) {
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        const idx = [...node.data].map((c, j) => (/\S/.test(c) ? j : -1)).filter((j) => j >= 0);
        cands.push({ kind: "char", node, index: idx[Math.floor(Math.random() * idx.length)] });
      } else if (ledges.length) cands.push({ kind: "ledge", ...ledges[Math.floor(Math.random() * ledges.length)], fx: R(0.1, 0.9) });
    }
    return cands.find((c) => {
      const pt = perchPoint(c);
      return pt && Math.hypot(pt.x - pos.x, pt.y - pos.y) >= minDist;
    }) ?? null;
  };

  // ---- state machine: fly in once, then always on screen hopping between perches
  let state: "hidden" | "flying" | "perched" = "hidden";
  let wait = 1, t = 0, dur = 1, target: Perch | null = null, glide = 0, stay = 0, bob = 0, hop = 0, face = 1;
  const S = { x: 0, y: 0 };
  let mouse = { x: -999, y: -999 };

  const fly = (to: Perch) => {
    S.x = pos.x; S.y = pos.y; t = 0; target = to; glide = 0;
    const e = perchPoint(to)!;
    dur = Math.min(3, Math.max(0.8, Math.hypot(e.x - S.x, e.y - S.y) / 320));
    state = "flying";
  };
  // the fixed header's bottom border is always on screen, so min=0 always finds something
  const takeoff = (min = 80) => { const p = pickPerch(min) ?? pickPerch(0); if (p) fly(p); };

  const update = (dt: number, now: number) => {
    if (state === "hidden") {
      outer.visible = false;
      if ((wait -= dt) > 0) return;
      const p = pickPerch(0);
      if (!p) { wait = 3; return; }
      pos.x = Math.random() < 0.5 ? -30 : W + 30; pos.y = R(0, H * 0.6);
      outer.visible = true;
      fly(p);
    } else if (state === "perched") {
      const pt = perchPoint(target!);
      if (!pt) return takeoff();
      pos.x = pt.x; pos.y = pt.y;
      flap(-0.1); inner.rotation.z = 0;
      if (Math.hypot(mouse.x - pos.x, mouse.y - (pos.y - 8)) < 70) return takeoff(200);
      bob -= dt;
      head.rotation.z = bob < 0 && bob > -0.25 ? Math.sin((-bob / 0.25) * Math.PI) * 0.35 : 0;
      if (bob < -0.25) bob = R(0.8, 1.4);
      if (hop > 0) hop -= dt;
      if (hop <= 0 && Math.random() < dt * 0.3) { hop = 0.15; if (Math.random() < 0.5) face = -face; }
      pos.y -= hop > 0 ? Math.sin((1 - hop / 0.15) * Math.PI) * 6 : 0;
      if ((stay -= dt) < 0) takeoff();
    } else {
      // flying: quadratic bezier to the live target; retarget if it scrolls away
      const e = perchPoint(target!);
      if (!e) return takeoff(0);
      const d = Math.hypot(e.x - S.x, e.y - S.y);
      const C = { x: (S.x + e.x) / 2, y: (S.y + e.y) / 2 - (0.3 * d + 40) };
      t += dt;
      const lin = Math.min(t / dur, 1), u = ease(lin), v = 1 - u;
      pos.x = v * v * S.x + 2 * v * u * C.x + u * u * e.x;
      pos.y = v * v * S.y + 2 * v * u * C.y + u * u * e.y;
      const dx = 2 * v * (C.x - S.x) + 2 * u * (e.x - C.x), dy = 2 * v * (C.y - S.y) + 2 * u * (e.y - C.y);
      if (Math.abs(dx) > 1) face = dx >= 0 ? 1 : -1;
      inner.rotation.z = Math.atan2(-dy, Math.abs(dx)) * 0.5;
      head.rotation.z = 0;
      if (glide > 0) { glide -= dt; flap(0.2); }
      else { flap(Math.sin(now * 28) * 0.9); if (Math.random() < dt * 0.5) glide = 0.4; }
      if (lin >= 1) { state = "perched"; stay = R(3, 9); bob = R(0.8, 1.4); hop = 0; }
    }
    outer.position.set(pos.x, -pos.y, 0);
    outer.scale.x = face;
  };

  let last = 0, raf = 0;
  const loop = (ms: number) => {
    raf = requestAnimationFrame(loop);
    const now = ms / 1000;
    const dt = Math.min(now - (last || now), 0.05);
    last = now;
    update(dt, now);
    renderer.render(scene, cam);
  };
  const onMove = (e: PointerEvent) => (mouse = { x: e.clientX, y: e.clientY });
  const onVis = () => (last = 0);
  addEventListener("resize", resize);
  addEventListener("pointermove", onMove);
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(loop);

  stop = () => {
    cancelAnimationFrame(raf);
    removeEventListener("resize", resize);
    removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVis);
    scene.traverse((o: any) => { o.geometry?.dispose(); o.material?.dispose(); });
    renderer.dispose();
  };
});
</script>
