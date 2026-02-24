# Design Reference — Duck in Cubbon Park

Visual design, spacing, colour, typography, and animation documentation for every element in the game.

---

## Coordinate System

The game renders at a fixed logical resolution of **80 × 144 px** (portrait, roughly a tall phone ratio). All positions and sizes below are in these logical pixels.

At runtime, `canvas.js` computes an integer scale factor `SC`:

```
SC = min(floor(screenW / 80), floor(screenH / 144))
```

This ensures pixel-perfect upscaling with no sub-pixel blurring. `image-rendering: pixelated` is applied to the `<canvas>` element.

**Axes:** x increases right, y increases down. (0, 0) is top-left.

**Page background:** `#1a2e1a` — dark forest green, fills the letterbox area outside the canvas.

---

## Colour Palette

### Game world (`K` in `constants.js`)

| Name  | Hex       | Used for                            |
|-------|-----------|-------------------------------------|
| `Y`   | `#FFD700` | Duck body, gold accents             |
| `Yd`  | `#FFB300` | Duck dark wing                      |
| `Yl`  | `#FFF0A0` | Duck light cheek                    |
| `O`   | `#FF8C00` | Duck beak and feet                  |
| `Ey`  | `#1a1a1a` | Duck eye                            |
| `Wh`  | `#FFFFFF` | Eye glint, UI text, exit arrows     |
| `gr0` | `#4CAF50` | Grass base fill                     |
| `gr1` | `#388E3C` | Grass detail stipple (dark)         |
| `gr3` | `#81C784` | Grass detail stipple (light)        |
| `lf0` | `#1B5E20` | Tree canopy darkest shadow          |
| `lf1` | `#2D6A4F` | Tree canopy mid shadow              |
| `lf2` | `#43A047` | Tree canopy highlight               |
| `lf3` | `#66BB6A` | Tree canopy brightest highlight     |
| `trunk` | `#5D4037` | Tree trunk base                   |
| `trunkD` | `#4E342E` | Tree trunk shadow edge           |
| `Bl`  | `#000000` | Transition fade, particle shadows   |

### UI panels (`constants.js`)

| Token       | Hex       | Used for                                              |
|-------------|-----------|-------------------------------------------------------|
| `UI_BG`     | `#0E0E1A` | Panel background — dark navy                          |
| `UI_BORDER` | `#2D2D50` | Panel border — muted indigo                           |

`UI_BG` and `UI_BORDER` propagate to: info badge, info card, landmark proximity label, mini-map, and d-pad cross background.

### UI text colours (`constants.js`)

| Token     | Hex       | Used for                                |
|-----------|-----------|-----------------------------------------|
| `UI_DIM`  | `#9E9E9E` | Secondary text (year)                   |
| `UI_BODY` | `#CCCCCC` | Card body text                          |
| `UI_WARM` | `#FFF9C4` | Warm white — badge text, windows, notes |

### Particle colours (`constants.js`)

| Token     | Hex       | Used for             |
|-----------|-----------|----------------------|
| `P_HEART` | `#FF4081` | Heart burst (hot pink) |
| `P_NOTE`  | `#FFF9C4` | Music note burst (= `UI_WARM`) |

### Landmark type colours (`LM_COLOR` in `constants.js`)

| Type       | Hex       |
|------------|-----------|
| `statue`   | `#BDBDBD` |
| `building` | `#BCAAA4` |
| `fountain` | `#4FC3F7` |
| `pond`     | `#29B6F6` |
| `pavilion` | `#A1887F` |
| `grove`    | `#81C784` |

Used for: landmark icon sprites, type badge in info card, proximity label text.

### Flower palette (`FL_COLS` in `constants.js`)

`#E91E63` `#FFC107` `#CE93D8` `#F44336` `#FFFFFF` `#FF7043` `#80CBC4`

Each flower is a 2×2 block with the colour, and a 1×1 `UI_WARM` (`#FFF9C4`) highlight on the top-left pixel.

### Mini-map room colours (`constants.js`)

| Token         | Hex       | State                          |
|---------------|-----------|--------------------------------|
| `MM_INACTIVE` | `#4E7450` | Not current, not adjacent      |
| `MM_ADJACENT` | `#6EA870` | Reachable from current room    |
| `MM_CURRENT`  | `#88EE88` | Current room                   |

