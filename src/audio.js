let AC;

export function unlockAudio() {
  if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
  if (AC.state === 'suspended') AC.resume();
}

export function sfx(freq, dur, delay = 0, type = 'square') {
  try {
    if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
    setTimeout(() => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.connect(g); g.connect(AC.destination);
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0.09, AC.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + dur);
      o.start(); o.stop(AC.currentTime + dur);
    }, delay);
  } catch (e) {}
}

export function quack() {
  sfx(440, 0.08); sfx(330, 0.06, 90); sfx(440, 0.05, 160);
}
