import { cx } from './canvas.js';
import { P_HEART, P_NOTE } from './constants.js';

export const particles = [];

export function spawnHearts(x, y) {
  for (let i = 0; i < 7; i++)
    particles.push({
      x: x + (Math.random() * 12 - 6),
      y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.5 + Math.random() * 1.0),
      life: 1,
      kind: i % 3 === 0 ? 'note' : 'heart',
    });
}

export function updateParticles() {
  // Reverse iteration so splice doesn't skip elements
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.life -= 0.02;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

export function drawParticles() {
  for (const { x, y, life, kind } of particles) {
    cx.globalAlpha = life;
    const px = x | 0, py = y | 0;
    if (kind === 'heart') {
      cx.fillStyle = P_HEART;
      cx.fillRect(px,     py,     2, 1);
      cx.fillRect(px - 1, py - 1, 1, 1);
      cx.fillRect(px + 2, py - 1, 1, 1);
      cx.fillRect(px,     py + 1, 2, 2);
    } else {
      cx.fillStyle = P_NOTE;
      cx.fillRect(px,     py,     2, 1);
      cx.fillRect(px + 1, py - 2, 1, 3);
    }
  }
  cx.globalAlpha = 1;
}