### Tree colours (`TR` in `constants.js`)

| Key           | Hex       | Used for                                     |
|---------------|-----------|----------------------------------------------|
| `gulFlower`   | `#E53935` | Gulmohar red flowers                         |
| `gulFlower2`  | `#FF7043` | Gulmohar orange flowers                      |
| `jacTrunk`    | `#6D4C41` | Jacaranda trunk base; Royal Palm ring bands  |
| `jacCanopyD`  | `#2E4A6A` | Jacaranda deep canopy                        |
| `jacCanopy`   | `#3A5F8A` | Jacaranda canopy                             |
| `jacFlowerD`  | `#7B1FA2` | Jacaranda deep violet blooms                 |
| `jacFlower`   | `#9C27B0` | Jacaranda violet blooms                      |
| `jacFlowerL`  | `#CE93D8` | Jacaranda light blooms                       |
| `rpTrunk`     | `#8D6E63` | Royal Palm trunk                             |
| `rpTrunkD`    | `#795548` | Royal Palm trunk shadow / rings              |
| `rpFrondD`    | `#33691E` | Royal Palm frond dark; Bamboo node rings     |
| `rpFrond`     | `#558B2F` | Royal Palm frond; also `LD.grove`            |
| `bmStalks`    | array (5) | Bamboo stalk cycle — `#558B2F` `#7CB342` `#33691E` `#8BC34A` `#689F38` |
| `mnFruit`     | `#FF8F00` | Mango / Jackfruit fruit hint                 |
| `mnTrunkD`    | `#3E2723` | Mango / Jackfruit darkest trunk shadow       |
| `bnDark`      | `#1A4A20` | Banyan / Peepal darkest canopy base          |

### Landmark icon detail colours (`LD` in `constants.js`)

| Key        | Hex       | Used for                              |
|------------|-----------|---------------------------------------|
| `stone`    | `#D7CCC8` | Columns, trim, stonework              |
| `window`   | `#FFF9C4` | Window fill (= `UI_WARM`)             |
| `door`     | `#8D6E63` | Wood / doors / dome drums             |
| `roof`     | `#795548` | Roof bands (= `TR.rpTrunkD`)          |
| `water`    | `#42A5F5` | Fountain / pond water                 |
| `waterL`   | `#81D4FA` | Water ripple highlight                |
| `pedestal` | `#9E9E9E` | Statue base (= `UI_DIM`)              |
| `grove`    | `#558B2F` | Grove vegetation (= `TR.rpFrond`)     |

---

## Typography

All text uses pixel-size monospace — no font loading, no anti-aliasing.

### Font constants (`constants.js`)

| Constant | Value              | Used for                                      |
|----------|--------------------|-----------------------------------------------|
| `F5`     | `'5px monospace'`  | Info button `[i]` label; info card name lines |
| `F4`     | `'4px monospace'`  | Landmark proximity label; card body text; room name; "cubbon park" label |
| `F3`     | `'3px monospace'`  | Card type badge; card year; card "tap to close" hint |

`textAlign` is set to `'center'` only for centred elements (room label, "cubbon park", `[i]`, tap hint) and always restored to `'left'` immediately after.

---

## Background

Each room's background is a baked `OffscreenCanvas` (80 × 144) created once at startup.

### Grass texture

Three layers of fill:

1. **Base** — `#4CAF50` solid fill, full canvas
2. **Dark stipple** — `#388E3C`, 1×1 px dots on an 8×8 grid at offsets `(+2, +2)` and `(+5, +6)`
3. **Light stipple** — `#81C784`, 1×1 px dots on a 13×13 grid at offset `(+5, +5)`

### Flowers

22 randomly placed 2×2 blocks per room, drawn on top of grass. Positions are stable per room (generated once, baked in). Highlight pixel `#FFF9C4` at the top-left of each.

---

## Duck

### Sprite

12 × 12 px, defined as a character grid with colour codes:
- `y` → `#FFD700` (body)
- `d` → `#FFB300` (dark wing band)
- `l` → `#FFF0A0` (light cheek)
- `o` → `#FF8C00` (beak, feet)
- `e` → `#1a1a1a` (eye)
- `.` → transparent

