# Duck in Cubbon Park

A 2D 8-bit pixel art duck game for mobile portrait screens. Walk a duck through six rooms of Cubbon Park, visit trees, and read about real landmarks.

## Run

```bash
npm run dev
# → http://localhost:3000
```

ES modules require HTTP — `file://` won't work.

---

## Gameplay

- **D-pad** (bottom-right) moves the duck in 4 directions
- **Exit arrows** pulse at screen edges to show where you can walk to the next room (fade transition)
- **Mini-map** (bottom-left) shows your position across all 6 rooms — current room in green, reachable rooms slightly brighter
- **Walk near a tree** to visit it — duck wobbles, hearts burst, tree glows
- **Walk near a landmark** — a name label floats above it and a pulsing `[i]` badge appears top-left
- **Tap `[i]`** to read the landmark's info card
- **Tap anywhere** to close the card

---

## Project Structure

```
kashvi/
├── index.html          Entry point — canvas + module script tag
├── package.json        Dev server (npx serve)
└── src/
    ├── main.js         Init sequence + rAF game loop
    ├── canvas.js       Canvas setup, GW/GH/SC exports
    ├── constants.js    All tuning values, colour palette K, UI tokens
    ├── state.js        All mutable game state (duck, game, room, ui)
    ├── data.js         Static park content — SPECIES table + ROOMS array
    ├── audio.js        Web Audio API — quack sound
    ├── duck.js         Sprite data, pre-rendered sprites, drawDuckEntity
    ├── world.js        Asset pre-rendering, room loading, draw functions
    ├── ui.js           Info badge + info card overlay
    ├── hud.js          Mini-map + exit direction indicators
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
├── data.js     (no imports — pure static data)
├── duck.js     ← canvas.js, constants.js, state.js
├── world.js    ← canvas.js, constants.js, data.js, state.js
├── ui.js       ← canvas.js, constants.js, state.js
├── hud.js      ← canvas.js, constants.js, state.js, data.js
├── input.js    ← canvas.js, dpad.js, state.js, ui.js
├── update.js   ← canvas.js, constants.js, state.js, dpad.js,
│                  world.js, data.js, particles.js, audio.js
└── render.js   ← canvas.js, constants.js, state.js, duck.js,
                   world.js, data.js, particles.js, dpad.js, ui.js, hud.js
```

---

## Modules

### `canvas.js`
Sets up `<canvas id="g">`. Computes an integer pixel scale `SC` so the game fills the screen without blurring. All drawing uses logical game coordinates (GW × GH); `cx.scale(SC, SC)` handles the rest.

| Export | Value | Purpose |
|--------|-------|---------|
| `GW` | 80 | Game width in pixels |
| `GH` | 144 | Game height in pixels |
| `SC` | computed | Integer scale factor (e.g. 3× on most phones) |
| `cv` | HTMLCanvasElement | The canvas element |
| `cx` | CanvasRenderingContext2D | The 2D drawing context |

---

### `constants.js`
Single source of truth for every tunable value, the colour palette, and shared UI tokens. Edit here to change game feel or visual style.

| Constant | Default | Effect |
|----------|---------|--------|
| `DUCK_SPEED` | 0.85 | Movement speed (px/frame) |
| `WALK_RATE` | 7 | Frames per walk animation step |
| `BOB_FREQ` | 0.08 | Idle bob oscillation frequency |
| `BOB_AMP` | 1.1 | Idle bob amplitude (px) |
| `VISIT_DUR` | 110 | Frames spent at a tree |
| `VISIT_DIST` | 13 | Tree visit trigger radius (px) |
| `JOY_RATE` | 0.18 | Joy wobble speed |
| `JOY_AMP` | 0.22 | Joy wobble angle (radians) |
| `TRANSITION_DUR` | 20 | Fade duration in frames (out + in) |
| `TRANSITION_HALF` | 10 | Midpoint frame — when room swap happens |
| `LANDMARK_DIST` | 20 | Proximity to show info badge (px) |
| `UI_BG` | `#0E0E1A` | Shared panel background colour |
| `UI_BORDER` | `#2D2D50` | Shared panel border colour |

`K` palette maps short names to hex strings for consistent colouring across modules.

`UI_BG` and `UI_BORDER` are imported by `ui.js`, `hud.js`, `world.js`, and `dpad.js` to keep all panels visually consistent.

---

