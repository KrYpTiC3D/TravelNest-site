/* "const" because the dataset itself never gets reassigned at runtime.       */
const DESTINATIONS = [
  {
    id: "kyoto",                                   // unique key for this entry
    name: "Kyoto",                                 // display name
    country: "Japan",                              // country label
    continent: "Asia",                             // used by continent filter
    image: "assets/images/Kyoto.webp",                                     // intentionally empty
    description:
      "Japan's former imperial capital, Kyoto blends serene temples, " +
      "traditional tea houses and quiet bamboo groves with a calm, " +
      "unhurried pace that makes it perfect for slow travel.",
    attractions: [                                 // list shown in the modal
      "Fushimi Inari shrine and its torii gates",
      "Arashiyama bamboo grove",
      "Kinkaku-ji (the Golden Pavilion)",
      "Gion historic geisha district"
    ],
    travelTypes: ["cultural", "relaxation"],       // generator tags
    budgetTier: "medium",                          // generator budget filter
    costs: { budget: 18000, mid: 39000, luxury: 90000 }   // daily LKR estimates
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    image: "assets/images/Santorini.webp",
    description:
      "Whitewashed villages cling to volcanic cliffs above a deep blue " +
      "caldera. Santorini is famous for its sunsets, black-sand beaches " +
      "and relaxed island rhythm.",
    attractions: [
      "Oia sunset viewpoint",
      "Red Beach near Akrotiri",
      "Ancient Thera ruins",
      "Caldera boat cruise"
    ],
    travelTypes: ["relaxation", "cultural"],
    budgetTier: "high",
    costs: { budget: 24000, mid: 54000, luxury: 120000 }
  },
  {
    id: "queenstown",
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    image: "assets/images/Queenstown.webp",
    description:
      "Ringed by mountains and set on a glacial lake, Queenstown is the " +
      "adventure capital of the southern hemisphere — bungee jumping, " +
      "skiing and hiking are all on the doorstep.",
    attractions: [
      "Skyline Gondola and luge",
      "Bungee jump at Kawarau Bridge",
      "Lake Wakatipu cruises",
      "Day trip to Milford Sound"
    ],
    travelTypes: ["adventure", "nature"],
    budgetTier: "high",
    costs: { budget: 21000, mid: 48000, luxury: 105000 }
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    image: "assets/images/Marrakech.webp",
    description:
      "A sensory feast of spice markets, palaces and hidden riads. " +
      "Marrakech rewards curious travellers with colour, craft and " +
      "centuries of history at every turn.",
    attractions: [
      "Jemaa el-Fnaa main square",
      "Bahia Palace",
      "Majorelle Garden",
      "The souks of the medina"
    ],
    travelTypes: ["cultural", "adventure"],
    budgetTier: "low",
    costs: { budget: 10500, mid: 27000, luxury: 66000 }
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    continent: "North America",
    image: "assets/images/Banff.webp",
    description:
      "Turquoise lakes, glaciers and pine forests sit inside Canada's " +
      "oldest national park. Banff is built for nature lovers in every " +
      "season of the year.",
    attractions: [
      "Lake Louise",
      "Moraine Lake",
      "Banff Gondola to Sulphur Mountain",
      "Johnston Canyon hike"
    ],
    travelTypes: ["nature", "adventure"],
    budgetTier: "medium",
    costs: { budget: 19500, mid: 42000, luxury: 96000 }
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    continent: "South America",
    image: "assets/images/Rio De Janeiro.webp",
    description:
      "Mountains tumble straight into the sea in Rio, where famous " +
      "beaches, samba rhythms and viewpoints make for an energetic, " +
      "sun-soaked escape.",
    attractions: [
      "Christ the Redeemer statue",
      "Sugarloaf Mountain cable car",
      "Copacabana and Ipanema beaches",
      "Tijuca rainforest trails"
    ],
    travelTypes: ["adventure", "relaxation"],
    budgetTier: "medium",
    costs: { budget: 13500, mid: 33000, luxury: 78000 }
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    continent: "Europe",
    image: "assets/images/Reykjavik.webp",
    description:
      "A compact, walkable capital that is the gateway to volcanoes, " +
      "waterfalls and the northern lights. Iceland is raw nature at its " +
      "most dramatic.",
    attractions: [
      "Blue Lagoon geothermal spa",
      "Golden Circle route",
      "Northern lights tours",
      "Hallgrimskirkja church viewpoint"
    ],
    travelTypes: ["nature", "adventure"],
    budgetTier: "high",
    costs: { budget: 25500, mid: 57000, luxury: 123000 }
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    continent: "Asia",
    image: "assets/images/Hanoi.webp",
    description:
      "Hanoi pairs a frantic, charming old quarter with tranquil lakes " +
      "and some of the best street food in the world — all at a price " +
      "that is kind to a student budget.",
    attractions: [
      "Hoan Kiem Lake",
      "Old Quarter street food tour",
      "Temple of Literature",
      "Day trip to Halong Bay"
    ],
    travelTypes: ["cultural", "adventure"],
    budgetTier: "low",
    costs: { budget: 7500, mid: 21000, luxury: 54000 }
  },
  {
    id: "capetown",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    image: "assets/images/Cape Town.webp",
    description:
      "Wedged between Table Mountain and two oceans, Cape Town offers " +
      "beaches, vineyards and wildlife within a short drive of a lively " +
      "modern city.",
    attractions: [
      "Table Mountain cableway",
      "Cape of Good Hope",
      "Boulders Beach penguins",
      "Constantia wine route"
    ],
    travelTypes: ["nature", "relaxation"],
    budgetTier: "medium",
    costs: { budget: 12000, mid: 30000, luxury: 72000 }
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    image: "assets/images/Lisbon.webp",
    description:
      "Pastel buildings, rattling trams and tiled facades cover Lisbon's " +
      "seven hills. It is sunny, affordable and endlessly photogenic.",
    attractions: [
      "Tram 28 through Alfama",
      "Belem Tower",
      "Time Out food market",
      "Sintra day trip"
    ],
    travelTypes: ["cultural", "relaxation"],
    budgetTier: "low",
    costs: { budget: 13500, mid: 31500, luxury: 75000 }
  },
  {
    id: "sydney",                                   // unique key for this entry
    name: "Sydney",
    country: "Australia",
    continent: "Oceania",
    image: "assets/images/Sydney.webp",
    description:
      "Sydney wraps a glittering harbour with golden beaches and a " +
      "buzzing food scene, making it an easy, relaxed introduction to " +
      "Australia.",
    attractions: [
      "Sydney Opera House",
      "Bondi to Coogee coastal walk",
      "Harbour Bridge climb",
      "Taronga Zoo ferry"
    ],
    travelTypes: ["relaxation", "nature"],
    budgetTier: "high",
    costs: { budget: 19000, mid: 38000, luxury: 102000 }
  },
  {
    id: "cusco",
    name: "Cusco",
    country: "Peru",
    continent: "South America",
    image: "assets/images/Cusco.webp",
    description:
      "The historic gateway to Machu Picchu, Cusco mixes Inca stonework " +
      "with colonial squares high in the Andes — a dream for cultural " +
      "and adventurous travellers alike.",
    attractions: [
      "Machu Picchu",
      "Sacred Valley",
      "San Pedro Market",
      "Rainbow Mountain trek"
    ],
    travelTypes: ["adventure", "cultural"],
    budgetTier: "low",
    costs: { budget: 10500, mid: 25500, luxury: 63000 }
  }
];

/* The travel quotes used by the Home page hero rotator live here too, so all
   site "content data" stays together in one file.                            */
const TRAVEL_QUOTES = [
  "The world is a book, and those who do not travel read only one page.",
  "Travel far enough, you meet yourself.",
  "To travel is to live.",
  "Adventure is worthwhile in itself.",
  "Once a year, go somewhere you have never been before."
];