Body is 10 rows, legs are 2 rows (rows 10–11). Four leg patterns (`DK_LEGS`) cycle through walk frames.

An eye glint — 1×1 `#FFFFFF` at pixel `(8, 1)` — is always drawn on the right-facing sprite. The flip transform (canvas `scale(-1,1)`) mirrors it for left-facing.

### Sprite set

8 `OffscreenCanvas` objects: 4 walk frames × 2 facing directions.
Index formula: `(facing ? 4 : 0) + (walkFrame & 3)`

### Shadow

Ellipse under the duck, 12×4 px, `rgba(0,0,0,0.14)`. Drawn at `duck.x + 6, dy + DH + 1` — tracks the bob offset so shadow moves with the duck.

---

## Trees

### Depth scaling

All trees scale by y-position:
```
sc = 0.65 + (tree.y / GH) * 0.55
```
Range: `sc ≈ 0.65` at top of screen → `sc ≈ 1.20` at bottom. Trees lower on screen appear larger.

### Sprite dimensions (per type, at sc = 1.0)

| Index | Species | halfWidth | heightAbove | heightBelow | Canvas size |
|-------|---------|-----------|-------------|-------------|-------------|
| 0 | Silver Oak / Black Bean | 10 | 38 | 3 | 24 × 45 |
| 1 | Gulmohar / Laburnum / Copper Pod | 13 | 38 | 3 | 30 × 45 |
| 2 | Jacaranda | 10 | 38 | 3 | 24 × 45 |
| 3 | Banyan / Peepal | 15 | 38 | 3 | 34 × 45 |
| 4 | Royal Palm | 8 | 42 | 3 | 20 × 49 |
| 5 | Araucaria / Mast Tree | 10 | 40 | 3 | 24 × 47 |
| 6 | Mango / Jackfruit | 12 | 36 | 3 | 28 × 43 |
| 7 | Bamboo | 9 | 32 | 3 | 22 × 39 |

Actual canvas size uses `max(1, value * sc | 0)` for every dimension.

### Ground shadow

All tree types: `rgba(0,0,0,0.1)` rect at base, width `(halfWidth - 1) * 2` scaled, height 3 scaled.

### Glow overlay

Visited trees get a `#FFFF96` rect drawn over the canopy area at `globalAlpha = glow * 0.18`. Max visible opacity: 18%.

Glow fades in at `+0.05/frame` and out at `-0.03/frame`.

### Notable colour choices by type

| Type | Characteristic colours |
|------|------------------------|
| Jacaranda (2) | Canopy: `TR.jacCanopyD` / `TR.jacCanopy`; flowers: `TR.jacFlowerD` / `TR.jacFlower` / `TR.jacFlowerL` |
| Gulmohar (1) | Flowers: `TR.gulFlower` / `TR.gulFlower2` |
| Royal Palm (4) | Trunk: `TR.rpTrunk` / `TR.rpTrunkD`; fronds: `TR.rpFrondD` / `TR.rpFrond` |
| Bamboo (7) | 5 stalks via `TR.bmStalks`; node rings `TR.rpFrondD`; leaf tips `TR.bmStalks[3]` |
| Mango/Jackfruit (6) | Fruit hint: `TR.mnFruit` 2×2 blocks |
| Banyan/Peepal (3) | Darkest canopy base: `TR.bnDark`; extra prop trunks left and right |

---

## Landmark Icons

Each landmark icon is a 14 × 14 px `OffscreenCanvas`. Anchor point: `(7, 12)` — near the bottom centre of the canvas, placed at `lm.x - 7, lm.y - 12` on screen.

Icons are drawn using the landmark type colour plus black, white, and brown accents.

### Icon designs

| Type | Design summary |
|------|----------------|
| `statue` | 3×5 figure body, 1×1 head; 5×1 plinth base in `#9E9E9E`; 5×2 foot base in type colour |
| `building` | 7×5 main block; 2 yellow windows `#FFF9C4`; 1×2 door in `#5D4037`; 9×2 roofline cap |
| `fountain` | 3-stream vertical jets in `#42A5F5`; 5×1 basin top; 3×1 basin rim |
| `pond` | 10×3 water body in `#42A5F5`; 6×1 top/bottom edges; 2×1 ripple highlight in `#81D4FA` |
| `pavilion` | 7×4 body; 9×2 roof; 5×3 upper roof; 1×1 peak; type colour throughout |
| `grove` | Three overlapping leaf clusters, offsets `(-4)`, `(+1)`, `(-1)` in `#558B2F` |

