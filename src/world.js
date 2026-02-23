import { cx, GW, GH } from './canvas.js';
import { K } from './constants.js';
import { SPECIES, ROOMS } from './data.js';
import { ui } from './state.js';

// ── Flowers ───────────────────────────────────────────────────────────────────
const FL_COLS = ['#E91E63','#FFC107','#CE93D8','#F44336','#FFFFFF','#FF7043','#80CBC4'];

function genFlowers() {
  const f = [];
  for (let i = 0; i < 22; i++)
    f.push({
      x: 2 + (Math.random() * (GW - 4) | 0),
      y: 4 + (Math.random() * (GH - 10) | 0),
      c: FL_COLS[Math.random() * FL_COLS.length | 0],
    });
  return f;
}

// ── Background baking ─────────────────────────────────────────────────────────
function bakeBackground(flowers) {
  const oc = new OffscreenCanvas(GW, GH);
  const bt = oc.getContext('2d');
  bt.imageSmoothingEnabled = false;

  bt.fillStyle = K.gr0; bt.fillRect(0, 0, GW, GH);
  bt.fillStyle = K.gr1;
  for (let y = 0; y < GH; y += 8)
    for (let x = 0; x < GW; x += 8) {
      bt.fillRect(x + 2, y + 2, 1, 1);
      bt.fillRect(x + 5, y + 6, 1, 1);
    }
  bt.fillStyle = K.gr3;
  for (let y = 0; y < GH; y += 13)
    for (let x = 0; x < GW; x += 13)
      bt.fillRect(x + 5, y + 5, 1, 1);

  for (const { x, y, c } of flowers) {
    bt.fillStyle = c;         bt.fillRect(x, y, 2, 2);
    bt.fillStyle = '#FFF9C4'; bt.fillRect(x, y, 1, 1);
  }
  return oc;
}

// ── Tree drawing ──────────────────────────────────────────────────────────────
// Per-type canvas dimensions [halfWidth, heightAboveBase, heightBelowBase]
const TYPE_DIMS = [
  [10, 38, 3],  // 0: Rain tree / Silver Oak
  [13, 38, 3],  // 1: Gulmohar / Laburnum / Copper Pod
  [10, 38, 3],  // 2: Jacaranda
  [15, 38, 3],  // 3: Banyan / Peepal
  [ 8, 42, 3],  // 4: Royal Palm
  [10, 40, 3],  // 5: Araucaria / Polyalthia
  [12, 36, 3],  // 6: Mango / Jackfruit
  [ 9, 32, 3],  // 7: Bamboo
];

