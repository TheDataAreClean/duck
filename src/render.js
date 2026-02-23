import { cx, GW, GH } from './canvas.js';
import { K, DH, TRANSITION_HALF } from './constants.js';
import { duck, game, room, ui } from './state.js';
import { drawDuckEntity } from './duck.js';
import { bgCanvas, trees, sortedDrawList, drawTree, drawLandmark } from './world.js';
import { drawParticles } from './particles.js';
import { drawDpad } from './dpad.js';
import { drawInfoBadge, drawInfoCard } from './ui.js';
import { drawMiniMap, drawExitIndicators } from './hud.js';
import { ROOMS } from './data.js';

export function render() {
  // Background — single drawImage replaces ~300 fillRects
  cx.drawImage(bgCanvas, 0, 0);

  // Depth-sorted: trees, landmarks, and duck interleaved by y
  const duckFeetY = duck.y + DH;
  let duckDrawn = false;

  for (const item of sortedDrawList) {
    if (!duckDrawn && duckFeetY <= item.y) {
      drawDuckEntity();
      duckDrawn = true;
    }
    if (item.kind === 'tree') {
      drawTree(trees[item.treeIdx], item.treeIdx);
    } else {
      drawLandmark(item.lm, item.lmIdx);
    }
  }
  if (!duckDrawn) drawDuckEntity();

  drawParticles();
  drawDpad();
  drawMiniMap();
  drawExitIndicators(game.frame);

  // UI: info badge + card
  drawInfoBadge(game.frame);
  if (ui.cardOpen) drawInfoCard();

  // Room transition fade overlay
  if (room.transitioning) {
    const t     = room.tf / TRANSITION_HALF;
    const alpha = t <= 1 ? t : 2 - t;
    cx.globalAlpha = Math.min(1, alpha);
    cx.fillStyle   = '#000';
    cx.fillRect(0, 0, GW, GH);
    cx.globalAlpha = 1;
  }

  // Subtle labels
  cx.globalAlpha = 0.38;
  cx.fillStyle   = K.Wh;
  cx.font        = '4px monospace';
  cx.textAlign   = 'center';
  cx.fillText(ROOMS[room.current].name.toLowerCase(), GW / 2, 7);
  cx.fillText('cubbon park', GW / 2, GH - 3);
  cx.textAlign   = 'left';
  cx.globalAlpha = 1;
}
