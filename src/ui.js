import { cx, GW, GH } from './canvas.js';
import { ui } from './state.js';

// ── Info button ───────────────────────────────────────────────────────────────
// Top-left corner, only visible when duck is near a landmark
const IBX = 4, IBY = 4, IBW = 16, IBH = 9;

export function hitInfoBtn(gx, gy) {
  return gx >= IBX && gx <= IBX + IBW && gy >= IBY && gy <= IBY + IBH;
}

export function drawInfoBadge(frame) {
  if (!ui.nearLandmark) return;

  const pulse = 0.6 + Math.sin(frame * 0.12) * 0.25;
  cx.globalAlpha = pulse;
  cx.fillStyle   = 'rgba(0,0,0,0.75)';
  cx.fillRect(IBX, IBY, IBW, IBH);

  cx.fillStyle  = '#FFF9C4';
  cx.font       = '5px monospace';
  cx.textAlign  = 'center';
  cx.fillText('[i]', IBX + IBW / 2, IBY + 7);
  cx.textAlign  = 'left';
  cx.globalAlpha = 1;
}

// ── Info card ─────────────────────────────────────────────────────────────────
const CX = 5, CY = 14, CW = 70, CH = 116;    // card rect (game coords)
const PAD = 4;                                 // inner padding
const MAX_CHARS = 26;                          // chars per line at 4px font

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (test.length <= maxChars) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const TYPE_LABEL = {
  statue:   'Statue',
  building: 'Building',
  fountain: 'Fountain',
  pond:     'Pond',
  pavilion: 'Pavilion',
  grove:    'Grove',
};

const TYPE_COLOR = {
  statue:   '#BDBDBD',
  building: '#BCAAA4',
  fountain: '#4FC3F7',
  pond:     '#29B6F6',
  pavilion: '#A1887F',
  grove:    '#81C784',
};

export function drawInfoCard() {
  const lm = ui.card;
  if (!lm) return;

  // Dim overlay
  cx.fillStyle = 'rgba(0,0,0,0.78)';
  cx.fillRect(0, 0, GW, GH);

  // Card background
  cx.fillStyle = '#1A1A2E';
  cx.fillRect(CX, CY, CW, CH);

  // Card border
  cx.fillStyle = '#333355';
  cx.fillRect(CX,          CY,          CW, 1);
  cx.fillRect(CX,          CY + CH - 1, CW, 1);
  cx.fillRect(CX,          CY,          1,  CH);
  cx.fillRect(CX + CW - 1, CY,          1,  CH);

  const col   = TYPE_COLOR[lm.type] || '#EEE';
  const label = (TYPE_LABEL[lm.type] || '').toUpperCase();
  const tx    = CX + PAD;
  let   ty    = CY + PAD;

  // Type badge
  cx.fillStyle = col;
  cx.fillRect(tx, ty, label.length * 2.4 + 4 | 0, 6);
  cx.fillStyle = '#000';
  cx.font      = '3px monospace';
  cx.fillText(label, tx + 2, ty + 5);
  ty += 9;

  // Landmark name
  cx.fillStyle = '#FFFFFF';
  cx.font      = '5px monospace';
  // Word-wrap the name if it's long
  const nameLines = wrapText(lm.name, 20);
  for (const nl of nameLines) {
    cx.fillText(nl, tx, ty + 5);
    ty += 7;
  }
  ty += 1;

  // Year
  if (lm.year && lm.year !== 'historic') {
    cx.fillStyle = '#9E9E9E';
    cx.font      = '3px monospace';
    cx.fillText(lm.year, tx, ty + 3);
    ty += 6;
  }

  // Separator
  ty += 2;
  cx.fillStyle = '#333355';
  cx.fillRect(tx, ty, CW - PAD * 2, 1);
  ty += 4;

  // Body text
  cx.fillStyle = '#CCCCCC';
  cx.font      = '4px monospace';
  const lines  = wrapText(lm.info, MAX_CHARS);
  for (const line of lines) {
    if (ty + 5 > CY + CH - 10) break;   // don't overflow card
    cx.fillText(line, tx, ty + 4);
    ty += 6;
  }

  // "tap to close" hint
  cx.globalAlpha = 0.45;
  cx.fillStyle   = '#FFFFFF';
  cx.font        = '3px monospace';
  cx.textAlign   = 'center';
  cx.fillText('tap anywhere to close', CX + CW / 2, CY + CH - 3);
  cx.textAlign   = 'left';
  cx.globalAlpha = 1;
}
