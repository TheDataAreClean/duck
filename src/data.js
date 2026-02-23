// ── Species ───────────────────────────────────────────────────────────────────
// sprite: index into tree drawing code (0–7)

export const SPECIES = {
  'silver-oak':       { name: 'Silver Oak',         scientific: 'Grevillea robusta',         sprite: 0, info: 'Introduced when the park was founded in 1870. The original specimens near the Old Curator\'s Office are still alive — over 150 years old. Their fern-like leaves and golden-orange flowers make them easy to spot.' },
  'gulmohar':         { name: 'Gulmohar',            scientific: 'Delonix regia',             sprite: 1, info: 'In summer the canopy is dominated by flame-red flowers — one of the most dramatic sights in the park. Originally from Madagascar, it has become so common in Indian cities it feels native.' },
  'jacaranda':        { name: 'Jacaranda',           scientific: 'Jacaranda mimosifolia',     sprite: 2, info: 'The most photographed tree in Cubbon Park. In spring it sheds its leaves and bursts into a full violet-blue canopy. Several avenues are lined with jacarandas.' },
  'banyan':           { name: 'Banyan',              scientific: 'Ficus benghalensis',        sprite: 3, info: 'India\'s national tree. Large banyans send down aerial roots that become secondary trunks, letting a single tree cover a vast area. The park\'s oldest banyans may be well over a century old.' },
  'peepal':           { name: 'Peepal / Sacred Fig', scientific: 'Ficus religiosa',           sprite: 3, info: 'Sacred in Hindu, Buddhist, and Jain traditions. Recognised by its heart-shaped leaf with a long, tail-like tip. The rustling of peepal leaves in any breeze gives them an almost constant whisper.' },
  'royal-palm':       { name: 'Royal Palm',          scientific: 'Roystonea regia',           sprite: 4, info: 'Tall, smooth-trunked palms planted as formal avenue trees. They give the northern paths of the park a grand, colonial character, lining the route toward the Musical Fountain.' },
  'araucaria':        { name: 'Araucaria',           scientific: 'Araucaria spp.',            sprite: 5, info: 'An unusual sight in a tropical park — these conifers have a rigid, geometric branching pattern unlike anything else here. They were planted as ornamental curiosities during the colonial era.' },
  'polyalthia':       { name: 'Mast Tree',           scientific: 'Polyalthia longifolia',     sprite: 5, info: 'Tall and perfectly columnar with long, pendulous branches. So geometrically upright it was traditionally used as a ship\'s mast. Common along library paths as a formal avenue tree.' },
  'mango':            { name: 'Mango',               scientific: 'Mangifera indica',          sprite: 6, info: 'A true native. The park\'s mango trees bear fruit each summer, drawing birds, fruit bats, and the occasional optimistic squirrel. The library area has some of the oldest specimens.' },
  'jackfruit':        { name: 'Jackfruit',           scientific: 'Artocarpus heterophyllus',  sprite: 6, info: 'Bears the world\'s largest tree fruit — a single jackfruit can weigh over 40 kg and grows directly from the trunk. The southern section has several fruiting specimens.' },
  'bamboo':           { name: 'Bamboo',              scientific: 'Bambusa spp.',              sprite: 7, info: 'A dense grove of multiple bamboo species that creates its own microclimate — noticeably cooler and shadier than the open lawns. Bamboo is technically a grass; the fastest species grow up to 90 cm in a single day.' },
  'castanospermum':   { name: 'Black Bean',          scientific: 'Castanospermum australe',   sprite: 0, info: 'An avenue of these trees runs from Siddalingaiah Circle toward the Chamarajendra statue — one of the most distinctive walks in the park. Bears red-and-yellow flowers and large seed pods.' },
  'indian-laburnum':  { name: 'Indian Laburnum',     scientific: 'Cassia fistula',            sprite: 1, info: 'Known as the Golden Shower tree for its long, cascading clusters of bright yellow flowers in summer. The national flower of Thailand and the state flower of Kerala. Common throughout Karnataka and well represented here.' },
  'peltophorum':      { name: 'Copper Pod',          scientific: 'Peltophorum pterocarpum',   sprite: 1, info: 'Often mistaken for a Gulmohar but flowers yellow instead of red-orange. The rusty-copper colour of its seed pods gives it the name. A common avenue tree in the southern section.' },
};

