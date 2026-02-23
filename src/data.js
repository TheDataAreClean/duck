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
        info: '"Attara Kacheri" — eighteen offices in Kannada — was built between 1864 and 1868 at a cost of Rs. 4,27,980, designed by Chief Engineer Richard Sankey under Commissioner Lewin Bentham Bowring. Its two-storey Greco-Roman facade, painted Pompeian red with Corinthian columns and pedimented windows, once housed the entire princely secretariat of Mysore. After the legislature moved to the Vidhana Soudha in 1956, the building became the sole seat of the Karnataka High Court.',
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
        info: 'Century Club was established in 1917 under the patronage of Maharaja Krishnaraja Wadiyar IV, with Sir M. Visvesvaraya as its first President — founded specifically to create a members\' club open to Indians at a time when Cantonment clubs refused them entry. Its name reflects its original limit of one hundred members. Set on land granted within Cubbon Park on Seshadri Road, it remains one of the most distinguished clubs in South India.',
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
        info: 'The Venkatappa Art Gallery houses the life\'s work of K. Venkatappa (1886–1965), a pupil of Abanindranath Tagore who rose from a family of Mysore Palace court painters to become Karnataka\'s foremost watercolourist and sculptor. The foundation stone was laid in 1967 but bureaucratic delays meant the building was not completed until 1975, prompting a famous footpath protest by Bangalore artists. The gallery displays his luminous Nilgiri landscapes, plaster bas-reliefs, and rotating exhibitions of contemporary Indian art.',
      },
      {
        id: 'chamarajendra-statue',
        x: 40, y: 108, type: 'statue',
        name: 'Chamarajendra Wadiyar',
        year: '1927',
        short: 'Marble tribute sculpted by G.K. Mhatre',
        info: 'This marble statue of Maharaja Chamarajendra Wadiyar X (r. 1868–1894), sculpted by Rao Bahadur G.K. Mhatre and installed in 1927, commemorates the ruler who was a passionate patron of classical music and the arts — himself an accomplished violinist. Chamarajendra was the adoptive father of Krishnaraja Wadiyar IV and reigned during a pivotal period of Mysore\'s cultural renaissance. The park\'s official name — Sri Chamarajendra Park — was given in his honour.',
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
        info: 'This octagonal cast-iron bandstand was gifted to Cubbon Park by Maharaja Krishnaraja Wadiyar IV around 1914 in the ornate Victorian style then fashionable across the British Empire. Before independence, the British Royal Air Force performed band music here every Saturday evening; the structure was relocated in 1937 to its current position over what was then Ringwood Circle. It shares a precise north–south axis with the Vidhana Soudha, Attara Kacheri, and Government Museum.',
      },
      {
        id: 'mark-cubbon-statue',
        x: 22, y: 108, type: 'statue',
        name: 'Sir Mark Cubbon',
        year: '1866',
        short: 'Bronze equestrian by Carlo Marochetti, 1866',
        info: 'This bronze equestrian statue of Sir Mark Cubbon, Chief Commissioner of Mysore from 1834 to 1861, was sculpted by Turin-born London sculptor Carlo Marochetti and unveiled on 16 March 1866, partly funded by a Rs. 10,000 contribution from Maharaja Krishnaraja Wadiyar III. The statue stood within the Karnataka High Court grounds for over 150 years before being relocated to Cubbon Park in 2020. Cubbon, who died in 1861 on a voyage home to England, is the popular namesake of the park.',
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
        info: 'The bamboo grove is one of Cubbon Park\'s most beloved retreats — a dense stand of giant bamboo that creates a cool, cathedral-like canopy popular with morning walkers, birdwatchers, and photographers. Cubbon Park, established in 1870 and spanning over 300 acres, was designed to integrate thickets like this alongside grassy expanses and flowering avenues into a unified urban forest. The grove is maintained by Karnataka\'s Department of Horticulture, which oversees the park\'s more than 6,000 trees.',
      },
      {
        id: 'lotus-pond',
        x: 18, y: 80, type: 'pond',
        name: 'Lotus Pond',
        year: 'historic',
        short: 'Ornamental pond blooming with lotus',
        info: 'The Lotus Pond is one of Cubbon Park\'s signature ornamental features, its still waters carpeted with Nelumbo nucifera blooms that attract butterflies, kingfishers, and wading birds to the heart of the 300-acre urban forest. Lotus grows rooted in mud yet blooms clean above the water — which is why it symbolises purity across Hindu, Buddhist, and Jain traditions and was chosen as India\'s national flower. The pond sits within the Department of Horticulture\'s carefully maintained grounds and is a favourite quiet retreat.',
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
        info: 'Inaugurated in 1995 by the Department of Horticulture and the Bangalore Development Authority, the Indira Gandhi Musical Fountain is widely cited as India\'s first computerised musical fountain — a 17-acre park featuring over 1,000 nozzles creating 15 water structures and 27 choreographed combinations. Named in honour of India\'s first woman Prime Minister, it performs nightly shows synchronising jets, coloured lights, and music on Raj Bhavan Road near the Planetarium, at the western edge of Cubbon Park.',
      },
      {
        id: 'state-central-library',
        x: 28, y: 64, type: 'building',
        name: 'State Central Library',
        year: '1915',
        short: 'Memorial hall opened as library 1 May 1915',
        info: 'The Seshadri Iyer Memorial Hall was built around 1910 through public subscription to honour Sir K. Seshadri Iyer, Dewan of Mysore from 1883 to 1901 and the reformer who brought electric power to Bangalore. Designed by Chief Engineer Richard Sankey with Tuscan and Corinthian columns, the building was donated by Dewan Sir M. Visvesvaraya and opened as the State Library on 1 May 1915. A bronze statue of Seshadri Iyer installed in 1913 stands before its imposing red-brick facade.',
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
        info: 'The Press Club of Bengaluru, founded in 1969 by a group of Bangalore journalists, is one of the most respected press clubs in India — nestled within the greenery of Cubbon Park on Queen\'s Road. With approximately 2,000 members including senior editors, photojournalists, and reporters, it has for decades served as a gathering place for press conferences, public debates, and cultural events central to Karnataka\'s media landscape.',
      },
      {
        id: 'edward-vii-statue',
        x: 54, y: 104, type: 'statue',
        name: 'Statue of Edward VII',
        year: '1919',
        short: 'Marble King Edward VII by Leonard Jennings',
        info: 'This marble statue of King Edward VII was sculpted by Leonard Jennings (1877–1956) of Chelsea — a Royal Academy-trained sculptor — and unveiled in November 1919 by Viceroy Lord Chelmsford, funded by residents of the Bangalore Civil and Military Station. It stands at the edge of Queen\'s Park on Queen\'s Road, one of the few colonial-era statues in British India that remains at its original location. The material is marble, not bronze as sometimes described.',
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
        info: 'Founded on 18 August 1865 by Edward G. Balfour — who had earlier established the Madras Museum in 1851 — this is the second oldest museum in South India. Initially housed in a Cantonment jail, it moved to its permanent Greco-Roman neoclassical building designed by Colonel Richard Sankey, completed in 1877. Its 18 galleries span geology, epigraphy, numismatics, and sculpture from the Hoysala, Chola, and Chalukya dynasties; it shares its campus with the Venkatappa Art Gallery.',
      },
      {
        id: 'bal-bhavan',
        x: 54, y: 100, type: 'building',
        name: 'Jawahar Bal Bhavan',
        year: '1967',
        short: 'Children\'s cultural centre, opened 1967',
        info: 'Jawahar Bal Bhavan, named after India\'s first Prime Minister Jawaharlal Nehru, was opened in 1967 as a recreational and educational centre for children within 11 acres of Cubbon Park. Formalised under the Bal Bhavan Society in 1985, its programming expanded to include adventure camps, theatre, yoga, creative workshops, and toy-train rides. It remains a cherished institution for generations of Bengalureans who visited its green grounds for summer classes and cultural performances.',
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
        info: 'The Bangalore Aquarium was constructed from 1972 and officially inaugurated on 27 August 1983 by the Government of Karnataka\'s Department of Fisheries, making it the second-largest aquarium in India at the time of opening. Its three-storey octagonal building houses 14 large tanks and 62 smaller aquaria displaying 40–50 species of freshwater ornamental fish. After four decades, it underwent a landmark renovation and reopened on 31 May 2024 as Namma Bengaluru Aquarium, with a new 75,000-litre marine tunnel and a 1,00,000-litre koi pond.',
      },
      {
        id: 'queen-victoria-statue',
        x: 22, y: 104, type: 'statue',
        name: 'Queen Victoria',
        year: '1906',
        short: '11-foot marble by Sir Thomas Brock, unveiled 1906',
        info: 'This 11-foot marble statue of Queen Victoria — set on a 13-foot granite pedestal, depicting her in Order of the Garter robes with sceptre and orb — was sculpted by Sir Thomas Brock, who also created the Victoria Memorial outside Buckingham Palace. It was unveiled on 5 February 1906 by the Prince of Wales, the future King George V, funded by the Bangalore Civil and Military Station with a contribution from Maharaja Krishnaraja Wadiyar IV. It is one of only five of the original fifty Queen Victoria statues erected across British India that still stand at their original locations.',
      },
    ],
  },

];
