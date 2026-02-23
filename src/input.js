// Side-effects only — registers all input event listeners.
import { cv, SC } from './canvas.js';
import { dpad, hitDpad, clearDpad } from './dpad.js';
import { ui } from './state.js';
import { hitInfoBtn } from './ui.js';

// Cache to avoid layout reflow on every touch/mouse event
let canvasRect = cv.getBoundingClientRect();
window.addEventListener('resize', () => { canvasRect = cv.getBoundingClientRect(); });

function toGame(sx, sy) {
  return [(sx - canvasRect.left) / SC, (sy - canvasRect.top) / SC];
}

function handleTap(gx, gy) {
  // 1. Close card on any tap
  if (ui.cardOpen) { ui.cardOpen = false; ui.card = null; return true; }
  // 2. Open info card when near a landmark and [i] is tapped
  if (ui.nearLandmark && hitInfoBtn(gx, gy)) {
    ui.cardOpen = true; ui.card = ui.nearLandmark; return true;
  }
  return false;
}

let activeTouchId = null;

cv.addEventListener('touchstart', e => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    const [gx, gy] = toGame(t.clientX, t.clientY);
    if (handleTap(gx, gy)) { activeTouchId = null; return; }
    if (activeTouchId !== null) continue;
    const dir = hitDpad(gx, gy);
    if (dir) { activeTouchId = t.identifier; clearDpad(); dpad[dir] = true; }
  }
}, { passive: false });

cv.addEventListener('touchmove', e => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    if (t.identifier !== activeTouchId) continue;
    const [gx, gy] = toGame(t.clientX, t.clientY);
    clearDpad();
    const dir = hitDpad(gx, gy);
    if (dir) dpad[dir] = true;
  }
}, { passive: false });

cv.addEventListener('touchend', e => {
  e.preventDefault();
  for (const t of e.changedTouches)
    if (t.identifier === activeTouchId) { clearDpad(); activeTouchId = null; }
}, { passive: false });

// Mouse fallback (desktop)
cv.addEventListener('mousedown', e => {
  const [gx, gy] = toGame(e.clientX, e.clientY);
  if (handleTap(gx, gy)) return;
  clearDpad(); const dir = hitDpad(gx, gy); if (dir) dpad[dir] = true;
});
cv.addEventListener('mousemove', e => {
  if (!e.buttons) return;
  const [gx, gy] = toGame(e.clientX, e.clientY);
  clearDpad(); const dir = hitDpad(gx, gy); if (dir) dpad[dir] = true;
});
cv.addEventListener('mouseup', clearDpad);
