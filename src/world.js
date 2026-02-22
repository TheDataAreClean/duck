import { cx, GW, GH } from './canvas.js';
import { K } from './constants.js';

// ── Flowers ───────────────────────────────────────────────────────────────
const FL_COLS = ['#E91E63','#FFC107','#CE93D8','#F44336','#FFFFFF','#FF7043','#80CBC4'];
export const flowers = [];

export function initFlowers() {
  for (let i = 0; i < 22; i++)
    flowers.push({
      x: 2 + (Math.random() * (GW - 4) | 0),
      y: 4 + (Math.random() * (GH - 10) | 0),
      c: FL_COLS[Math.random() * FL_COLS.length | 0],
    });
}

// ── Background (pre-rendered: grass + flowers) ────────────────────────────
export let bgCanvas;

export function buildBackground() {
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

// ── Trees ─────────────────────────────────────────────────────────────────
// Add new entries here to place more trees in the park.
// type 0 = Rain tree (deep green), type 1 = Gulmohar (red-orange flowers)
const TREE_DEFS = [
  { x: 14, y: 44, type: 0 },
  { x: 60, y: 40, type: 1 },
  { x: 35, y: 72, type: 0 },
  { x: 13, y: 98, type: 1 },
  { x: 56, y: 92, type: 0 },
];

export let trees = [];
export const treeSprites = [];  // { canvas, bx, by, gx, gy, gw, gh }
export let sortedTreeIdx = [];  // tree indices sorted by y — computed once

export function initTrees() {
  trees = TREE_DEFS.map(d => ({ ...d, visited: false, glow: 0 }));
}

export function buildTreeSprites() {
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const sc = 0.65 + (tree.y / GH) * 0.55;  // pseudo-depth scale
    const s  = v => v * sc | 0;

    const W  = s(20) + 2;   // canvas: tree spans -s(10) to +s(10)
    const H  = s(41) + 2;   // canvas: canopy -s(38) to shadow +s(3)
    const ox = s(10);        // tree.x position within canvas
    const oy = s(38);        // tree.y position within canvas

    const oc = new OffscreenCanvas(Math.max(W, 1), Math.max(H, 1));
    const ot = oc.getContext('2d');
    ot.imageSmoothingEnabled = false;

    // Trunk
    ot.fillStyle = K.trunk;  ot.fillRect(ox - s(3), oy - s(15), s(6), s(15));
    ot.fillStyle = K.trunkD; ot.fillRect(ox,         oy - s(15), s(1), s(15));

    // Layered canopy
    ot.fillStyle = K.lf0; ot.fillRect(ox - s(10), oy - s(29), s(20), s(16));
    ot.fillStyle = K.lf1;
    ot.fillRect(ox - s(8), oy - s(33), s(16), s(13));
    ot.fillRect(ox - s(5), oy - s(37), s(10), s(9));
    ot.fillStyle = K.lf2;
    ot.fillRect(ox - s(7), oy - s(31), s(5), s(7));
    ot.fillRect(ox + s(2), oy - s(31), s(5), s(7));
    ot.fillStyle = K.lf3;
    ot.fillRect(ox - s(3), oy - s(38), s(6), s(5));

    if (tree.type === 1) {  // Gulmohar flowers
      ot.fillStyle = '#E53935';
      ot.fillRect(ox - s(5), oy - s(36), s(4), s(3));
      ot.fillRect(ox + s(1), oy - s(32), s(3), s(2));
      ot.fillStyle = '#FF7043';
      ot.fillRect(ox - s(1), oy - s(38), s(4), s(3));
      ot.fillRect(ox + s(3), oy - s(35), s(3), s(2));
    }

    // Ground shadow
    ot.fillStyle = 'rgba(0,0,0,0.1)';
    ot.fillRect(ox - s(9), oy, s(18), s(3));

    treeSprites.push({
      canvas: oc,
      bx: tree.x - ox,     // top-left in game coords
      by: tree.y - oy,
      gx: tree.x - s(10),  // glow rect in game coords
      gy: tree.y - s(38),
      gw: s(20),
      gh: s(38),
    });
  }

  sortedTreeIdx = trees.map((_, i) => i).sort((a, b) => trees[a].y - trees[b].y);
}

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
