# Duck in Cubbon Park

A 2D 8-bit pixel art duck game for mobile portrait screens. Wander a tiny Cubbon Park, visit trees, collect hearts.

## Run

```bash
npm run dev
# → http://localhost:3000
```

ES modules require HTTP — `file://` won't work.

---

## Project Structure

```
kashvi/
├── index.html          Entry point — canvas + module script tag
├── package.json        Dev server script (npx serve)
└── src/
    ├── main.js         Init + rAF game loop
    ├── canvas.js       Canvas setup, GW/GH/SC exports
    ├── constants.js    All tuning values + colour palette K
    ├── state.js        Mutable game state (duck, game objects)
    ├── audio.js        Web Audio API — quack sound
    ├── duck.js         Sprite data, pre-rendered sprites, drawDuckEntity
    ├── world.js        Grass, flowers, trees, background OffscreenCanvas
    ├── particles.js    Heart + music note burst particles
    ├── dpad.js         D-pad state, hit detection, drawing
    ├── input.js        Touch/mouse event listeners (side-effects only)
    ├── update.js       Per-frame game logic
    └── render.js       Per-frame draw orchestration
```

---

## Module Map

```
main.js
├── world.js    ← canvas.js, constants.js, state.js
├── duck.js     ← canvas.js, constants.js, state.js
├── input.js    ← canvas.js, dpad.js, state.js
├── update.js   ← canvas.js, constants.js, state.js, dpad.js,
│                  world.js, particles.js, audio.js
└── render.js   ← canvas.js, constants.js, state.js, duck.js,
                   world.js, particles.js, dpad.js
```

---

## Modules

### `canvas.js`
Sets up the `<canvas id="g">` element. Computes an integer pixel scale `SC` so the game fills the screen without blurring. All drawing uses logical game coordinates (GW × GH); `cx.scale(SC, SC)` handles the rest.

| Export | Value | Purpose |
|--------|-------|---------|
| `GW`   | 80    | Game width in pixels |
| `GH`   | 144   | Game height in pixels |
| `SC`   | computed | Integer scale factor |
| `cv`   | HTMLCanvasElement | The canvas |
| `cx`   | CanvasRenderingContext2D | The 2D context |

### `constants.js`
Single source of truth for every magic number and colour. Edit here to tune feel.

| Constant | Default | Effect |
|----------|---------|--------|
| `DUCK_SPEED` | 0.85 | Movement speed (px/frame) |
| `WALK_RATE` | 7 | Frames per walk animation step |
| `BOB_FREQ` | 0.08 | Idle bob oscillation frequency |
| `BOB_AMP` | 1.1 | Idle bob amplitude (px) |
| `VISIT_DUR` | 110 | Frames spent at a tree |
| `VISIT_DIST` | 13 | Proximity radius for tree detection (px) |
| `JOY_RATE` | 0.18 | Joy wobble speed |
| `JOY_AMP` | 0.22 | Joy wobble angle (radians) |

Colour palette `K` maps short names (`K.Dk`, `K.Wh`, etc.) to hex strings for consistent colouring across modules.

### `state.js`
All mutable state lives here. Never import from state into canvas/constants/audio — these stay pure.

```js
duck  = { x, y, facing, wf, wt, visiting, visitTimer, joyPhase }
game  = { frame, bob, visitedCount }
```

### `audio.js`
Lazy-initialises `AudioContext` on first call (required by browsers — user gesture needed). `quack()` fires three oscillator notes via `sfx()`.

### `duck.js`
Duck pixel art is encoded as character-map strings (`y`=yellow body, `d`=dark, `l`=light, `o`=orange beak, `e`=eye, `.`=transparent). `buildDuckSprites()` renders 8 `OffscreenCanvas` objects (4 walk frames × 2 directions) once at startup; each frame is a single `drawImage` call.

