// ── Species ───────────────────────────────────────────────────────────────────
// sprite: index into tree drawing code (0–7)

export const SPECIES = {
  'silver-oak':       { name: 'Silver Oak',         scientific: 'Grevillea robusta',         sprite: 0, info: 'Introduced when the park was founded in 1870. The original specimens near the Old Curator\'s Office are still alive — over 155 years old. Their fern-like leaves and golden flowers make them easy to spot.' },
  'gulmohar':         { name: 'Gulmohar',            scientific: 'Delonix regia',             sprite: 1, info: 'In summer the canopy turns entirely flame-red, one of the most dramatic sights in the park. Originally from Madagascar, it has become so common in Indian cities it feels native.' },
  'jacaranda':        { name: 'Jacaranda',           scientific: 'Jacaranda mimosifolia',     sprite: 2, info: 'The most photographed tree in Cubbon Park. In spring it sheds all its leaves and bursts into a full violet-blue canopy. Several avenues are lined with jacarandas.' },
  'banyan':           { name: 'Banyan',              scientific: 'Ficus benghalensis',        sprite: 3, info: 'India\'s national tree. Large banyans send down aerial roots that become secondary trunks, letting a single tree cover a vast area. The park\'s oldest banyans may be well over a century old.' },
  'peepal':           { name: 'Peepal / Sacred Fig', scientific: 'Ficus religiosa',           sprite: 3, info: 'Sacred in Hindu, Buddhist, and Jain traditions. Recognised by its heart-shaped leaf with a long, tail-like tip. The rustling of peepal leaves in any breeze gives them an almost constant whisper.' },
  'royal-palm':       { name: 'Royal Palm',          scientific: 'Roystonea regia',           sprite: 4, info: 'Tall, smooth-trunked palms planted as formal avenue trees. They give the northern paths of the park a grand, colonial character, lining the route toward the Musical Fountain.' },
  'araucaria':        { name: 'Araucaria',           scientific: 'Araucaria spp.',            sprite: 5, info: 'An unusual sight in a tropical park — these conifers have a rigid, geometric branching pattern unlike anything else here. They were planted as ornamental curiosities during the colonial era.' },
  'polyalthia':       { name: 'Mast Tree',           scientific: 'Polyalthia longifolia',     sprite: 5, info: 'Tall and perfectly columnar with long, pendulous branches. So geometrically upright it was traditionally used as a ship\'s mast. Common along library paths as a formal avenue tree.' },
  'mango':            { name: 'Mango',               scientific: 'Mangifera indica',          sprite: 6, info: 'A true native. The park\'s mango trees bear fruit each summer, drawing birds, fruit bats, and the occasional optimistic squirrel. The library area has some of the oldest specimens.' },
  'jackfruit':        { name: 'Jackfruit',           scientific: 'Artocarpus heterophyllus',  sprite: 6, info: 'Bears the world\'s largest tree fruit — a single jackfruit can weigh up to 35 kg and grows directly from the trunk. The southern section has several fruiting specimens.' },
  'bamboo':           { name: 'Bamboo',              scientific: 'Bambusa spp.',              sprite: 7, info: 'A dense grove of multiple bamboo species that creates its own microclimate — noticeably cooler and shadier than the open lawns. Bamboo is technically a grass, growing up to 30 cm a day.' },
  'castanospermum':   { name: 'Black Bean',          scientific: 'Castanospermum australe',   sprite: 0, info: 'An avenue of these trees runs from Siddalingaiah Circle toward the Chamarajendra statue — one of the most distinctive walks in the park. Bears orange-yellow flowers and large seed pods.' },
  'indian-laburnum':  { name: 'Indian Laburnum',     scientific: 'Cassia fistula',            sprite: 1, info: 'Known as the Golden Shower tree for its long, cascading clusters of bright yellow flowers in summer. The national flower of Thailand. Common throughout Karnataka and well represented here.' },
  'peltophorum':      { name: 'Copper Pod',          scientific: 'Peltophorum pterocarpum',   sprite: 1, info: 'Often mistaken for a Gulmohar but flowers yellow instead of red-orange. The rusty-copper colour of its seed pods gives it the name. A common avenue tree in the southern section.' },
};

// ── Rooms ─────────────────────────────────────────────────────────────────────

