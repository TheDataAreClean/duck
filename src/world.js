import { cx, GW, GH } from './canvas.js';
import { K } from './constants.js';
import { SPECIES } from './data.js';
import { ui } from './state.js';

// ── Flowers ───────────────────────────────────────────────────────────────────
const FL_COLS = ['#E91E63','#FFC107','#CE93D8','#F44336','#FFFFFF','#FF7043','#80CBC4'];
let flowers = [];

function randomiseFlowers() {
  flowers = [];
  for (let i = 0; i < 22; i++)
    flowers.push({
      x: 2 + (Math.random() * (GW - 4) | 0),
      y: 4 + (Math.random() * (GH - 10) | 0),
      c: FL_COLS[Math.random() * FL_COLS.length | 0],
    });
}

// ── Background (pre-rendered: grass + flowers) ────────────────────────────────
export let bgCanvas;

function buildBackground() {
  bgCanvas = new OffscreenCanvas(GW, GH);
  const bt = bgCanvas.getContext('2d');
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
}

// ── Tree sprites ──────────────────────────────────────────────────────────────
// Per-type canvas dimensions [halfWidth, heightAboveBase, heightBelowBase]
const TYPE_DIMS = [
  [10, 38,  3],  // 0: Rain tree / Silver Oak
  [13, 38,  3],  // 1: Gulmohar / Laburnum / Copper Pod
  [10, 38,  3],  // 2: Jacaranda
  [15, 38,  3],  // 3: Banyan / Peepal
  [ 8, 42,  3],  // 4: Royal Palm
  [10, 40,  3],  // 5: Araucaria / Polyalthia / Mast tree
  [12, 36,  3],  // 6: Mango / Jackfruit
  [ 9, 32,  3],  // 7: Bamboo
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
  ot.fillStyle = 'rgba(0,0,0,0.1)';
  const [hw2] = TYPE_DIMS[spriteType];
  ot.fillRect(ox - s(hw2 - 1), oy, s((hw2 - 1) * 2), s(3));
}

export let trees       = [];
export let treeSprites = [];
export let sortedDrawList = [];  // { kind:'tree'|'landmark', y, treeIdx?, lm? }

// ── loadRoom — called at startup and on every room transition ─────────────────
export function loadRoom(roomData) {
  // 1. New random flowers + re-bake background
  randomiseFlowers();
  buildBackground();

  // 2. Build trees with visit state
  trees = roomData.trees.map(d => ({ ...d, visited: false, glow: 0 }));

  // 3. Pre-render one sprite per tree
  treeSprites = [];
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const spriteType = SPECIES[tree.species]?.sprite ?? 0;
    const sc  = 0.65 + (tree.y / GH) * 0.55;
    const s   = v => Math.max(1, v * sc | 0);
    const [hw, hu, hd] = TYPE_DIMS[spriteType];

    const W  = s(hw * 2) + 4;
    const H  = s(hu + hd) + 4;
    const ox = s(hw) + 2;
    const oy = s(hu) + 2;

    const oc = new OffscreenCanvas(Math.max(W, 4), Math.max(H, 4));
    const ot = oc.getContext('2d');
    ot.imageSmoothingEnabled = false;

    // Pass a sc-aware helper with local ox/oy
    drawTreeOnto(ot, spriteType, sc);

    treeSprites.push({
      canvas: oc,
      bx: tree.x - ox + 2,
      by: tree.y - oy + 2,
      gx: tree.x - s(hw),
      gy: tree.y - s(hu),
      gw: s(hw * 2),
      gh: s(hu),
    });
  }

  // 4. Depth-sorted draw list combining trees and landmarks
  const entries = [
    ...trees.map((t, i) => ({ kind: 'tree',     y: t.y,    treeIdx: i })),
    ...roomData.landmarks.map(lm => ({ kind: 'landmark', y: lm.y, lm })),
  ];
  sortedDrawList = entries.sort((a, b) => a.y - b.y);
}