function drawTreeOnto(ot, spriteType, sc) {
  const s = v => Math.max(1, v * sc | 0);
  const [hw, hu] = TYPE_DIMS[spriteType];
  const ox = s(hw), oy = s(hu);

  switch (spriteType) {

    case 0: { // Rain tree / Silver Oak / Castanospermum
      ot.fillStyle = K.trunk;  ot.fillRect(ox - s(3), oy - s(15), s(6), s(15));
      ot.fillStyle = K.trunkD; ot.fillRect(ox,         oy - s(15), s(1), s(15));
      ot.fillStyle = K.lf0; ot.fillRect(ox - s(10), oy - s(29), s(20), s(16));
      ot.fillStyle = K.lf1;
      ot.fillRect(ox - s(8),  oy - s(33), s(16), s(13));
      ot.fillRect(ox - s(5),  oy - s(37), s(10), s(9));
      ot.fillStyle = K.lf2;
      ot.fillRect(ox - s(7),  oy - s(31), s(5),  s(7));
      ot.fillRect(ox + s(2),  oy - s(31), s(5),  s(7));
      ot.fillStyle = K.lf3; ot.fillRect(ox - s(3), oy - s(38), s(6), s(5));
      break;
    }

    case 1: { // Gulmohar / Indian Laburnum / Copper Pod
      ot.fillStyle = K.trunk;  ot.fillRect(ox - s(2), oy - s(14), s(5), s(14));
      ot.fillStyle = K.trunkD; ot.fillRect(ox,         oy - s(14), s(1), s(14));
      ot.fillStyle = K.lf0; ot.fillRect(ox - s(12), oy - s(26), s(24), s(14));
      ot.fillStyle = K.lf1;
      ot.fillRect(ox - s(10), oy - s(30), s(20), s(10));
      ot.fillRect(ox - s(6),  oy - s(34), s(12), s(7));
      ot.fillStyle = '#E53935';
      ot.fillRect(ox - s(7), oy - s(33), s(5), s(4));
      ot.fillRect(ox + s(2), oy - s(29), s(4), s(3));
      ot.fillStyle = '#FF7043';
      ot.fillRect(ox - s(2), oy - s(36), s(5), s(4));
      ot.fillRect(ox + s(4), oy - s(33), s(4), s(3));
      ot.fillRect(ox - s(9), oy - s(29), s(3), s(2));
      break;
    }

    case 2: { // Jacaranda — violet-blue canopy
      ot.fillStyle = '#6D4C41'; ot.fillRect(ox - s(2), oy - s(16), s(5), s(16));
      ot.fillStyle = '#5D4037'; ot.fillRect(ox,         oy - s(16), s(1), s(16));
      ot.fillStyle = '#2E4A6A'; ot.fillRect(ox - s(9),  oy - s(28), s(18), s(14));
      ot.fillStyle = '#3A5F8A';
      ot.fillRect(ox - s(7),  oy - s(32), s(14), s(10));
      ot.fillRect(ox - s(4),  oy - s(36), s(8),  s(7));
      ot.fillStyle = '#7B1FA2';
      ot.fillRect(ox - s(5), oy - s(34), s(3), s(3));
      ot.fillRect(ox + s(1), oy - s(30), s(3), s(2));
      ot.fillRect(ox - s(2), oy - s(37), s(3), s(3));
      ot.fillStyle = '#9C27B0';
      ot.fillRect(ox - s(7), oy - s(29), s(3), s(2));
      ot.fillRect(ox + s(3), oy - s(35), s(3), s(2));
      ot.fillStyle = '#CE93D8'; ot.fillRect(ox - s(1), oy - s(38), s(2), s(2));
      break;
    }

    case 3: { // Banyan / Peepal — wide canopy, multiple trunks
      ot.fillStyle = K.trunk;
      ot.fillRect(ox - s(1), oy - s(18), s(4), s(18));
      ot.fillRect(ox - s(8), oy - s(8),  s(2), s(8));
      ot.fillRect(ox + s(6), oy - s(10), s(2), s(10));
      ot.fillStyle = K.trunkD; ot.fillRect(ox + s(1), oy - s(18), s(1), s(18));
      ot.fillStyle = '#1A4A20'; ot.fillRect(ox - s(14), oy - s(28), s(28), s(16));
      ot.fillStyle = K.lf0;
      ot.fillRect(ox - s(12), oy - s(32), s(24), s(12));
      ot.fillRect(ox - s(8),  oy - s(36), s(16), s(8));
      ot.fillStyle = K.lf1;
      ot.fillRect(ox - s(10), oy - s(30), s(7),  s(6));
      ot.fillRect(ox + s(3),  oy - s(30), s(7),  s(6));
      ot.fillStyle = K.lf2;
      ot.fillRect(ox - s(6),  oy - s(34), s(4),  s(4));
      ot.fillRect(ox + s(2),  oy - s(34), s(4),  s(4));
      break;
    }

    case 4: { // Royal Palm — tall thin trunk, small frond crown
      ot.fillStyle = '#8D6E63'; ot.fillRect(ox - s(1), oy - s(32), s(3), s(32));
      ot.fillStyle = '#795548'; ot.fillRect(ox + s(1), oy - s(32), s(1), s(32));
      ot.fillStyle = '#6D4C41';
      for (let i = 0; i < 8; i++)
        ot.fillRect(ox - s(1), oy - s(5 + i * 4), s(3), s(1));
      ot.fillStyle = '#33691E';
      ot.fillRect(ox - s(7), oy - s(36), s(15), s(5));
      ot.fillRect(ox - s(4), oy - s(40), s(9),  s(6));
      ot.fillStyle = '#558B2F';
      ot.fillRect(ox - s(6), oy - s(35), s(4),  s(2));
      ot.fillRect(ox + s(2), oy - s(35), s(4),  s(2));
      ot.fillRect(ox - s(2), oy - s(39), s(5),  s(2));
      break;
    }

    case 5: { // Araucaria / Polyalthia — tall columnar, tiered branches
      ot.fillStyle = K.trunk;  ot.fillRect(ox - s(2), oy - s(20), s(4), s(20));
      ot.fillStyle = K.trunkD; ot.fillRect(ox,         oy - s(20), s(1), s(20));
      ot.fillStyle = K.lf0;
      ot.fillRect(ox - s(9), oy - s(22), s(18), s(5));
      ot.fillRect(ox - s(7), oy - s(28), s(14), s(5));
      ot.fillRect(ox - s(5), oy - s(33), s(10), s(4));
      ot.fillRect(ox - s(2), oy - s(38), s(5),  s(6));
      ot.fillStyle = K.lf2;
      ot.fillRect(ox - s(6), oy - s(21), s(3),  s(3));
      ot.fillRect(ox + s(3), oy - s(27), s(3),  s(3));
      ot.fillRect(ox - s(2), oy - s(33), s(2),  s(2));
      break;
    }

    case 6: { // Mango / Jackfruit — round dense canopy, stout trunk
      ot.fillStyle = '#4E342E'; ot.fillRect(ox - s(3), oy - s(12), s(7), s(12));
      ot.fillStyle = '#3E2723'; ot.fillRect(ox + s(1), oy - s(12), s(2), s(12));
      ot.fillStyle = '#1B5E20'; ot.fillRect(ox - s(11), oy - s(27), s(22), s(18));
      ot.fillStyle = K.lf1;
      ot.fillRect(ox - s(10), oy - s(30), s(20), s(14));
      ot.fillRect(ox - s(7),  oy - s(34), s(14), s(10));
      ot.fillStyle = K.lf2;
      ot.fillRect(ox - s(8),  oy - s(28), s(5),  s(6));
      ot.fillRect(ox + s(3),  oy - s(28), s(5),  s(6));
      ot.fillStyle = K.lf3; ot.fillRect(ox - s(4), oy - s(33), s(8), s(5));
      ot.fillStyle = '#FF8F00';
      ot.fillRect(ox - s(4), oy - s(20), s(2), s(2));
      ot.fillRect(ox + s(2), oy - s(23), s(2), s(2));
      break;
    }

    case 7: { // Bamboo — cluster of thin stalks
      const STALK_COLORS = ['#558B2F','#7CB342','#33691E','#8BC34A','#689F38'];
      const offsets = [-s(6), -s(3), 0, s(3), s(6)];
      for (let k = 0; k < 5; k++) {
        const sx = ox + offsets[k];
        const h  = s(26) + (k % 2) * s(4);
        ot.fillStyle = STALK_COLORS[k];
        ot.fillRect(sx, oy - h, s(2), h);
        ot.fillStyle = '#33691E';
        for (let n = 0; n < 4; n++)
          ot.fillRect(sx - s(1), oy - s(6 + n * 6), s(4), s(1));
        ot.fillStyle = '#8BC34A';
        ot.fillRect(sx - s(3), oy - h,       s(7), s(2));
        ot.fillRect(sx - s(2), oy - h - s(2), s(5), s(2));
      }
      break;
    }
  }

  // Ground shadow (all types)
  const [hw2] = TYPE_DIMS[spriteType];
  ot.fillStyle = 'rgba(0,0,0,0.1)';
  ot.fillRect(ox - s(hw2 - 1), oy, s((hw2 - 1) * 2), s(3));
}

