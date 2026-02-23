import { buildDuckSprites } from './duck.js';
import { prerenderAllRooms, loadRoom } from './world.js';
import { ROOMS } from './data.js';
import { wrapText, MAX_CHARS, TYPE_LABEL } from './ui.js';
import { buildMiniMap } from './hud.js';
import { update } from './update.js';
import { render } from './render.js';
import './input.js';  // registers event listeners — side-effects only

// Pre-compute all per-landmark derived fields once at startup.
// Saves repeated string ops and wrapText calls during gameplay.
function preprocessData() {
  for (const room of ROOMS)
    for (const lm of room.landmarks) {
      lm._nameLower   = lm.name.toLowerCase();
      lm._typeUpper   = (TYPE_LABEL[lm.type] || lm.type).toUpperCase();
      lm._nameLines   = wrapText(lm.name, 20);       // for card title
      lm._wrappedInfo = wrapText(lm.info, MAX_CHARS); // for card body
      lm._nameWidth   = lm._nameLower.length * 2.4 | 0; // for proximity label bg
    }
}

function init() {
  buildDuckSprites();   // 8 duck sprites — done once
  preprocessData();     // mutate ROOMS landmarks with cached fields
  prerenderAllRooms();  // pre-render all 6 backgrounds + 24 tree sprites + 11 landmark sprites
  buildMiniMap();       // pre-render static mini-map base
  loadRoom(0);          // set live bindings to room 0 assets
}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

init();
loop();