All icons end with a 5×2 base marker in the type colour at `(x-2, y-1)`.

---

## Landmark Proximity Label

Shown when duck is within `LANDMARK_DIST = 20 px` of a landmark.

- **Position:** centred on `lm.x`, baseline at `lm.y - 11`
- **Background panel:** `UI_BG`, 7 px tall, width = `name_length * 2.4 + 8` px (pre-computed as `_nameWidth + 4`)
- **Offset:** panel top-left at `(lm.x - _nameWidth/2 - 2, lm.y - 17)`
- **Border:** 1 px `UI_BORDER` on all four sides
- **Text:** `F4`, type colour, `_nameLower` (pre-lowercased at startup)
- **Opacity:** `0.92`

---

## Info Badge `[i]`

Appears when duck is near a landmark. Pulses to draw attention.

- **Position:** top-left corner, `(3, 3)` — 3 px from each edge
- **Size:** 16 × 9 px
- **Background:** `UI_BG`
- **Border:** 1 px `UI_BORDER` on all four sides
- **Text:** `[i]`, `F5`, `UI_WARM` (`#FFF9C4`), centred
- **Alpha pulse:** `0.65 + sin(frame × 0.12) × 0.25` → range `0.40 → 0.90`

---

## Info Card

Full-screen overlay shown when `[i]` is tapped.

### Overlay

`rgba(0,0,0,0.78)` full-canvas dim behind the card.

### Card dimensions

- **Position:** `(5, 8)` — 5 px from left/right edges, 8 px from top
- **Size:** 70 × 128 px
- **Background:** `UI_BG`
- **Border:** 1 px `UI_BORDER` on all four sides
- **Inner padding:** 4 px

### Card layout (top → bottom, all x at `CX + 4 = 9`)

| Element | Font | Colour | Spacing |
|---------|------|--------|---------|
| Type badge | `F3` | `K.Ey` text on type-colour bg | height 6 px; text baseline at `ty + 5` |
| Gap after badge | — | — | `ty += 9` |
| Name lines | `F5` | `K.Wh` | each line `ty += 7` |
| Gap after name | — | — | `ty += 1` |
| Year (if not `'historic'`) | `F3` | `UI_DIM` | baseline `ty + 3`; `ty += 6` |
| Separator | — | `UI_BORDER` 1×1 px line | `ty += 2` before, `ty += 4` after |
| Body lines | `F4` | `UI_BODY` | each line `ty += 6`; clipped if `ty + 5 > CY + CH - 10 = 126` |
| "tap anywhere to close" | `F3` | `K.Wh` at `0.45` alpha | centred; `y = CY + CH - 3 = 133` |

**Type badge width:** `_typeUpper.length × 2.4 + 4` px (integer).

---

## Mini-map

Located bottom-left, 3 px from each edge: `(3, GH - 18 - 3) = (3, 123)`.

### Canvas

18 × 18 px `OffscreenCanvas`, pre-rendered once at startup.

- **Background:** `UI_BG`
- **Border:** 1 px `UI_BORDER` all four sides (inner of the 18×18 canvas)

### Room grid layout (inside the 18×18 canvas)

Each room is a 4×4 px block. Step = 6 (4 px room + 2 px corridor gap). Border = 1 px.

```
col index → canvas x:   0 → x=1    1 → x=7    2 → x=13
row index → canvas y:   0 → y=1    1 → y=7    2 → y=13
```

### Room colours

| State | Token | Colour |
|-------|-------|--------|
| Inactive (not current, not adjacent) | `MM_INACTIVE` | `#4E7450` — muted green |
| Adjacent (has an exit to/from current) | `MM_ADJACENT` | `#6EA870` — medium green |
| Current room | `MM_CURRENT` | `#88EE88` — bright green |

### Corridors

12 rects, each 2×2 px, filling the 2 px gaps between adjacent room blocks. Same colour as inactive rooms (`MM_INACTIVE`), baked into the static base canvas.