function buildTreeSprite(tree) {
  const spriteType = SPECIES[tree.species]?.sprite ?? 0;
  const sc  = 0.65 + (tree.y / GH) * 0.55;
  const s   = v => Math.max(1, v * sc | 0);
  const [hw, hu, hd] = TYPE_DIMS[spriteType];

  const oc = new OffscreenCanvas(Math.max(s(hw * 2) + 4, 4), Math.max(s(hu + hd) + 4, 4));
  const ot = oc.getContext('2d');
  ot.imageSmoothingEnabled = false;
  drawTreeOnto(ot, spriteType, sc);

  const bx = tree.x - s(hw);
  const by = tree.y - s(hu);
  return { canvas: oc, bx, by, gx: bx, gy: by, gw: s(hw * 2), gh: s(hu) };
}

// ── Landmark icon pre-rendering ───────────────────────────────────────────────
const LM_W = 14, LM_H = 14, LM_OX = 7, LM_OY = 12;

export const LM_COLOR = {
  statue:   '#BDBDBD',
  building: '#BCAAA4',
  fountain: '#4FC3F7',
  pond:     '#29B6F6',
  pavilion: '#A1887F',
  grove:    '#81C784',
};

function drawLandmarkIconOnto(ctx, type, x, y) {
  const col = LM_COLOR[type] || '#EEE';
  ctx.fillStyle = col;

  switch (type) {
    case 'statue':
      ctx.fillRect(x - 1, y - 6, 3, 5);
      ctx.fillRect(x,     y - 7, 1, 1);
      ctx.fillStyle = '#9E9E9E';
      ctx.fillRect(x - 2, y - 1, 5, 1);
      break;
    case 'building':
      ctx.fillRect(x - 3, y - 6, 7, 5);
      ctx.fillStyle = '#FFF9C4';
      ctx.fillRect(x - 2, y - 5, 1, 2);
      ctx.fillRect(x + 1, y - 5, 1, 2);
      ctx.fillStyle = '#5D4037';
      ctx.fillRect(x,     y - 2, 1, 2);
      ctx.fillStyle = col;
      ctx.fillRect(x - 4, y - 7, 9, 2);
      break;
    case 'fountain':
      ctx.fillStyle = '#42A5F5';
      ctx.fillRect(x,     y - 8, 1, 5);
      ctx.fillRect(x - 1, y - 7, 1, 4);
      ctx.fillRect(x + 1, y - 7, 1, 4);
      ctx.fillRect(x - 2, y - 3, 5, 1);
      ctx.fillRect(x - 1, y - 2, 3, 1);
      break;
    case 'pond':
      ctx.fillStyle = '#42A5F5';
      ctx.fillRect(x - 5, y - 3, 10, 3);
      ctx.fillRect(x - 3, y - 4, 6,  1);
      ctx.fillRect(x - 3, y,     6,  1);
      ctx.fillStyle = '#81D4FA';
      ctx.fillRect(x - 3, y - 3, 2,  1);
      break;
    case 'pavilion':
      ctx.fillRect(x - 3, y - 5, 7, 4);
      ctx.fillStyle = '#5D4037';
      ctx.fillRect(x - 4, y - 7, 9, 2);
      ctx.fillRect(x - 2, y - 9, 5, 3);
      ctx.fillRect(x,     y -10, 1, 1);
      break;
    case 'grove':
      ctx.fillStyle = '#558B2F';
      ctx.fillRect(x - 4, y - 6, 3, 5);
      ctx.fillRect(x + 1, y - 5, 3, 4);
      ctx.fillRect(x - 1, y - 7, 3, 4);
      break;
  }

  ctx.fillStyle = col;
  ctx.fillRect(x - 2, y - 1, 5, 2);   // base marker
}