export const ROOMS = [

  // 0: West Gate
  {
    id: 0,
    name: 'West Gate',
    exits: { north: 1, east: 3 },
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
        short: 'Karnataka High Court',
        info: '"Attara Kacheri" means Eighteen Offices in Kannada — it originally housed 18 departments of the princely Mysore state. Designed by Colonel Richard Sankey in neoclassical style with Corinthian columns and red-painted stone, it predates the park itself. Today it is the Karnataka High Court.',
      },
      {
        id: 'mark-cubbon-statue',
        x: 22, y: 94, type: 'statue',
        name: 'Sir Mark Cubbon',
        year: '1865',
        short: 'The park\'s namesake',
        info: 'Major General Sir Mark Cubbon served as Commissioner of Mysore from 1834 to 1861, transforming the region\'s administration. The park is popularly named after him, even though its official name is Sri Chamarajendra Park. The marble statue stands near the main entrance on Ambedkar Road.',
      },
    ],
  },

  // 1: Library Grove
  {
    id: 1,
    name: 'Library Grove',
    exits: { south: 0, east: 2 },
    trees: [
      { x: 16, y: 44, species: 'mango'      },
      { x: 54, y: 38, species: 'peepal'     },
      { x: 28, y: 78, species: 'polyalthia' },
      { x: 60, y: 92, species: 'mango'      },
    ],
    landmarks: [
      {
        id: 'seshadri-library',
        x: 38, y: 58, type: 'building',
        name: 'Seshadri Library',
        year: '1915',
        short: 'State Central Library',
        info: 'Named after Dewan Sir K. Sheshadri Iyer, who expanded Cubbon Park and introduced many of its exotic trees in the late 19th century. One of the oldest public libraries in Karnataka, fronted by a rose garden. It holds a large collection of books in Kannada, English, and regional languages.',
      },
      {
        id: 'queen-victoria-statue',
        x: 20, y: 102, type: 'statue',
        name: 'Queen Victoria',
        year: '1906',
        short: 'Colonial marble statue',
        info: 'A marble statue of Queen Victoria installed in 1906, reflecting the park\'s colonial origins. Victoria never visited India, but statues of her were installed across the subcontinent as symbols of empire. This one has stood quietly in Cubbon Park for over a century.',
      },
    ],
  },

  // 2: Museum Quarter
  {
    id: 2,
    name: 'Museum Quarter',
    exits: { west: 1, south: 3, north: 5 },
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
        name: 'Venkatappa Gallery',
        year: '1975',
        short: 'Court painter\'s legacy',
        info: 'Houses the works of K. Venkatappa (1887–1961), the court painter to the Mysore royal family, known for his portraits and sculptures. The gallery also holds rotating exhibitions of Indian art, making it one of Bangalore\'s most active cultural spaces.',
      },
      {
        id: 'government-museum',
        x: 32, y: 70, type: 'building',
        name: 'Government Museum',
        year: '1865',
        short: 'One of India\'s oldest museums',
        info: 'Established in 1865, this is one of the oldest museums in India. It holds archaeological artifacts, geological specimens, coins, and inscriptions from Karnataka and beyond. The colonial building shares its campus with the Venkatappa Art Gallery next door.',
      },
      {
        id: 'chamarajendra-statue',
        x: 40, y: 108, type: 'statue',
        name: 'Chamarajendra Wadiyar',
        year: '1927',
        short: 'The park\'s official namesake',
        info: 'The park\'s official name is Sri Chamarajendra Park, honoring Maharaja Chamarajendra Wadiyar X who ruled Mysore until his early death in 1894. This statue stands at the end of the chestnut-tree avenue from Siddalingaiah Circle — one of the park\'s most scenic corridors.',
      },
    ],
  },

  // 3: Central Lawn
  {
    id: 3,
    name: 'Central Lawn',
    exits: { west: 0, north: 2, south: 4 },
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
        year: '1880s',
        short: 'Colonial open-air stage',
        info: 'An octagonal open-air bandstand built during the British colonial era for military and civic band performances. It was central to Bangalore\'s social life in the 19th century — a place to promenade on Sunday evenings to the sound of brass bands. Still considered an architectural gem.',
      },
      {
        id: 'lotus-pond',
        x: 58, y: 112, type: 'pond',
        name: 'Lotus Pond',
        year: 'historic',
        short: 'A quiet corner of the park',
        info: 'A serene pond featuring lotus flowers — India\'s national flower. Lotus (Nelumbo nucifera) grows rooted in mud but blooms clean above the water, which is why it symbolises purity in Indian traditions. The pond attracts dragonflies, egrets, and the occasional kingfisher.',
      },
    ],
  },

  // 4: South Park
  {
    id: 4,
    name: 'South Park',
    exits: { north: 3 },
    trees: [
      { x: 16, y: 44, species: 'jackfruit'   },
      { x: 54, y: 52, species: 'bamboo'      },
      { x: 30, y: 88, species: 'peltophorum' },
      { x: 65, y: 86, species: 'jackfruit'   },
    ],
    landmarks: [
      {
        id: 'aquarium',
        x: 34, y: 62, type: 'building',
        name: 'Cubbon Park Aquarium',
        year: '1983',
        short: 'One of India\'s largest freshwater aquariums',
        info: 'One of the largest freshwater aquariums in India, housing a wide variety of river fish species. Especially popular with school groups and families. The building is a distinctive structure in the southern section near Kasturba Road.',
      },
      {
        id: 'bal-bhavan',
        x: 54, y: 110, type: 'building',
        name: 'Jawahar Bal Bhavan',
        year: '1965',
        short: 'Children\'s cultural centre',
        info: 'A children\'s activity and cultural centre named after India\'s first Prime Minister Jawaharlal Nehru. Hosts educational programs, puppet shows, and cultural events. Adjacent to it is the Indira Priyadarshini Children\'s Library with books in Kannada, English, and regional languages.',
      },
    ],
  },

  // 5: North Fountain
  {
    id: 5,
    name: 'North Fountain',
    exits: { south: 2 },
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
        year: '1970s',
        short: 'Water jets sync to music',
        info: 'Located on Raj Bhavan Road at the park\'s northern edge. The fountain operates on a binary control system that synchronises water jets to music — considered unique in India at the time of installation. The Raj Bhavan, the Governor\'s official residence, lies just beyond the road.',
      },
      {
        id: 'bamboo-grove',
        x: 62, y: 108, type: 'grove',
        name: 'Bamboo Grove',
        year: 'historic',
        short: 'The park\'s coolest corner',
        info: 'A dense grove of multiple bamboo species that creates its own microclimate — noticeably cooler and shadier than the open lawns. Bamboo is technically a grass, growing up to 30 cm a day. The grove is a quiet refuge for birds and sounds distinctly different when the wind picks up.',
      },
    ],
  },

];
