export const duck = {
  x: 28, y: 108,
  facing: false,   // false = right, true = left
  wf: 0, wt: 0,   // walk frame, walk timer
  visiting: false,
  visitTimer: 0,
  joyPhase: 0,
};

export const game = {
  frame: 0,
  bob: 0,
  visitedCount: 0,
};

export const room = {
  current: 6,
  transitioning: false,
  tf: 0,          // transition frame counter 0..TRANSITION_DUR
  nextRoom: null,
  nextDuckX: 0,
  nextDuckY: 0,
};

export const ui = {
  nearLandmark: null,   // landmark object within range, or null
  cardOpen: false,
  card: null,           // landmark currently shown in the info card
};