// ── drawTree ──────────────────────────────────────────────────────────────────
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

// ── Landmark drawing ──────────────────────────────────────────────────────────
const LM_COLOR = {
  statue:   '#BDBDBD',
  building: '#BCAAA4',
  fountain: '#4FC3F7',
  pond:     '#29B6F6',
  pavilion: '#A1887F',
  grove:    '#81C784',
};

function drawLandmarkIcon(type, x, y) {
  const col = LM_COLOR[type] || '#EEE';
  cx.fillStyle = col;

  switch (type) {
    case 'statue':
      cx.fillRect(x - 1, y - 6, 3, 5);   // pillar
      cx.fillRect(x,     y - 7, 1, 1);   // head
      cx.fillStyle = '#9E9E9E';
      cx.fillRect(x - 2, y - 1, 5, 1);   // base
      break;
    case 'building':
      cx.fillRect(x - 3, y - 6, 7, 5);   // block
      cx.fillStyle = '#FFF9C4';
      cx.fillRect(x - 2, y - 5, 1, 2);   // window L
      cx.fillRect(x + 1, y - 5, 1, 2);   // window R
      cx.fillStyle = '#5D4037';
      cx.fillRect(x,     y - 2, 1, 2);   // door
      cx.fillStyle = col;
      cx.fillRect(x - 4, y - 7, 9, 2);   // roof
      break;
    case 'fountain':
      cx.fillStyle = '#42A5F5';
      cx.fillRect(x,     y - 8, 1, 5);   // centre jet
      cx.fillRect(x - 1, y - 7, 1, 4);   // left jet
      cx.fillRect(x + 1, y - 7, 1, 4);   // right jet
      cx.fillRect(x - 2, y - 3, 5, 1);   // basin rim
      cx.fillRect(x - 1, y - 2, 3, 1);
      break;
    case 'pond':
      cx.fillStyle = '#42A5F5';
      cx.fillRect(x - 5, y - 3, 10, 3);
      cx.fillRect(x - 3, y - 4, 6,  1);
      cx.fillRect(x - 3, y,     6,  1);
      cx.fillStyle = '#81D4FA';
      cx.fillRect(x - 3, y - 3, 2,  1);
      break;
    case 'pavilion':
      cx.fillRect(x - 3, y - 5, 7, 4);   // body
      cx.fillStyle = '#5D4037';
      cx.fillRect(x - 4, y - 7, 9, 2);   // roof eave
      cx.fillRect(x - 2, y - 9, 5, 3);   // upper roof
      cx.fillRect(x,     y -10, 1, 1);   // peak
      break;
    case 'grove':
      cx.fillStyle = '#558B2F';
      cx.fillRect(x - 4, y - 6, 3, 5);
      cx.fillRect(x + 1, y - 5, 3, 4);
      cx.fillRect(x - 1, y - 7, 3, 4);
      break;
  }

  // Base marker
  cx.fillStyle = col;
  cx.fillRect(x - 2, y - 1, 5, 2);
}

export function drawLandmark(lm) {
  const x = lm.x | 0, y = lm.y | 0;
  drawLandmarkIcon(lm.type, x, y);

  // Proximity name label
  if (ui.nearLandmark === lm) {
    const col  = LM_COLOR[lm.type] || '#EEE';
    const text = lm.name.toLowerCase();
    const tw   = text.length * 2.4 | 0;
    cx.globalAlpha = 0.92;
    cx.fillStyle   = 'rgba(0,0,0,0.65)';
    cx.fillRect(x - tw / 2 - 2, y - 17, tw + 4, 7);
    cx.fillStyle   = col;
    cx.font        = '4px monospace';
    cx.textAlign   = 'center';
    cx.fillText(text, x, y - 11);
    cx.textAlign   = 'left';
    cx.globalAlpha = 1;
  }
}
