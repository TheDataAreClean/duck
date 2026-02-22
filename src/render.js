import { cx, GW } from './canvas.js';
import { K, DH } from './constants.js';
import { duck } from './state.js';
import { drawDuckEntity } from './duck.js';
import { bgCanvas, trees, sortedTreeIdx, drawTree } from './world.js';
import { drawParticles } from './particles.js';
import { drawDpad } from './dpad.js';

export function render() {
  // Single call — replaces ~300 fillRects for grass + flowers
  cx.drawImage(bgCanvas, 0, 0);

  // Depth sort: walk pre-sorted tree indices, insert duck at correct y — zero allocation
  const duckFeetY = duck.y + DH;
  let duckDrawn = false;
  for (const idx of sortedTreeIdx) {
    if (!duckDrawn && duckFeetY <= trees[idx].y) {
      drawDuckEntity();
      duckDrawn = true;
    }
    drawTree(trees[idx], idx);
  }
  if (!duckDrawn) drawDuckEntity();

  drawParticles();
  drawDpad();

  // Subtle title
  cx.globalAlpha = 0.3;
  cx.fillStyle   = K.Wh;
  cx.font        = '4px monospace';
  cx.textAlign   = 'center';
  cx.fillText('cubbon park', GW / 2, 7);
  cx.textAlign   = 'left';
  cx.globalAlpha = 1;
}