`drawDuckEntity()` handles:
- Idle bob (sinusoidal y offset)
- Shadow ellipse (tracks bob so it stays under the duck's feet)
- Joy wobble rotation during tree visits
- Sprite lookup: `(facing ? 4 : 0) + walkFrame`

### `world.js`
**Background**: `buildBackground()` draws grass texture (~200 `fillRect` calls) and all flowers into a single `OffscreenCanvas` (`bgCanvas`). This reduces the per-frame grass cost to one `drawImage`.

**Trees**: defined in `TREE_DEFS` (see *Extending* below). `buildTreeSprites()` pre-renders each tree to its own `OffscreenCanvas` and computes a sorted index array (`sortedTreeIdx`) by y — used for zero-allocation depth sorting every frame.

Trees have pseudo-depth scaling: `sc = 0.65 + (tree.y / GH) * 0.55` so distant trees appear smaller.

Each tree tracks `visited` (bool) and `glow` (0–1 float) for the golden visit highlight.

### `particles.js`
Hearts (`♥`) and music notes (`♪`) burst from the duck when it visits a tree. Uses reverse-iteration splice to safely remove expired particles without skipping.

### `dpad.js`
D-pad centred at game coordinate (64, 125). `hitDpad(gx, gy)` uses a single proximity + quadrant test — returns `'up' | 'down' | 'left' | 'right' | null`.

`drawDpad()` renders four 8-bit rectangle buttons each frame.

### `input.js`
Registers `touchstart`, `touchmove`, `touchend`, and mouse equivalents. Caches `getBoundingClientRect()` result in `canvasRect` (invalidated on `resize`) to avoid layout reflow on every input event. Tracks a single `activeTouchId` so only the D-pad finger is followed.

### `update.js`
Called once per frame before render:
1. Increment `game.frame`, compute `game.bob`
2. If visiting: tick `visitTimer`, spawn hearts, reset state when timer expires
3. If free: apply D-pad movement, clamp to bounds, advance walk animation
4. Tree visit detection: duck centre within `VISIT_DIST` of any unvisited tree → trigger visit
5. Glow fade: all trees fade toward their target glow value

When all trees have been visited, they're reset after the last visit animation completes (not immediately).

### `render.js`
Called once per frame after update:
1. `cx.drawImage(bgCanvas, 0, 0)` — replaces ~300 draw calls with one
2. Depth sort: walk `sortedTreeIdx`, insert `drawDuckEntity()` at the correct y (zero allocation)
3. `drawParticles()`, `drawDpad()`
4. Subtle `'cubbon park'` title text at 30% opacity

---

## How to Extend

### Add or move a tree
Edit `TREE_DEFS` in `src/world.js`:
```js
const TREE_DEFS = [
  { x: 14, y: 44,  type: 0 },  // Rain tree
  { x: 60, y: 40,  type: 1 },  // Gulmohar
  // add more here — type 0 or 1
];
```
`buildTreeSprites()` and `sortedTreeIdx` are recomputed automatically at startup.

### Add a new tree type
In `src/world.js`, add a new branch in the `drawTreeOnto(ctx, type, ...)` function alongside type 0 and type 1. Then use the new type number in `TREE_DEFS`.

### Tune game feel
All values are in `src/constants.js`. Duck speed, bob, joy wobble, visit duration, and D-pad size are all single-line changes.

### Add a landmark
Create a `src/landmarks.js` module following the world.js pattern: init function, OffscreenCanvas pre-render, draw function. Import into `render.js` and add to the depth-sort loop.

---

## Performance Notes

| Technique | Saving |
|-----------|--------|
| `bgCanvas` OffscreenCanvas | ~300 draw calls → 1 per frame |
| Pre-rendered duck sprites | 120 pixel operations → 1 `drawImage` per frame |
| Pre-rendered tree sprites | ~200 draw calls → 5 `drawImage` calls per frame |
| Pre-sorted `sortedTreeIdx` | Zero allocation in the depth sort hot path |
| `getBoundingClientRect` cache | No layout reflow on touch/mouse events |
| Integer `visitedCount` | No `trees.every()` scan each frame |
