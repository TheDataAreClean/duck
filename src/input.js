// Side-effects only — registers all input event listeners.
import { cv, SC } from './canvas.js';
import { dpad, hitDpad, clearDpad } from './dpad.js';

// Cache to avoid layout reflow on every touch/mouse event
let canvasRect = cv.getBoundingClientRect();
window.addEventListener('resize', () => { canvasRect = cv.getBoundingClientRect(); });

function toGame(sx, sy) {
  return [(sx - canvasRect.left) / SC, (sy - canvasRect.top) / SC];
}

let activeTouchId = null;

cv.addEventListener('touchstart', e => {
  e.preventDefault();
  for (const t of e.changedTouches) {
    if (activeTouchId !== null) continue;
    const [gx, gy] = toGame(t.clientX, t.clientY);
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
  clearDpad(); const dir = hitDpad(gx, gy); if (dir) dpad[dir] = true;
});
cv.addEventListener('mousemove', e => {
  if (!e.buttons) return;
  const [gx, gy] = toGame(e.clientX, e.clientY);
  clearDpad(); const dir = hitDpad(gx, gy); if (dir) dpad[dir] = true;
});
cv.addEventListener('mouseup', clearDpad);
