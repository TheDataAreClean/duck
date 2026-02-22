import { initFlowers, buildBackground, initTrees, buildTreeSprites } from './world.js';
import { buildDuckSprites } from './duck.js';
import { update } from './update.js';
import { render } from './render.js';
import './input.js';  // registers event listeners — side-effects only

function init() {
  initFlowers();
  buildBackground();   // bakes grass + flowers → 1 drawImage per frame
  initTrees();
  buildTreeSprites();  // pre-renders 5 tree canvases + sortedTreeIdx
  buildDuckSprites();  // pre-renders 8 duck canvases (4 frames × 2 directions)
}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

init();
loop();
