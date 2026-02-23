import { cx, GW, GH } from './canvas.js';
import { UI_BG, UI_BORDER } from './constants.js';
import { duck, game, room } from './state.js';
import { ROOMS } from './data.js';

// ── Mini-map ──────────────────────────────────────────────────────────────────
// 6 rooms in a 3×3 grid. Each room = 4×4 px, step = 6 (4 + 2 gap).
// 1 px border → canvas is 18×18 px (square).
//
// Geographically correct NSEW layout — full 3×3:
//
//   col:  0 (WEST)              1 (CENTRAL)            2 (EAST)
//  row 0: [1: Library Grove]   [0: Attara Kacheri]    [6: Queens Road]
//  row 1: [5: West Fountain]   [3: Central Lawn]      [4: East Lawns]
//  row 2: [2: Museum Walk]     [7: South Lawns]       [8: Aquarium Corner]
//
//  col=0 → x=1   col=1 → x=7   col=2 → x=13
//  row=0 → y=1   row=1 → y=7   row=2 → y=13

const MM_W = 18, MM_H = 18;
const MM_X = 3,  MM_Y = GH - MM_H - 3;  // bottom-left, 3 px from edges

// Top-left corner of each room's 4×4 block inside the 18×18 canvas
const MAP_POS = [
  { x:7,  y:1  }, // 0: Attara Kacheri   — col 1, row 0 (N)
  { x:1,  y:1  }, // 1: Library Grove    — col 0, row 0 (NW)
  { x:1,  y:13 }, // 2: Museum Walk      — col 0, row 2 (SW)
  { x:7,  y:7  }, // 3: Central Lawn     — col 1, row 1 (C)
  { x:13, y:7  }, // 4: East Lawns       — col 2, row 1 (E)
  { x:1,  y:7  }, // 5: West Fountain    — col 0, row 1 (W)
  { x:13, y:1  }, // 6: Queens Road      — col 2, row 0 (NE)
  { x:7,  y:13 }, // 7: South Lawns      — col 1, row 2 (S)
  { x:13, y:13 }, // 8: Aquarium Corner  — col 2, row 2 (SE)
];

// Corridor rects [x, y, w, h] filling the 2-px gaps between adjacent rooms
const CORRIDORS = [
  [5,   2, 2, 2], // 1 ↔ 0  (row 0, col 0↔1)
  [11,  2, 2, 2], // 0 ↔ 6  (row 0, col 1↔2)
  [2,   5, 2, 2], // 1 ↔ 5  (col 0, row 0↔1)
  [8,   5, 2, 2], // 0 ↔ 3  (col 1, row 0↔1)
  [13,  5, 2, 2], // 6 ↔ 4  (col 2, row 0↔1)
  [5,   8, 2, 2], // 5 ↔ 3  (row 1, col 0↔1)
  [11,  8, 2, 2], // 3 ↔ 4  (row 1, col 1↔2)
  [2,  11, 2, 2], // 5 ↔ 2  (col 0, row 1↔2)
  [8,  11, 2, 2], // 3 ↔ 7  (col 1, row 1↔2)
  [13, 11, 2, 2], // 4 ↔ 8  (col 2, row 1↔2)
  [5,  14, 2, 2], // 2 ↔ 7  (row 2, col 0↔1)
  [11, 14, 2, 2], // 7 ↔ 8  (row 2, col 1↔2)
];

let mmCanvas = null;

export function buildMiniMap() {
  mmCanvas = new OffscreenCanvas(MM_W, MM_H);
  const mc = mmCanvas.getContext('2d');

  // Background
  mc.fillStyle = UI_BG;
  mc.fillRect(0, 0, MM_W, MM_H);

  // 1-px border
  mc.fillStyle = UI_BORDER;
  mc.fillRect(0, 0, MM_W, 1);
  mc.fillRect(0, MM_H - 1, MM_W, 1);
  mc.fillRect(0, 0, 1, MM_H);
  mc.fillRect(MM_W - 1, 0, 1, MM_H);

  // Rooms and corridors share one colour — reads as a connected park path
  mc.fillStyle = '#4E7450';
  for (const [x, y, w, h] of CORRIDORS) mc.fillRect(x, y, w, h);
  for (const p of MAP_POS) mc.fillRect(p.x, p.y, 4, 4);
}