```
[5,  2, 2,2]  [11, 2, 2,2]                  (row 0 horizontal)
[2,  5, 2,2]  [8,  5, 2,2]  [13, 5, 2,2]  (col verticals, row 0→1)
[5,  8, 2,2]  [11, 8, 2,2]                  (row 1 horizontal)
[2, 11, 2,2]  [8, 11, 2,2]  [13,11, 2,2]  (col verticals, row 1→2)
[5, 14, 2,2]  [11,14, 2,2]                  (row 2 horizontal)
```

### Duck position dot

1×1 px, `K.Y` (`#FFD700`), mapped within the current room's 4×4 block:
```
ddx = cur.x + min(3, floor(duck.x / GW × 4))
ddy = cur.y + min(3, floor(duck.y / GH × 4))
```

---

## Exit Arrows

Drawn at screen edges where exits exist. Hidden during room transitions.

### Arrow shapes (pixel art)

**Up / Down — 7 w × 4 h:**
```
Up:    ...X...       Down:  XXXXXXX
       ..XXX..              .XXXXX.
       .XXXXX.              ..XXX..
       XXXXXXX              ...X...
```

**Left / Right — 4 w × 7 h:**
```
Left:  ...X    Right: X...
       ..XX           XX..
       .XXX           XXX.
       XXXX           XXXX
       .XXX           XXX.
       ..XX           XX..
       ...X           X...
```

### Positions

| Direction | Anchor (top-left of arrow) |
|-----------|---------------------------|
| North | `(GW/2 - 3, 2)` = `(37, 2)` |
| South | `(GW/2 - 3, GH - 6)` = `(37, 138)` |
| West | `(2, GH/2 - 3)` = `(2, 69)` |
| East | `(GW - 6, GH/2 - 3)` = `(74, 69)` |

### Shadow pass

Black `#000000`, drawn at `(anchor + 1, anchor + 1)`, alpha = `pulse × 0.55`.

### Main pass

White `#FFFFFF`, drawn at anchor position, alpha = `pulse`.

### Alpha pulse

```
pulse = 0.70 + sin(frame × 0.09) × 0.25
```
Range: `0.45 → 0.95`. Period ≈ 70 frames (~1.2 s at 60 fps).

---

## D-pad

Located bottom-right: centre at `(GW - 16, GH - 19) = (64, 125)`. Button size: 10 × 10 px.

### Button positions (top-left of each 10×10 button)

| Direction | x | y |
|-----------|---|---|
| Up | 59 | 110 |
| Down | 59 | 125 |
| Left | 49 | 120 |
| Right | 69 | 120 |

### Cross background

Two overlapping rects forming a cross:
- Horizontal: width 30, height 10, at `(49, 120)`
- Vertical: width 10, height 30, at `(59, 110)`
- Colour: `rgba(14, 14, 26, 0.65)` — matches `UI_BG` at reduced opacity

### Button fill

| State | Colour |
|-------|--------|
| Active (held) | `rgba(255, 240, 100, 0.75)` — warm yellow |
| Inactive | `rgba(255, 255, 255, 0.13)` — faint white |

### Arrow pixel art on buttons

`rgba(255,255,255,0.8)` — 5-pixel chevron per direction, centred on each button.

### Hit detection

Quadrant test: `abs(dx) >= B×1.6` or `abs(dy) >= B×1.6` → miss. Then `abs(dx) > abs(dy)` selects left/right; otherwise up/down.

---

## Particles

Heart and music note bursts from duck on tree visits.

### Spawn

7 particles per burst at `(duck.x + 6, duck.y - 2)` with:
- `vx`: random `±0.4`
- `vy`: `-(0.5 + random × 1.0)` (upward)
- `life`: starts at `1.0`

One in every three particles is a `note`; rest are `heart`.

### Physics

Each frame: `vy += 0.025` (gravity), `life -= 0.02`. Lifetime: 50 frames.

### Heart shape (5 px wide, 4 px tall)

```
 XX
X  X
 XXX
  X
```
Colour: `P_HEART` (`#FF4081`) — hot pink, at `globalAlpha = life`.

### Note shape (3 px wide, 3 px tall)