function buildLandmarkSprite(lm) {
  const oc = new OffscreenCanvas(LM_W, LM_H);
  const ot = oc.getContext('2d');
  ot.imageSmoothingEnabled = false;
  drawLandmarkIconOnto(ot, lm.type, LM_OX, LM_OY);
  return { canvas: oc, bx: lm.x - LM_OX, by: lm.y - LM_OY };
}

// ── Room cache — all rooms pre-rendered at startup ────────────────────────────
const roomCache = [];

function prerenderRoom(roomData) {
  const flowers      = genFlowers();
  const bgCv         = bakeBackground(flowers);
  const treeSprites  = roomData.trees.map(buildTreeSprite);
  const lmSprites    = roomData.landmarks.map(buildLandmarkSprite);

  // Depth-sorted draw list: trees by treeIdx, landmarks by lmIdx
  const entries = [
    ...roomData.trees.map((t, i) => ({ kind: 'tree',     y: t.y,    treeIdx: i })),
    ...roomData.landmarks.map((lm, i) => ({ kind: 'landmark', y: lm.y, lm, lmIdx: i })),
  ];
  const sortedList = entries.sort((a, b) => a.y - b.y);

  return { bgCv, treeSprites, lmSprites, sortedList };
}

export function prerenderAllRooms() {
  for (const roomData of ROOMS)
    roomCache.push(prerenderRoom(roomData));
}

// ── Active room state (live bindings — importers see updates) ─────────────────
export let bgCanvas       = null;
export let trees          = [];
export let treeSprites    = [];
export let landmarkSprites = [];
export let sortedDrawList = [];

export function loadRoom(roomIdx) {
  const cached       = roomCache[roomIdx];
  bgCanvas           = cached.bgCv;
  trees              = ROOMS[roomIdx].trees.map(t => ({ ...t, visited: false, glow: 0 }));
  treeSprites        = cached.treeSprites;
  landmarkSprites    = cached.lmSprites;
  sortedDrawList     = cached.sortedList;
}

// ── Draw functions ────────────────────────────────────────────────────────────
export function drawTree(tree, idx) {
  const spr = treeSprites[idx];
  cx.drawImage(spr.canvas, spr.bx, spr.by);
  if (tree.glow > 0) {
    cx.globalAlpha = tree.glow * 0.18;
    cx.fillStyle   = '#FFFF96';
    cx.fillRect(spr.gx, spr.gy, spr.gw, spr.gh);
    cx.globalAlpha = 1;
  }
}

export function drawLandmark(lm, lmIdx) {
  const spr = landmarkSprites[lmIdx];
  cx.drawImage(spr.canvas, spr.bx, spr.by);

  if (ui.nearLandmark === lm) {
    const col = LM_COLOR[lm.type] || '#EEE';
    cx.globalAlpha = 0.92;
    cx.fillStyle   = 'rgba(0,0,0,0.65)';
    cx.fillRect(lm.x - lm._nameWidth / 2 - 2, lm.y - 17, lm._nameWidth + 4, 7);
    cx.fillStyle   = col;
    cx.font        = '4px monospace';
    cx.textAlign   = 'center';
    cx.fillText(lm._nameLower, lm.x, lm.y - 11);
    cx.textAlign   = 'left';
    cx.globalAlpha = 1;
  }
}