### `state.js`
All mutable state in four objects. No logic, no imports — pure data store.

```js
duck = { x, y, facing, wf, wt, visiting, visitTimer, joyPhase }
game = { frame, bob, visitedCount }
room = { current, transitioning, tf, nextRoom, nextDuckX, nextDuckY }
ui   = { nearLandmark, cardOpen, card }
```

---

### `data.js`
Pure static data — no imports, no logic. Two exports:

**`SPECIES`** — 15 tree species, each with:
- `name`, `scientific` — display strings
- `sprite` — index 0–7 into the tree drawing code
- `info` — 2–3 sentence description for the info card

**`ROOMS`** — 6 rooms, each with:
- `id`, `name`, `exits` — room identity and navigation (`{ north, south, east, west }`, values are room ids)
- `trees[]` — `{ x, y, species }` — world positions referencing species keys
- `landmarks[]` — `{ id, x, y, type, name, year, short, info }` — real Cubbon Park landmarks

#### Room layout
```
        [5: North Fountain]
                |
   [1: Library] — [2: Museum Quarter]
        |                 |
   [0: West Gate] — [3: Central Lawn]
                          |
                    [4: South Park]
```

#### Landmark types
`statue` `building` `fountain` `pond` `pavilion` `grove` — controls icon shape and colour.

---

### `audio.js`
Lazy-initialises `AudioContext` on first call (browser requires a user gesture). `quack()` fires three oscillator notes via `sfx()`.

---

### `duck.js`
Duck pixel art encoded as 12×12 character-map strings (`y`=yellow, `d`=dark wing, `l`=light cheek, `o`=beak/feet, `e`=eye, `.`=transparent). `buildDuckSprites()` renders 8 `OffscreenCanvas` objects (4 walk frames × 2 directions) once at startup.

`drawDuckEntity()` handles idle bob, shadow tracking, joy wobble rotation during visits, and sprite lookup: `(facing ? 4 : 0) + walkFrame`.

---

### `world.js`
The asset pipeline. All heavy canvas work runs once at startup — nothing is allocated or rendered at runtime during gameplay.

#### Startup sequence (called from `main.js`)

```
prerenderAllRooms()
  └── prerenderRoom(roomData)  ×6
        ├── genFlowers()              → stable per-room flower positions
        ├── bakeBackground(flowers)   → OffscreenCanvas: grass + flowers
        ├── buildTreeSprite(tree)     ×4  → OffscreenCanvas per tree
        ├── buildLandmarkSprite(lm)   ×2–3 → OffscreenCanvas per landmark icon
        └── sort trees + landmarks by y → sortedList
```

#### Runtime (called by `update.js` on room transition)

```
loadRoom(roomIdx)
  → swap bgCanvas, trees, treeSprites, landmarkSprites, sortedDrawList
  → clone trees array with fresh { visited: false, glow: 0 }
  (zero canvas work — reference swap only)
```

#### Tree sprite types (0–7)

| Index | Species | Visual |
|-------|---------|--------|
| 0 | Rain tree / Silver Oak / Black Bean | Tall, dark spreading canopy |
| 1 | Gulmohar / Indian Laburnum / Copper Pod | Wide canopy, flame flowers |
| 2 | Jacaranda | Medium, violet-blue flowers |
| 3 | Banyan / Peepal | Very wide, multiple prop trunks |
| 4 | Royal Palm | Tall thin trunk, small frond crown |
| 5 | Araucaria / Polyalthia | Columnar, tiered geometric branches |
| 6 | Mango / Jackfruit | Round dense canopy, stout trunk |
| 7 | Bamboo | Cluster of thin stalks, feathery tufts |

All types use pseudo-depth scaling: `sc = 0.65 + (tree.y / GH) * 0.55` — trees further up the screen appear smaller.

#### Key exports

| Export | Type | Purpose |
|--------|------|---------|
| `bgCanvas` | OffscreenCanvas | Current room background |
| `trees` | array | Current room trees with live `visited`/`glow` state |
| `treeSprites` | array | Pre-rendered tree canvases + blit coords |
| `landmarkSprites` | array | Pre-rendered landmark icon canvases + blit coords |
| `sortedDrawList` | array | Trees + landmarks sorted by y for depth draw order |
| `drawTree(tree, idx)` | function | Draw tree sprite + glow overlay |
| `drawLandmark(lm, lmIdx)` | function | Draw landmark sprite + proximity name label |
| `loadRoom(roomIdx)` | function | Swap all references to cached room assets |
| `prerenderAllRooms()` | function | Pre-render all 6 rooms at startup |