```
XX
 X
 X
```
Colour: `P_NOTE` (`#FFF9C4`) — warm white (= `UI_WARM`), at `globalAlpha = life`.

---

## Animations

### Duck idle bob

```
game.bob = sin(frame × 0.08) × 1.1
```
Applied as a y-offset to the duck sprite and shadow. Frozen during tree visits (`duck.visiting`).

### Duck joy wobble (tree visit)

```
rotation = sin(duck.joyPhase) × 0.22 rad
duck.joyPhase += 0.18 rad/frame
```
Rotation applied around sprite centre `(duck.x + 6, dy + 6)` using `cx.save/restore`.

### Walk animation

Walk frame advances every 7 frames of movement. 4 frames cycle (`wf & 3`).

### Tree glow

Visited tree's `glow` value:
- Fades in: `min(1, glow + 0.05)` per frame → full brightness in 20 frames
- Fades out: `max(0, glow - 0.03)` per frame → gone in ~33 frames
- Drawn as `#FFFF96` overlay at `globalAlpha = glow × 0.18`

### Room transition fade

20 frames total (10 out, 10 in). Black overlay alpha:
```
t     = room.tf / 10
alpha = t ≤ 1 ? t : 2 - t
```
Room and duck position swap at frame 10 (midpoint, when screen is fully black). Overlay colour: `K.Bl` (`#000000`).

### Info badge pulse

```
alpha = 0.65 + sin(frame × 0.12) × 0.25  →  0.40 – 0.90
```

### Exit arrow pulse

```
alpha = 0.70 + sin(frame × 0.09) × 0.25  →  0.45 – 0.95
```

---

## Screen Labels

Both labels use `F4`, `K.Wh`, `globalAlpha = 0.75`.

| Label | Content | Position |
|-------|---------|----------|
| Room name | `room.name.toLowerCase()` | centred at `(GW/2, 13)` |
| Park name | `'cubbon park'` | centred at `(GW/2, GH - 10) = (40, 134)` |

Labels are drawn **after** the transition fade overlay, so they remain visible through fades.

---

## Screen Layout Overview

```
y=0  ┌────────────────────────────────┐
     │  ← [i] badge (3,3) 16×9       │  (visible when near landmark)
y=2  │         ▲ north arrow          │
y=13 │    room name label (centred)   │
     │                                │
     │       [game world]             │
     │  trees · landmarks · duck      │
     │       [particles]              │
     │                                │
y=110│   ▲ d-pad up btn (59,110)      │
y=120│ ◄ d-pad left (49)  right (69) ►│
y=123│ ■ mini-map (3,123) 18×18       │
y=125│        d-pad down (59,125)     │
y=134│    cubbon park (centred)       │
y=138│         ▼ south arrow          │
y=144└────────────────────────────────┘
     ◄ west arrow at (2, 69)
                        east arrow → at (74, 69)
```

---

## Depth Sorting

All game objects (trees, landmarks, duck) are drawn in y-order — objects with a lower `y` value (further "back") are drawn first. The duck is inserted at its feet y-coordinate `duck.y + DH`.

`sortedDrawList` is pre-sorted at startup per room. Zero allocation at runtime.

---

## Interaction Model

| Input | Result |
|-------|--------|
| Touch/click d-pad | Move duck |
| Walk into screen edge (with exit) | Room transition |
| Walk within 13 px of unvisited tree | Duck visits tree (joy wobble, hearts, glow) |
| Walk within 20 px of landmark | Proximity label + `[i]` badge appears |
| Tap `[i]` | Info card opens |
| Tap anywhere (card open) | Card closes |

Single active touch tracked for d-pad (`activeTouchId`). Mouse events provided as desktop fallback.

---

## Performance Notes

All canvas drawing is allocation-free at runtime:
- Backgrounds, tree sprites, duck sprites, landmark sprites, and mini-map base are pre-rendered `OffscreenCanvas` objects
- `bgCanvas` is blitted in one `drawImage` call
- `sortedDrawList` is pre-sorted; no runtime sorting or object creation
- String fields (`_nameLower`, `_typeUpper`, `_nameLines`, `_wrappedInfo`, `_nameWidth`) are pre-computed on all landmarks at startup
- `getBoundingClientRect()` result is cached; invalidated only on `resize`