export function drawMiniMap() {
  if (!mmCanvas) return;

  // Static base
  cx.drawImage(mmCanvas, MM_X, MM_Y);

  // Adjacent rooms (reachable from here) — slightly brighter than base
  const exits = ROOMS[room.current].exits;
  cx.fillStyle = '#6EA870';
  for (const dir of ['north', 'south', 'east', 'west']) {
    const rid = exits[dir];
    if (rid != null) {
      const p = MAP_POS[rid];
      cx.fillRect(MM_X + p.x, MM_Y + p.y, 4, 4);
    }
  }

  // Current room — bright green
  const cur = MAP_POS[room.current];
  cx.fillStyle = '#88EE88';
  cx.fillRect(MM_X + cur.x, MM_Y + cur.y, 4, 4);

  // Duck dot — 1×1 px gold, mapped within the 4×4 room block
  const ddx = cur.x + Math.min(3, (duck.x / GW * 4) | 0);
  const ddy = cur.y + Math.min(3, (duck.y / GH * 4) | 0);
  cx.fillStyle = '#FFD700';
  cx.fillRect(MM_X + ddx, MM_Y + ddy, 1, 1);
}

// ── Exit indicators ───────────────────────────────────────────────────────────
// Pixel patterns as [col, row] offsets from the arrow's top-left anchor.
// Larger than before (7 w × 4 h for N/S, 4 w × 7 h for E/W).

// Up arrow (7 w × 4 h):  ...X...  ..XXX..  .XXXXX.  XXXXXXX
const PX_UP = [
  [3,0],
  [2,1],[3,1],[4,1],
  [1,2],[2,2],[3,2],[4,2],[5,2],
  [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
];

// Down arrow (7 w × 4 h): XXXXXXX  .XXXXX.  ..XXX..  ...X...
const PX_DOWN = [
  [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
  [1,1],[2,1],[3,1],[4,1],[5,1],
  [2,2],[3,2],[4,2],
  [3,3],
];

// Left arrow (4 w × 7 h): ...X  ..XX  .XXX  XXXX  .XXX  ..XX  ...X
const PX_LEFT = [
  [3,0],
  [2,1],[3,1],
  [1,2],[2,2],[3,2],
  [0,3],[1,3],[2,3],[3,3],
  [1,4],[2,4],[3,4],
  [2,5],[3,5],
  [3,6],
];

// Right arrow (4 w × 7 h): X...  XX..  XXX.  XXXX  XXX.  XX..  X...
const PX_RIGHT = [
  [0,0],
  [0,1],[1,1],
  [0,2],[1,2],[2,2],
  [0,3],[1,3],[2,3],[3,3],
  [0,4],[1,4],[2,4],
  [0,5],[1,5],
  [0,6],
];

function drawArrow(pixels, ox, oy) {
  for (const [px, py] of pixels) cx.fillRect(ox + px, oy + py, 1, 1);
}

export function drawExitIndicators(frame) {
  if (room.transitioning) return;
  const exits = ROOMS[room.current].exits;
  const alpha  = 0.70 + Math.sin(frame * 0.09) * 0.25; // pulses 0.45 → 0.95

  // Shadow pass — draw arrows 1 px down-right in black for contrast
  cx.fillStyle   = '#000000';
  cx.globalAlpha = alpha * 0.55;
  if (exits.north != null) drawArrow(PX_UP,    (GW / 2 - 3) | 0, 3);
  if (exits.south != null) drawArrow(PX_DOWN,  (GW / 2 - 3) | 0, GH - 5);
  if (exits.west  != null) drawArrow(PX_LEFT,  3, (GH / 2 - 3) | 0);
  if (exits.east  != null) drawArrow(PX_RIGHT, GW - 5, (GH / 2 - 3) | 0);

  // Main pass — bright white, 1 px above/left of shadow
  cx.fillStyle   = '#FFFFFF';
  cx.globalAlpha = alpha;
  if (exits.north != null) drawArrow(PX_UP,    (GW / 2 - 3) | 0, 2);
  if (exits.south != null) drawArrow(PX_DOWN,  (GW / 2 - 3) | 0, GH - 6);
  if (exits.west  != null) drawArrow(PX_LEFT,  2, (GH / 2 - 3) | 0);
  if (exits.east  != null) drawArrow(PX_RIGHT, GW - 6, (GH / 2 - 3) | 0);

  cx.globalAlpha = 1;
}
