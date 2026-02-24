import { cx } from './canvas.js';
import { K, DW, DH, JOY_AMP } from './constants.js';
import { duck, game } from './state.js';

// ── Sprite pixel data ─────────────────────────────────────────────────────
// 12w × 10h body rows + 2h leg rows = 12h total
// l=light-cheek  d=dark-wing  e=eye  o=orange-beak/feet  y=yellow  .=empty
// l=light-belly  d=tail/dark-wing  e=eye  o=orange-beak/feet  y=yellow  .=empty
// Duck faces RIGHT. Cols 0-1 = tail region; cols 8-10 = beak (protrudes past head at col 7).
const DK_BODY = [
  '....yyyy....',  // r0: head top (4px, cols 4-7)
  'd...yyyyy...',  // r1: tail begins (d@0), head (cols 4-8)
  'dd.lyyyeooo.',  // r2: tail×2 (dd@0-1), cheek (l@3), eye (e@7), beak row1 (@8-10)
  'd.lyyyyyooo.',  // r3: tail (d@0), cheek (l@2), body (@3-7), beak row2 (@8-10)
  '.lyyyyyyyy..',  // r4: cheek (l@1), body
  '.lyydyyyyy..',  // r5: cheek, dark wing (d@4)
  '.yyyyyyyyyy.',  // r6: wide belly
  '.yyyyyyyyy..',  // r7: belly
  '..yyyyyyy...',  // r8: lower belly
  '...yyyyy....',  // r9: bottom
];
const DK_LEGS = [
  ['....oo......', '....oo......'],
  ['...o..o.....', '..oo..oo....'],
  ['....oo......', '....oo......'],
  ['....o..o....', '....oo..oo..'],
];
const DK_CLR = { y:K.Y, d:K.Yd, l:K.Yl, o:K.O, e:K.Ey };

// ── Pre-rendered sprites: 4 walk frames × 2 directions = 8 canvases ───────
// Index: (facing ? 4 : 0) + walkFrame   (facing: 0=right, 1=left)
export const DUCK_SPRITES = [];

export function buildDuckSprites() {
  for (let facing = 0; facing < 2; facing++) {
    for (let wf = 0; wf < 4; wf++) {
      const oc = new OffscreenCanvas(DW, DH);
      const ot = oc.getContext('2d');
      ot.imageSmoothingEnabled = false;
      if (facing === 1) { ot.translate(DW, 0); ot.scale(-1, 1); }

      for (let r = 0; r < DK_BODY.length; r++)
        for (let c = 0; c < DK_BODY[r].length; c++) {
          const ch = DK_BODY[r][c];
          if (ch !== '.') { ot.fillStyle = DK_CLR[ch] || K.Y; ot.fillRect(c, r, 1, 1); }
        }

      for (let row = 0; row < 2; row++)
        for (let c = 0; c < DK_LEGS[wf][row].length; c++) {
          const ch = DK_LEGS[wf][row][c];
          if (ch !== '.') { ot.fillStyle = K.O; ot.fillRect(c, DK_BODY.length + row, 1, 1); }
        }

      // Eye glint — upper-right of head (eye is at col 7 row 2)
      ot.fillStyle = K.Wh; ot.fillRect(8, 1, 1, 1);
      DUCK_SPRITES.push(oc);
    }
  }
}

// ── Draw ──────────────────────────────────────────────────────────────────
export function drawDuckEntity() {
  const dy = (duck.y + (duck.visiting ? 0 : game.bob)) | 0;

  // Shadow tracks bob offset
  cx.fillStyle = 'rgba(0,0,0,0.14)';
  cx.beginPath();
  cx.ellipse(duck.x + 6, dy + DH + 1, 6, 2, 0, 0, Math.PI * 2);
  cx.fill();

  const spr = DUCK_SPRITES[(duck.facing ? 4 : 0) + (duck.wf & 3)];
  if (duck.joyPhase > 0) {
    cx.save();
    cx.translate(duck.x + 6, dy + 6);
    cx.rotate(Math.sin(duck.joyPhase) * JOY_AMP);
    cx.drawImage(spr, -6, -6);
    cx.restore();
  } else {
    cx.drawImage(spr, duck.x | 0, dy);
  }
}
