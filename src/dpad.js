import { cx, GW, GH } from './canvas.js';

export const DP = { x: GW - 16, y: GH - 19 };  // d-pad centre
export const B  = 10;                            // button size (px)

export const dpad = { up: false, down: false, left: false, right: false };

// Button top-left positions — computed once, reused every frame
export const DP_BTNS = [
  ['up',    DP.x - B/2|0,   DP.y - B*1.5|0],
  ['down',  DP.x - B/2|0,   DP.y + B/2|0  ],
  ['left',  DP.x - B*1.5|0, DP.y - B/2|0  ],
  ['right', DP.x + B/2|0,   DP.y - B/2|0  ],
];

// Single proximity + quadrant approach — no redundant rect checks
export function hitDpad(gx, gy) {
  const dx = gx - DP.x, dy = gy - DP.y;
  if (Math.abs(dx) >= B * 1.6 || Math.abs(dy) >= B * 1.6) return null;
  return Math.abs(dx) > Math.abs(dy)
    ? (dx > 0 ? 'right' : 'left')
    : (dy > 0 ? 'down'  : 'up');
}

export function clearDpad() {
  dpad.up = dpad.down = dpad.left = dpad.right = false;
}

export function drawDpad() {
  const m = DP.x | 0, n = DP.y | 0;

  // Cross background — matches UI panel tone
  cx.fillStyle = 'rgba(14,14,26,0.65)';
  cx.fillRect(m - B*1.5|0, n - B/2|0,   B * 3, B);
  cx.fillRect(m - B/2|0,   n - B*1.5|0, B, B * 3);

  // Button highlights
  for (const [dir, rx, ry] of DP_BTNS) {
    cx.fillStyle = dpad[dir] ? 'rgba(255,240,100,0.75)' : 'rgba(255,255,255,0.13)';
    cx.fillRect(rx, ry, B, B);
  }

  // Arrow pixels
  cx.fillStyle = 'rgba(255,255,255,0.8)';
  cx.fillRect(m,       n-B-1, 1, 1); cx.fillRect(m-1, n-B,   3, 1); cx.fillRect(m-2, n-B+1, 5, 1); // ▲
  cx.fillRect(m,       n+B+1, 1, 1); cx.fillRect(m-1, n+B,   3, 1); cx.fillRect(m-2, n+B-1, 5, 1); // ▼
  cx.fillRect(m-B-1,   n,     1, 1); cx.fillRect(m-B, n-1,   1, 3); cx.fillRect(m-B+1, n-2, 1, 5); // ◄
  cx.fillRect(m+B+1,   n,     1, 1); cx.fillRect(m+B, n-1,   1, 3); cx.fillRect(m+B-1, n-2, 1, 5); // ►
}