---

### `ui.js`
Info badge and info card overlay. All panels use `UI_BG` / `UI_BORDER` from `constants.js`.

**Info badge** — pulsing `[i]` button at top-left (3, 3), visible only when duck is within `LANDMARK_DIST` of a landmark. Pulse uses `Math.sin(frame * 0.12)`.

**Info card** — full-screen dim overlay with a centred card showing:
- Coloured type badge (pre-uppercased from `lm._typeUpper`)
- Landmark name (pre-word-wrapped from `lm._nameLines`)
- Year
- Description text (pre-word-wrapped from `lm._wrappedInfo`)
- "tap anywhere to close" hint

`wrapText(text, maxChars)`, `MAX_CHARS`, and `TYPE_LABEL` are exported for use by `preprocessData()` in `main.js`.

---

### `hud.js`
Mini-map and exit direction indicators. All drawing is either a pre-rendered blit or a handful of 1×1 `fillRect` calls per frame.

**Mini-map** — 12×24 px panel at bottom-left (3, 117). Pre-rendered `OffscreenCanvas` base (background + room blocks + corridors baked once by `buildMiniMap()`). Each frame `drawMiniMap()` blits the base, then paints:
- Reachable rooms (exits from current room) in a brighter green
- Current room block in bright green (`#88EE88`)
- Duck position as a 1×1 gold dot mapped within the 4×4 room block

```
             [5]       col=1 row=0
              |
   [1]  —  [2]         col=0,1 row=1
    |         |
   [0]  —  [3]         col=0,1 row=2
              |
             [4]        col=1 row=3
```

**Exit indicators** — `drawExitIndicators(frame)` draws pulsing pixel-art arrows (7×4 for north/south, 4×7 for east/west) at each screen edge where an exit exists. Each arrow is drawn twice: a black shadow at (+1, +1) offset for contrast, then white on top. Hidden during room transitions. Alpha pulse: `0.70 + Math.sin(frame * 0.09) * 0.25`.

| Export | Purpose |
|--------|---------|
| `buildMiniMap()` | Pre-render static map base — call once at startup |
| `drawMiniMap()` | Blit base + highlight current/adjacent rooms + duck dot |
| `drawExitIndicators(frame)` | Draw pulsing exit arrows at active screen edges |

---

### `particles.js`
Hearts (`♥`) and music notes (`♪`) burst from the duck on tree visits. Reverse-iteration splice prevents skipping elements on removal.

---

### `dpad.js`
D-pad centred at game coordinate (64, 125). `hitDpad(gx, gy)` uses a single proximity + quadrant test — returns `'up' | 'down' | 'left' | 'right' | null`. `drawDpad()` renders four 8-bit buttons with active highlights. Cross background uses `rgba(14,14,26,0.65)` to match the shared UI panel tone.

---

### `input.js`
Registers all touch/mouse listeners. Input priority on each tap:
1. Card open → close it, return
2. Near landmark + tapped `[i]` → open card, return
3. Otherwise → pass to D-pad hit detection

`canvasRect` (from `getBoundingClientRect()`) is cached and invalidated on `resize` to avoid layout reflow per event. `activeTouchId` tracks a single D-pad finger.

---

### `update.js`
Called once per frame. Execution order:

1. Increment `game.frame`, compute `game.bob`
2. **Transition tick** — if transitioning: tick `room.tf`; at midpoint swap room, reset duck + state, call `loadRoom()`; freeze duck for duration
3. **Card open** — freeze duck, skip all game logic
4. Cache `currentRoom = ROOMS[room.current]` and `exits`
5. **Tree visit** — tick timer, spawn hearts, reset when done
6. **Movement** — apply D-pad, detect room exits before clamping, clamp (relaxed on exit edges)
7. **Tree detection** — duck centre within `VISIT_DIST` of unvisited tree → trigger visit
8. **Landmark proximity** — find nearest landmark within `LANDMARK_DIST`, set `ui.nearLandmark`
9. **Glow fade** — all trees update `glow` toward target every frame

---

### `render.js`
Called once per frame after update:

