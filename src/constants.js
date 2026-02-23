// ── Duck dimensions ───────────────────────────────────────────────────────────
export const DW         = 12;   // sprite width  (px)
export const DH         = 12;   // sprite height (px, body + legs)

// ── Movement ──────────────────────────────────────────────────────────────────
export const DUCK_SPEED = 0.85; // game-px per frame
export const WALK_RATE  = 7;    // frames per walk step

// ── Idle bob ──────────────────────────────────────────────────────────────────
export const BOB_FREQ   = 0.08; // rad/frame
export const BOB_AMP    = 1.1;  // px

// ── Tree visit ────────────────────────────────────────────────────────────────
export const VISIT_DUR  = 110;  // frames at tree
export const VISIT_RATE = 24;   // heart-burst interval (frames)
export const VISIT_DIST = 13;   // trigger radius (px)

// ── Joy wobble ────────────────────────────────────────────────────────────────
export const JOY_RATE   = 0.18; // rad/frame
export const JOY_AMP    = 0.22; // max rotation (rad)

// ── Room system ───────────────────────────────────────────────────────────────
export const TRANSITION_DUR  = 20;              // total frames for fade (out + in)
export const TRANSITION_HALF = TRANSITION_DUR / 2 | 0;  // 10 — midpoint for room swap
export const LANDMARK_DIST   = 20;  // proximity radius (px) to show info badge

// ── Palette ───────────────────────────────────────────────────────────────────
export const K = {
  Y:'#FFD700', Yd:'#FFB300', Yl:'#FFF0A0', O:'#FF8C00', Ey:'#1a1a1a', Wh:'#FFFFFF',
  gr0:'#4CAF50', gr1:'#388E3C', gr3:'#81C784',
  lf0:'#1B5E20', lf1:'#2D6A4F', lf2:'#43A047', lf3:'#66BB6A',
  trunk:'#5D4037', trunkD:'#4E342E',
};
