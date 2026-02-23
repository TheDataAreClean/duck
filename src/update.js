import { GW, GH } from './canvas.js';
import {
  DW, DH, DUCK_SPEED, WALK_RATE,
  BOB_FREQ, BOB_AMP,
  VISIT_DUR, VISIT_RATE, VISIT_DIST,
  JOY_RATE,
  TRANSITION_HALF, LANDMARK_DIST,
} from './constants.js';
import { duck, game, room, ui } from './state.js';
import { dpad } from './dpad.js';
import { trees, loadRoom } from './world.js';
import { ROOMS } from './data.js';
import { spawnHearts, updateParticles } from './particles.js';
import { quack } from './audio.js';

export function update() {
  game.frame++;
  game.bob = Math.sin(game.frame * BOB_FREQ) * BOB_AMP;

  // ── Transition tick ────────────────────────────────────────────────────────
  if (room.transitioning) {
    room.tf++;
    if (room.tf === TRANSITION_HALF) {
      room.current      = room.nextRoom;
      duck.x            = room.nextDuckX;
      duck.y            = room.nextDuckY;
      duck.visiting     = false;
      duck.visitTimer   = 0;
      duck.joyPhase     = 0;
      duck.wf           = 0;
      game.visitedCount = 0;
      ui.nearLandmark   = null;
      ui.cardOpen       = false;
      loadRoom(room.current);
    }
    if (room.tf >= TRANSITION_HALF * 2) room.transitioning = false;
    updateParticles();
    return;
  }

  // ── Card open: freeze duck ─────────────────────────────────────────────────
  if (ui.cardOpen) { updateParticles(); return; }

  // Cache current room data for this frame
  const currentRoom = ROOMS[room.current];
  const exits       = currentRoom.exits;

  // ── Tree visit ────────────────────────────────────────────────────────────
  if (duck.visiting) {
    duck.joyPhase = (duck.joyPhase + JOY_RATE) % (Math.PI * 2);
    duck.visitTimer--;
    if (duck.visitTimer % VISIT_RATE === 0) spawnHearts(duck.x + 6, duck.y - 2);
    if (duck.visitTimer <= 0) {
      duck.visiting = false;
      duck.joyPhase = 0;
      if (game.visitedCount >= trees.length) {
        trees.forEach(t => { t.visited = false; });
        game.visitedCount = 0;
      }
    }
  } else {
    // ── Movement ─────────────────────────────────────────────────────────────
    let moving = false;
    if (dpad.left)  { duck.x -= DUCK_SPEED; duck.facing = true;  moving = true; }
    if (dpad.right) { duck.x += DUCK_SPEED; duck.facing = false; moving = true; }
    if (dpad.up)    { duck.y -= DUCK_SPEED; moving = true; }
    if (dpad.down)  { duck.y += DUCK_SPEED; moving = true; }

    // ── Room exit detection (before clamping) ─────────────────────────────
    if      (duck.y < -DH    && exits.north != null) startTransition('north', exits);
    else if (duck.y > GH     && exits.south != null) startTransition('south', exits);
    else if (duck.x < -DW    && exits.west  != null) startTransition('west',  exits);
    else if (duck.x > GW     && exits.east  != null) startTransition('east',  exits);

    // ── Clamp — relax edges that have exits ───────────────────────────────
    duck.x = Math.max(exits.west  != null ? -DW : 1,
                      Math.min(exits.east  != null ? GW : GW - DW - 1, duck.x));
    duck.y = Math.max(exits.north != null ? -DH : 6,
                      Math.min(exits.south != null ? GH : GH - DH - 6, duck.y));

    if (moving) { if (++duck.wt >= WALK_RATE) { duck.wt = 0; duck.wf = (duck.wf + 1) % 4; } }
    else        { duck.wf = 0; }

    // ── Tree visit detection ──────────────────────────────────────────────
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

    // ── Landmark proximity ────────────────────────────────────────────────
    const landmarks = currentRoom.landmarks;
    let nearest = null, bestD = LANDMARK_DIST;
    for (const lm of landmarks) {
      const d = Math.abs(dcx - lm.x) + Math.abs(dcy - lm.y);
      if (d < bestD) { nearest = lm; bestD = d; }
    }
    ui.nearLandmark = nearest;
  }

  // ── Glow fade (all trees, every frame) ───────────────────────────────────
  for (const t of trees)
    t.glow = t.visited
      ? Math.min(1, t.glow + 0.05)
      : Math.max(0, t.glow - 0.03);

  updateParticles();
}

function startTransition(dir, exits) {
  if (room.transitioning) return;
  let ndx = duck.x, ndy = duck.y;
  if      (dir === 'north') ndy = GH - DH - 8;
  else if (dir === 'south') ndy = 8;
  else if (dir === 'west')  ndx = GW - DW - 8;
  else if (dir === 'east')  ndx = 8;

  room.transitioning = true;
  room.tf            = 0;
  room.nextRoom      = exits[dir];
  room.nextDuckX     = ndx;
  room.nextDuckY     = ndy;
}
