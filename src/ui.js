import { cx, GW, GH } from './canvas.js';
import { UI_BG, UI_BORDER } from './constants.js';
import { ui } from './state.js';

// ── Text utilities (exported for preprocessData in main.js) ───────────────────
export const MAX_CHARS = 26;

export function wrapText(text, maxChars) {
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

export const TYPE_LABEL = {
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

// ── Info button ───────────────────────────────────────────────────────────────
const IBX = 3, IBY = 3, IBW = 16, IBH = 9;

export function hitInfoBtn(gx, gy) {
  return gx >= IBX && gx <= IBX + IBW && gy >= IBY && gy <= IBY + IBH;
}

export function drawInfoBadge(frame) {
  if (!ui.nearLandmark) return;

  const pulse = 0.65 + Math.sin(frame * 0.12) * 0.25;
  cx.globalAlpha = pulse;
  cx.fillStyle   = UI_BG;
  cx.fillRect(IBX, IBY, IBW, IBH);
  cx.fillStyle   = UI_BORDER;
  cx.fillRect(IBX,          IBY,          IBW, 1);
  cx.fillRect(IBX,          IBY + IBH - 1, IBW, 1);
  cx.fillRect(IBX,          IBY,          1, IBH);
  cx.fillRect(IBX + IBW - 1, IBY,          1, IBH);
  cx.fillStyle   = '#FFF9C4';
  cx.font        = '5px monospace';
  cx.textAlign   = 'center';
  cx.fillText('[i]', IBX + IBW / 2, IBY + 7);
  cx.textAlign   = 'left';
  cx.globalAlpha = 1;
}

// ── Info card ─────────────────────────────────────────────────────────────────
const CX = 5, CY = 8, CW = 70, CH = 128;
const PAD = 4;

export function drawInfoCard() {
  const lm = ui.card;
  if (!lm) return;

  // Dim overlay
  cx.fillStyle = 'rgba(0,0,0,0.78)';
  cx.fillRect(0, 0, GW, GH);

  // Card background
  cx.fillStyle = UI_BG;
  cx.fillRect(CX, CY, CW, CH);

  // Card border
  cx.fillStyle = UI_BORDER;
  cx.fillRect(CX,          CY,          CW, 1);
  cx.fillRect(CX,          CY + CH - 1, CW, 1);
  cx.fillRect(CX,          CY,          1,  CH);
  cx.fillRect(CX + CW - 1, CY,          1,  CH);

  const col = TYPE_COLOR[lm.type] || '#EEE';
  const tx  = CX + PAD;
  let   ty  = CY + PAD;

  // Type badge — uses pre-computed _typeUpper
  const badgeW = lm._typeUpper.length * 2.4 + 4 | 0;
  cx.fillStyle = col;
  cx.fillRect(tx, ty, badgeW, 6);
  cx.fillStyle = '#000';
  cx.font      = '3px monospace';
  cx.fillText(lm._typeUpper, tx + 2, ty + 5);
  ty += 9;

  // Name — uses pre-computed _nameLines
  cx.fillStyle = '#FFFFFF';
  cx.font      = '5px monospace';
  for (const nl of lm._nameLines) {
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
  cx.fillStyle = UI_BORDER;
  cx.fillRect(tx, ty, CW - PAD * 2, 1);
  ty += 4;

  // Body — uses pre-computed _wrappedInfo
  cx.fillStyle = '#CCCCCC';
  cx.font      = '4px monospace';
  for (const line of lm._wrappedInfo) {
    if (ty + 5 > CY + CH - 10) break;
    cx.fillText(line, tx, ty + 4);
    ty += 6;
  }

  // Tap hint
  cx.globalAlpha = 0.45;
  cx.fillStyle   = '#FFFFFF';
  cx.font        = '3px monospace';
  cx.textAlign   = 'center';
  cx.fillText('tap anywhere to close', CX + CW / 2, CY + CH - 3);
  cx.textAlign   = 'left';
  cx.globalAlpha = 1;
}
