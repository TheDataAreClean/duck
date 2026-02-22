import { GW, GH } from './canvas.js';
import {
  DW, DH, DUCK_SPEED, WALK_RATE,
  BOB_FREQ, BOB_AMP,
  VISIT_DUR, VISIT_RATE, VISIT_DIST,
  JOY_RATE,
} from './constants.js';
import { duck, game } from './state.js';
import { dpad } from './dpad.js';
import { trees } from './world.js';
import { spawnHearts, updateParticles } from './particles.js';
import { quack } from './audio.js';

export function update() {
  game.frame++;
  game.bob = Math.sin(game.frame * BOB_FREQ) * BOB_AMP;

  if (duck.visiting) {
    duck.joyPhase = (duck.joyPhase + JOY_RATE) % (Math.PI * 2); // prevent float drift
    duck.visitTimer--;
    if (duck.visitTimer % VISIT_RATE === 0) spawnHearts(duck.x + 6, duck.y - 2);
    if (duck.visitTimer <= 0) {
      duck.visiting = false;
      duck.joyPhase = 0;
      // Reset after last visit animation completes (not immediately on touch)
      if (game.visitedCount >= trees.length) {
        trees.forEach(t => { t.visited = false; }); // glow fades naturally via update below
        game.visitedCount = 0;
      }
    }
  } else {
    let moving = false;
    if (dpad.left)  { duck.x -= DUCK_SPEED; duck.facing = true;  moving = true; }
    if (dpad.right) { duck.x += DUCK_SPEED; duck.facing = false; moving = true; }
    if (dpad.up)    { duck.y -= DUCK_SPEED; moving = true; }
    if (dpad.down)  { duck.y += DUCK_SPEED; moving = true; }

    duck.x = Math.max(1,      Math.min(GW - DW - 1, duck.x));
    duck.y = Math.max(6,      Math.min(GH - DH - 6, duck.y));

    if (moving) { if (++duck.wt >= WALK_RATE) { duck.wt = 0; duck.wf = (duck.wf + 1) % 4; } }
    else        { duck.wf = 0; }

    // Tree visit detection — integer counter avoids trees.every() per frame
    const dcx = duck.x + DW / 2;
    const dcy = duck.y + DH;
    for (const t of trees) {
      if (t.visited) continue;
      if (Math.abs(dcx - t.x) < VISIT_DIST && Math.abs(dcy - t.y) < VISIT_DIST) {
        t.visited       = true;
        game.visitedCount++;
        duck.visiting   = true;
        duck.visitTimer = VISIT_DUR;
        quack();
        spawnHearts(duck.x + 6, duck.y);
        break;
      }
    }
  }

  // Glow fade runs every frame regardless of visit state
  for (const t of trees)
    t.glow = t.visited
      ? Math.min(1, t.glow + 0.05)
      : Math.max(0, t.glow - 0.03);

  updateParticles();
}
