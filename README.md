# Duck in Cubbon Park

A 2D 8-bit pixel art duck game for mobile portrait screens. Walk a duck through nine rooms of Cubbon Park, Bangalore — visit trees, discover real landmarks, and read the history behind them.

## Run

```bash
npm run dev
# → http://localhost:3000
```

ES modules require HTTP — `file://` won't work.

---

## How to Play

- **D-pad** (bottom-right) moves the duck in four directions
- **Exit arrows** pulse at screen edges — walk through them to move to the next room
- **Mini-map** (bottom-left) shows your position across all nine rooms in the 3×3 grid
- **Walk near a tree** to visit it — the duck wobbles, hearts burst, and the tree glows
- **Walk near a landmark** — a name label appears and a `[i]` badge pulses at the top-left
- **Tap `[i]`** to read the landmark's history card
- **Tap anywhere** to close the card

---

## The Park

Cubbon Park (officially Sri Chamarajendra Park) was established in 1870. It spans over 300 acres in the centre of Bangalore and contains more than 6,000 trees.

### Map

```
┌──────────────────┬──────────────────┬──────────────────┐
│  Seshadri Road   │ Attara Kacheri   │   Queens Road    │
│     (NW)         │      (N)         │      (NE)        │
├──────────────────┼──────────────────┼──────────────────┤
│  Fountain Road   │  Central Lawn    │   East Lawns     │
│      (W)         │      (C)         │      (E)         │
├──────────────────┼──────────────────┼──────────────────┤
│ Venkatappa Walk  │ Museum Grounds   │ Aquarium Corner  │
│     (SW)         │      (S)         │      (SE)        │
└──────────────────┴──────────────────┴──────────────────┘
```

### Rooms and Landmarks

| Room | Landmarks |
|------|-----------|
| Seshadri Road | Century Club (1917) |
| Attara Kacheri | Attara Kacheri / Karnataka High Court (1864–1868) |
| Queens Road | Press Club (1969) · Statue of Edward VII (1919) |
| Fountain Road | Musical Fountain (1995) · State Central Library (1915) |
| Central Lawn | Octagonal Bandstand (c.1914) · Sir Mark Cubbon statue (1866) |
| East Lawns | Bamboo Grove · Lotus Pond |
| Venkatappa Walk | Venkatappa Art Gallery (1975) · Chamarajendra Wadiyar statue (1927) |
| Museum Grounds | Government Museum (1865) · Jawahar Bal Bhavan (1967) |
| Aquarium Corner | Namma Bengaluru Aquarium (1983/2024) · Queen Victoria statue (1906) |

### Trees

14 species across all nine rooms:

Silver Oak · Gulmohar · Jacaranda · Banyan · Peepal / Sacred Fig · Royal Palm · Araucaria · Mast Tree · Mango · Jackfruit · Bamboo · Black Bean · Indian Laburnum · Copper Pod

---

## Project Structure

```
kashvi/
├── index.html       Entry point
├── package.json     Dev server (npx serve)
└── src/
    ├── main.js      Init + game loop
    ├── canvas.js    Canvas setup
    ├── constants.js Tuning values + colour palette
    ├── state.js     Mutable game state
    ├── data.js      Park content — species + rooms
    ├── audio.js     Quack sound
    ├── duck.js      Duck sprites + drawing
    ├── world.js     Room pre-rendering + asset pipeline
    ├── ui.js        Info badge + info card
    ├── hud.js       Mini-map + exit arrows
    ├── particles.js Heart burst particles
    ├── dpad.js      D-pad state + drawing
    ├── input.js     Touch/mouse event listeners
    ├── update.js    Per-frame game logic
    └── render.js    Per-frame draw orchestration
```

For visual design and colour reference see [DESIGN.md](./DESIGN.md).
For technical documentation see [TECHNICAL.md](./TECHNICAL.md).