1. `cx.drawImage(bgCanvas, 0, 0)` — 1 call replaces ~300 fillRects
2. Walk `sortedDrawList` — insert `drawDuckEntity()` at correct depth, call `drawTree` or `drawLandmark` for each item
3. `drawParticles()`, `drawDpad()`, `drawMiniMap()`, `drawExitIndicators()`
4. `drawInfoBadge()`, `drawInfoCard()` if open
5. **Transition fade** — black overlay, alpha ramps 0→1 then 1→0 over `TRANSITION_DUR` frames
6. Room name (top) + "cubbon park" (bottom) at 38% opacity

---

### `main.js`
Orchestrates startup, then hands off to the game loop.

```js
init():
  buildDuckSprites()    // 8 OffscreenCanvases — once
  preprocessData()      // mutate ROOMS landmarks: pre-lowercase/uppercase/wrap
  prerenderAllRooms()   // 6 backgrounds + 24 tree sprites + 11 landmark sprites
  buildMiniMap()        // pre-render static mini-map base
  loadRoom(0)           // set live bindings to room 0

loop():
  update() → render() → requestAnimationFrame(loop)
```

`preprocessData()` runs one pass over all 11 landmarks and adds cached fields:

| Field | Content |
|-------|---------|
| `_nameLower` | `lm.name.toLowerCase()` |
| `_typeUpper` | `lm.type` label uppercased |
| `_nameLines` | name word-wrapped at 20 chars (for card title) |
| `_wrappedInfo` | info text wrapped at 26 chars (for card body) |
| `_nameWidth` | estimated pixel width of name label |

---

## How to Extend

### Add a tree to a room
Edit `trees[]` in the relevant room in `src/data.js`:
```js
{ x: 40, y: 60, species: 'jacaranda' }
```
Species must be a key in `SPECIES`. `prerenderAllRooms()` handles sprites automatically at next startup.

### Add a new tree species
1. Add an entry to `SPECIES` in `src/data.js` with a `sprite` index 0–7
2. If you need a new visual style, add a new `case` in `drawTreeOnto()` in `src/world.js` and add its dimensions to `TYPE_DIMS`

### Add a landmark
Add an entry to `landmarks[]` in the relevant room in `src/data.js`:
```js
{
  id: 'my-landmark',
  x: 45, y: 80, type: 'building',
  name: 'My Landmark', year: '1920', short: 'Short description',
  info: 'Two or three sentences of info text shown in the card.',
}
```
Valid types: `statue` `building` `fountain` `pond` `pavilion` `grove`.

### Add a new room
1. Add a room object to `ROOMS` in `src/data.js`
2. Add its `id` to the `exits` of adjacent rooms
3. Add a `MAP_POS` entry in `src/hud.js` for the new room's position in the mini-map grid
4. Add corridor rects to `CORRIDORS` in `src/hud.js` connecting it to adjacent rooms

### Add a new landmark icon style
Add a new `case` in `drawLandmarkIconOnto()` in `src/world.js`. The canvas is 14×14 with anchor at (7, 12).

### Tune game feel
All values in `src/constants.js`. Duck speed, bob, visit duration, transition speed, and proximity distances are all single-line changes.

### Tune UI panel style
Change `UI_BG` and `UI_BORDER` in `src/constants.js`. Both values propagate automatically to the info badge, info card, landmark label, mini-map, and d-pad.

---

## Performance Architecture

All canvas work happens at startup. During gameplay, every frame is draw-only.

| Technique | Cost saved per frame |
|-----------|----------------------|
| `bgCanvas` OffscreenCanvas | ~300 fillRects → 1 drawImage |
| Pre-rendered duck sprites (8×) | 120+ pixel writes → 1 drawImage |
| Pre-rendered tree sprites (24×) | ~200 fillRects → 4 drawImages |
| Pre-rendered landmark sprites (11×) | ~8 fillRects each → 1 drawImage each |
| `buildMiniMap()` OffscreenCanvas | Map base baked once → 1 drawImage + ~12 fillRects |
| `sortedDrawList` pre-sorted | Zero allocation in depth-sort hot path |
| `loadRoom()` as reference swap | Zero canvas work on room transition |
| `preprocessData()` | Zero string allocs while card is open |
| `getBoundingClientRect` cache | No layout reflow on input events |
| `TRANSITION_HALF` constant | No division in render/update hot path |
| `currentRoom` / `exits` cached | Single array lookup per frame |
