import { buildDuckSprites } from './duck.js';
import { loadRoom } from './world.js';
import { ROOMS } from './data.js';
import { update } from './update.js';
import { render } from './render.js';
import './input.js';  // registers event listeners — side-effects only

function init() {
  buildDuckSprites();
  loadRoom(ROOMS[0]);   // flowers, background, trees, landmarks for starting room
}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

init();
loop();