// ── Rooms ─────────────────────────────────────────────────────────────────────
// 3×3 grid layout (col, row) — geographically correct NSEW positions:
//
//   col:  0 (WEST)              1 (CENTRAL)            2 (EAST)
//  row 0: [1: Seshadri Road]   [0: Attara Kacheri]    [6: Queens Road]
//  row 1: [5: Fountain Road]   [3: Central Lawn]      [4: East Lawns]
//  row 2: [2: Venkatappa Walk] [7: Museum Grounds]    [8: Aquarium Corner]

export const ROOMS = [

  // 0: Attara Kacheri  — col 1, row 0 (N)
  {
    id: 0,
    name: 'Attara Kacheri',
    exits: { west: 1, east: 6, south: 3 },
    trees: [
      { x: 14, y: 42, species: 'silver-oak' },
      { x: 58, y: 36, species: 'gulmohar'   },
      { x: 32, y: 68, species: 'silver-oak' },
      { x: 62, y: 88, species: 'jacaranda'  },
    ],
    landmarks: [
      {
        id: 'attara-kacheri',
        x: 54, y: 56, type: 'building',
        name: 'Attara Kacheri',
        year: '1864–1868',
        short: 'Greco-Roman secretariat, now High Court',
        info: 'Built 1864–1868 by Chief Engineer Richard Sankey, this Pompeian-red Greco-Roman building once housed the entire princely secretariat of Mysore. After the legislature moved to Vidhana Soudha in 1956, it became the sole seat of the Karnataka High Court.',
      },
    ],
  },

  // 1: Seshadri Road  — col 0, row 0 (NW)
  {
    id: 1,
    name: 'Seshadri Road',
    exits: { east: 0, south: 5 },
    trees: [
      { x: 16, y: 44, species: 'mango'      },
      { x: 54, y: 38, species: 'peepal'     },
      { x: 28, y: 78, species: 'polyalthia' },
      { x: 60, y: 92, species: 'mango'      },
    ],
    landmarks: [
      {
        id: 'century-club',
        x: 38, y: 52, type: 'building',
        name: 'Century Club',
        year: '1917',
        short: 'Founded 1917 for Indian members',
        info: 'Established in 1917 with Sir M. Visvesvaraya as first President, Century Club was founded specifically for Indians at a time when Cantonment clubs refused their entry. Its name reflects the original limit of one hundred members; it remains one of South India\'s most distinguished clubs.',
      },
    ],
  },

  // 2: Venkatappa Walk  — col 0, row 2 (SW)
  {
    id: 2,
    name: 'Venkatappa Walk',
    exits: { north: 5, east: 7 },
    trees: [
      { x: 22, y: 36, species: 'castanospermum' },
      { x: 50, y: 44, species: 'castanospermum' },
      { x: 14, y: 86, species: 'banyan'         },
      { x: 62, y: 72, species: 'silver-oak'     },
    ],
    landmarks: [
      {
        id: 'venkatappa-gallery',
        x: 56, y: 52, type: 'building',
        name: 'Venkatappa Art Gallery',
        year: '1975',
        short: 'Watercolourist\'s gallery, opened 1975',
        info: 'Houses the life\'s work of K. Venkatappa (1886–1965), pupil of Abanindranath Tagore and Karnataka\'s foremost watercolourist. The building opened in 1975 after bureaucratic delays that sparked a famous footpath protest by Bangalore artists.',
      },
      {
        id: 'chamarajendra-statue',
        x: 40, y: 108, type: 'statue',
        name: 'Chamarajendra Wadiyar',
        year: '1927',
        short: 'Marble tribute sculpted by G.K. Mhatre',
        info: 'Sculpted by G.K. Mhatre and installed in 1927, this marble statue honours Maharaja Chamarajendra Wadiyar X (r. 1868–1894) — an accomplished violinist and passionate arts patron. The park\'s official name, Sri Chamarajendra Park, was given in his honour.',
      },
    ],
  },

  // 3: Central Lawn  — col 1, row 1 (C)
  {
    id: 3,
    name: 'Central Lawn',
    exits: { west: 5, north: 0, east: 4, south: 7 },
    trees: [
      { x: 18, y: 40, species: 'jacaranda'       },
      { x: 56, y: 36, species: 'jacaranda'       },
      { x: 34, y: 80, species: 'indian-laburnum' },
      { x: 64, y: 94, species: 'gulmohar'        },
    ],
    landmarks: [
      {
        id: 'bandstand',
        x: 34, y: 58, type: 'pavilion',
        name: 'Octagonal Bandstand',
        year: 'c. 1914',
        short: 'Cast-iron Victorian bandstand, relocated 1937',
        info: 'Gifted by Maharaja Krishnaraja Wadiyar IV around 1914, this cast-iron bandstand hosted RAF concerts every Saturday before independence. Relocated in 1937, it shares a precise north–south axis with Vidhana Soudha, Attara Kacheri, and the Government Museum.',
      },
      {
        id: 'mark-cubbon-statue',
        x: 22, y: 108, type: 'statue',
        name: 'Sir Mark Cubbon',
        year: '1866',
        short: 'Bronze equestrian by Carlo Marochetti, 1866',
        info: 'Sculpted by Carlo Marochetti and unveiled on 16 March 1866, this bronze equestrian honours Sir Mark Cubbon, Chief Commissioner of Mysore 1834–1861 and the park\'s popular namesake. It stood within the High Court grounds for over 150 years before being relocated here in 2020.',
      },
    ],
  },

  // 4: East Lawns  — col 2, row 1 (E)
  {
    id: 4,
    name: 'East Lawns',
    exits: { west: 3, north: 6, south: 8 },
    trees: [
      { x: 16, y: 44, species: 'jackfruit'   },
      { x: 54, y: 52, species: 'bamboo'      },
      { x: 30, y: 88, species: 'peltophorum' },
      { x: 65, y: 86, species: 'jackfruit'   },
    ],
    landmarks: [
      {
        id: 'bamboo-grove',
        x: 58, y: 60, type: 'grove',
        name: 'Bamboo Grove',
        year: 'historic',
        short: 'Lush bamboo thicket, cool and full of birdsong',
        info: 'A dense stand of giant bamboo that creates a cool, cathedral-like canopy — one of Cubbon Park\'s most beloved retreats for walkers and birdwatchers. Bamboo is technically a grass; the fastest-growing species can put on 90 cm in a single day.',
      },
      {
        id: 'lotus-pond',
        x: 18, y: 80, type: 'pond',
        name: 'Lotus Pond',
        year: 'historic',
        short: 'Ornamental pond blooming with lotus',
        info: 'Still waters carpeted with Nelumbo nucifera blooms that attract butterflies, kingfishers, and wading birds to the heart of the park. Lotus grows rooted in mud yet blooms clean above the water — a quality revered across Hindu, Buddhist, and Jain traditions, and why it is India\'s national flower.',
      },
    ],
  },

  // 5: Fountain Road  — col 0, row 1 (W)
  {
    id: 5,
    name: 'Fountain Road',
    exits: { north: 1, east: 3, south: 2 },
    trees: [
      { x: 22, y: 36, species: 'royal-palm' },
      { x: 56, y: 36, species: 'royal-palm' },
      { x: 38, y: 80, species: 'araucaria'  },
      { x: 14, y: 96, species: 'silver-oak' },
    ],
    landmarks: [
      {
        id: 'musical-fountain',
        x: 42, y: 56, type: 'fountain',
        name: 'Musical Fountain',
        year: '1995',
        short: 'India\'s first computerised musical fountain',
        info: 'Inaugurated in 1995, the Indira Gandhi Musical Fountain is India\'s first computerised musical fountain — featuring over 1,000 nozzles and 27 choreographed water-and-light combinations. It performs nightly shows on Raj Bhavan Road at the western edge of Cubbon Park.',
      },
      {
        id: 'state-central-library',
        x: 28, y: 64, type: 'building',
        name: 'State Central Library',
        year: '1915',
        short: 'Memorial hall opened as library 1 May 1915',
        info: 'Built around 1910 and donated by Dewan Sir M. Visvesvaraya, this red-brick Tuscan-Corinthian hall opened as the State Library on 1 May 1915. It honours Sir K. Seshadri Iyer, Dewan of Mysore 1883–1901 and the reformer who brought electric power to Bangalore.',
      },
    ],
  },

  // 6: Queens Road  — col 2, row 0 (NE)
  {
    id: 6,
    name: 'Queens Road',
    exits: { west: 0, south: 4 },
    trees: [
      { x: 18, y: 44, species: 'indian-laburnum' },
      { x: 56, y: 38, species: 'gulmohar'        },
      { x: 30, y: 82, species: 'peepal'          },
      { x: 64, y: 92, species: 'banyan'          },
    ],
    landmarks: [
      {
        id: 'press-club',
        x: 38, y: 58, type: 'building',
        name: 'Press Club',
        year: '1969',
        short: 'Media hub founded 1969 in Cubbon Park',
        info: 'Founded in 1969 by Bangalore journalists, the Press Club of Bengaluru is one of India\'s most respected press clubs, set within Cubbon Park on Queen\'s Road. With roughly 2,000 members, it has for decades been the hub for press conferences, public debates, and Karnataka\'s media community.',
      },
      {
        id: 'edward-vii-statue',
        x: 54, y: 104, type: 'statue',
        name: 'Statue of Edward VII',
        year: '1919',
        short: 'Marble King Edward VII by Leonard Jennings',
        info: 'Sculpted in marble by Leonard Jennings and unveiled in November 1919 by Viceroy Lord Chelmsford, this statue stands at Queen\'s Park on Queen\'s Road. It is one of the few colonial-era statues in British India that remains at its original location.',
      },
    ],
  },

  // 7: Museum Grounds  — col 1, row 2 (S)
  {
    id: 7,
    name: 'Museum Grounds',
    exits: { west: 2, north: 3, east: 8 },
    trees: [
      { x: 20, y: 38, species: 'castanospermum' },
      { x: 58, y: 44, species: 'jacaranda'      },
      { x: 32, y: 82, species: 'araucaria'      },
      { x: 62, y: 96, species: 'peepal'         },
    ],
    landmarks: [
      {
        id: 'government-museum',
        x: 32, y: 56, type: 'building',
        name: 'Government Museum',
        year: '1865',
        short: 'South India\'s second-oldest museum, founded 1865',
        info: 'Founded on 18 August 1865 by Edward G. Balfour, this is South India\'s second-oldest museum. Its Greco-Roman neoclassical building, completed in 1877, holds 18 galleries of Hoysala, Chola, and Chalukya sculpture, geology, epigraphy, and numismatics.',
      },
      {
        id: 'bal-bhavan',
        x: 54, y: 100, type: 'building',
        name: 'Jawahar Bal Bhavan',
        year: '1967',
        short: 'Children\'s cultural centre, opened 1967',
        info: 'Opened in 1967 within 11 acres of Cubbon Park, Jawahar Bal Bhavan offers children\'s programmes including adventure camps, theatre, yoga, and creative workshops. Formalised under the Bal Bhavan Society in 1985, it remains a cherished institution for generations of Bengalureans.',
      },
    ],
  },

  // 8: Aquarium Corner  — col 2, row 2 (SE)
  {
    id: 8,
    name: 'Aquarium Corner',
    exits: { west: 7, north: 4 },
    trees: [
      { x: 16, y: 44, species: 'jackfruit'   },
      { x: 56, y: 38, species: 'peltophorum' },
      { x: 28, y: 82, species: 'banyan'      },
      { x: 64, y: 94, species: 'gulmohar'    },
    ],
    landmarks: [
      {
        id: 'aquarium',
        x: 40, y: 58, type: 'building',
        name: 'Namma Bengaluru Aquarium',
        year: '1983',
        short: 'Octagonal aquarium, inaugurated 1983, renovated 2024',
        info: 'Inaugurated in 1983, Bangalore Aquarium was India\'s second-largest at opening, with 14 large tanks displaying 40–50 freshwater species in a three-storey octagonal building. Renovated and reopened in 2024 as Namma Bengaluru Aquarium, it added a 75,000-litre marine tunnel.',
      },
      {
        id: 'queen-victoria-statue',
        x: 22, y: 104, type: 'statue',
        name: 'Queen Victoria',
        year: '1906',
        short: '11-foot marble by Sir Thomas Brock, unveiled 1906',
        info: 'Sculpted by Sir Thomas Brock — who also made the Victoria Memorial in London — this 11-foot marble statue was unveiled on 5 February 1906 by the future King George V. One of only five of the original fifty Queen Victoria statues in British India still at their original location.',
      },
    ],
  },

];
