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

// ── UI panel style ────────────────────────────────────────────────────────────
export const UI_BG     = '#0E0E1A';  // dark navy — shared panel background
export const UI_BORDER = '#2D2D50';  // muted indigo — shared panel border

// ── Palette ───────────────────────────────────────────────────────────────────
export const K = {
  Y:'#FFD700', Yd:'#FFB300', Yl:'#FFF0A0', O:'#FF8C00', Ey:'#1a1a1a', Wh:'#FFFFFF', Bl:'#000000',
  gr0:'#4CAF50', gr1:'#388E3C', gr3:'#81C784',
  lf0:'#1B5E20', lf1:'#2D6A4F', lf2:'#43A047', lf3:'#66BB6A',
  trunk:'#5D4037', trunkD:'#4E342E',
};

// ── Typography ────────────────────────────────────────────────────────────────
export const F3 = '3px monospace';  // type badge, year, card hint
export const F4 = '4px monospace';  // body text, labels
export const F5 = '5px monospace';  // [i] button, card name

// ── UI text colours ───────────────────────────────────────────────────────────
export const UI_DIM  = '#9E9E9E';  // secondary text (year)
export const UI_BODY = '#CCCCCC';  // card body text
export const UI_WARM = '#FFF9C4';  // warm white (badge text, windows, notes)

// ── Particle colours ──────────────────────────────────────────────────────────
export const P_HEART = '#FF4081';  // heart burst (hot pink)
export const P_NOTE  = '#FFF9C4';  // music note burst (= UI_WARM)

// ── Landmark type colours ─────────────────────────────────────────────────────
export const LM_COLOR = {
  statue:   '#BDBDBD',
  building: '#BCAAA4',
  fountain: '#4FC3F7',
  pond:     '#29B6F6',
  pavilion: '#A1887F',
  grove:    '#81C784',
};

// ── Flower palette (22 random blooms per room) ────────────────────────────────
export const FL_COLS = ['#E91E63','#FFC107','#CE93D8','#F44336','#FFFFFF','#FF7043','#80CBC4'];

// ── Mini-map room colours ─────────────────────────────────────────────────────
export const MM_INACTIVE = '#4E7450';  // not current, not adjacent
export const MM_ADJACENT = '#6EA870';  // reachable from current room
export const MM_CURRENT  = '#88EE88';  // current room

// ── Tree-specific colours ─────────────────────────────────────────────────────
export const TR = {
  gulFlower:  '#E53935',  // Gulmohar red flowers
  gulFlower2: '#FF7043',  // Gulmohar orange flowers
  jacTrunk:   '#6D4C41',  // Jacaranda trunk base / Royal Palm ring bands
  jacCanopyD: '#2E4A6A',  // Jacaranda deep canopy
  jacCanopy:  '#3A5F8A',  // Jacaranda canopy
  jacFlowerD: '#7B1FA2',  // Jacaranda deep violet blooms
  jacFlower:  '#9C27B0',  // Jacaranda violet blooms
  jacFlowerL: '#CE93D8',  // Jacaranda light blooms
  rpTrunk:    '#8D6E63',  // Royal Palm trunk
  rpTrunkD:   '#795548',  // Royal Palm trunk shadow / rings
  rpFrondD:   '#33691E',  // Royal Palm frond dark
  rpFrond:    '#558B2F',  // Royal Palm frond
  bmStalks: ['#558B2F','#7CB342','#33691E','#8BC34A','#689F38'],  // Bamboo stalk cycle
  mnFruit:    '#FF8F00',  // Mango / Jackfruit fruit
  mnTrunkD:   '#3E2723',  // Mango / Jackfruit darkest trunk shadow
  bnDark:     '#1A4A20',  // Banyan / Peepal darkest canopy
};

// ── Landmark icon detail colours ──────────────────────────────────────────────
export const LD = {
  stone:    '#D7CCC8',  // columns, trim, stonework
  window:   '#FFF9C4',  // window fill (= UI_WARM)
  door:     '#8D6E63',  // wood / doors
  roof:     '#795548',  // roof bands (= TR.rpTrunkD)
  water:    '#42A5F5',  // fountain / pond water
  waterL:   '#81D4FA',  // water ripple highlight
  pedestal: '#9E9E9E',  // statue base (= UI_DIM)
  grove:    '#558B2F',  // grove vegetation (= TR.rpFrond)
};
