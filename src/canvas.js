export const GW = 80;
export const GH = 144;

export const cv = document.getElementById('g');
export const cx = cv.getContext('2d');

export const SC = Math.max(1, Math.min(
  Math.floor(window.innerWidth  / GW),
  Math.floor(window.innerHeight / GH)
));

cv.width  = GW * SC;
cv.height = GH * SC;
cx.scale(SC, SC);
cx.imageSmoothingEnabled = false;
