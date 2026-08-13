export const categories = [
  "Game Audio Implementation & Design",
  "UI/UX Sound Design",
  "Audio Logos & Identities",
  "Commercials",
  "Movies and Shows",
] as const;

export type Category = (typeof categories)[number];

export interface Project {
  slug: string;
  title: string;
  category: Category;
  role: string;
  type: string;
  description: string;
  year: string;
  videoUrl?: string;
  imageUrl?: string;
  gameLink?: string;
  steamLink?: string;
  websiteLink?: string;
  episodeLink?: string;
}

const projectImage = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export const projects: Project[] = [
  {
    slug: "warlock-activities",
    title: "WARLOCK ACTIVITIES",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game - The Game Assembly",
    description: "Designed original SFX and implemented adaptive soundscapes using FMOD for an isometric adventure inspired by Death's Door. Created in collaboration with a team of 13 across disciplines at The Game Assembly.",
    year: "2025",
    videoUrl: "https://www.youtube.com/watch?v=Ogm5dDrMZnM",
  },
  {
    slug: "bloom-eternal",
    title: "BLOOM ETERNAL",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game - The Game Assembly",
    description: "Designed original SFX and implemented adaptive soundscapes using FMOD for an isometric adventure inspired by Death's Door. Created in collaboration with a team of 13 across disciplines at The Game Assembly.",
    year: "2025",
    videoUrl: "https://www.youtube.com/watch?v=dEkKYZpwTlE",
  },
  {
    slug: "spite-blood-and-gold",
    title: "SPITE: BLOOD AND GOLD",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game - The Game Assembly",
    description: "Audio implemented with adaptive soundscapes in FMOD for an action RPG inspired by Diablo III. Made with a group from The Game Assembly in a team of 23, including developers across a plethora of disciplines.",
    year: "2025",
    videoUrl: "https://www.youtube.com/watch?v=7QUu7-tfD9Y",
    gameLink: "https://oliverriemvis.itch.io/spite",
  },
  {
    slug: "pyro-survivor",
    title: "PYRO SURVIVOR",
    category: "Game Audio Implementation & Design",
    role: "Programmer, Graphics, Audio & Composer",
    type: "Game Jam - b3agz Jam 2024",
    description: "Handled game programming, graphics, and audio implementation with Wwise in Unity (including original SFX design) to create a satisfying gameplay loop for a short game inspired by Crypt of the NecroDancer. Made for the B3AGZ JAM 2024 in a team of two.",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=hvkuYqcY6NI",
    gameLink: "https://embh.itch.io/pyro-survivor",
  },
  {
    slug: "my-epic-nightmare",
    title: "MY EPIC NIGHTMARE",
    category: "Game Audio Implementation & Design",
    role: "Programmer, Audio Implementer & Designer",
    type: "Game Jam - Nordic Game Jam 2025",
    description: "Audio implemented with FMOD to create a groovy underground sound for this game created at the Nordic Game Jam 2025 in Copenhagen.",
    year: "2025",
    imageUrl: projectImage("my-epic-nightmare.png"),
    gameLink: "https://lalkami.itch.io/my-epic-nightmare",
  },
  {
    slug: "bubble-burst",
    title: "BUBBLE BURST",
    category: "Game Audio Implementation & Design",
    role: "Audio Designer & Composer",
    type: "Game Jam - Global Game Jam 2025",
    description: "Audio design and music composition for this game created in Unity. Combined different genres and styles of gameplay and art to create this Wario Ware inspired game.",
    year: "2025",
    imageUrl: projectImage("bubble-burst.png"),
    gameLink: "https://rfusade.itch.io/bubbleburst",
  },
  {
    slug: "4am",
    title: "4AM",
    category: "Game Audio Implementation & Design",
    role: "Sound Designer",
    type: "Indie Game - Dark Zone Studios",
    description: "Producing sound design and planning out the sounds needed for the game. Currently in development.",
    year: "2026",
    videoUrl: "https://www.youtube.com/watch?v=Io60KVQI350",
    steamLink: "https://store.steampowered.com/app/2537270/4AM/",
    websiteLink: "https://darkzonestudios.com/",
  },
  {
    slug: "tilberinn",
    title: "TILBERINN",
    category: "Game Audio Implementation & Design",
    role: "Audio Designer & Implementer",
    type: "First Person Zombie Shooter",
    description: "Created the audio and sound implementation through FMOD for this first person zombie shooter inspired by Call of Duty Zombies. Made with a group from The Game Assembly in a team of 23, including developers across a plethora of disciplines.",
    year: "2026",
    imageUrl: projectImage("tilberinn.png"),
    videoUrl: "https://www.youtube.com/watch?v=TsoN5X8pBcw",
    gameLink: "https://oliverriemvis.itch.io/tilberinn",
  },
  {
    slug: "moon-doom",
    title: "MOON DOOM",
    category: "Game Audio Implementation & Design",
    role: "Sound Designer & Audio Direction",
    type: "Indie Game - Neckbolt",
    description: "Collaborated with Neckbolt on a DOOM and Metroid Prime inspired shooter, creating the sound design and helping shape the direction of the soundscape. The audio leans on old school sound, blending retro with modern sound production. Currently in development.",
    year: "2026",
    imageUrl: projectImage("moon-doom.jpg"),
    steamLink: "https://store.steampowered.com/app/4861420/MOON_DOOM/",
  },
  {
    slug: "betano-easter",
    title: "BETANO (KAIZEN GAMING) EASTER CAMPAIGN",
    category: "Commercials",
    role: "Voice Mix, Sound Design & Mastering",
    type: "Radio Commercial",
    description: "Mixed voice, sound designed, and mastered a radio commercial for Betano's Easter campaign.",
    year: "2026",
    imageUrl: projectImage("betano-easter.png"),
  },
  {
    slug: "svt-familjefighten",
    title: "SVT FAMILJEFIGHTEN",
    category: "Movies and Shows",
    role: "Composer & Sound Designer",
    type: "TV Show - SVT",
    description: "Created sound design and music for the section in the show called \"Läskiga Natten\".",
    year: "2025",
    imageUrl: projectImage("svt-familjefighten.avif"),
    episodeLink: "https://www.svtplay.se/video/8y2opPJ/familjefighten/6-skuggornas-dal-och-laskiga-natten?video=visa",
  },
  {
    slug: "tiimo",
    title: "TIIMO",
    category: "UI/UX Sound Design",
    role: "Sound Designer",
    type: "Planning App - Sonic Minds",
    description: "Created a bubbly, friendly and warm UX sound world for Tiimo, a planning app built for neurodivergent people. The audio carries a playful, almost game-like character to make everyday planning feel light and inviting.",
    year: "2026",
    imageUrl: projectImage("tiimo.png"),
    websiteLink: "https://sonicmindsagency.com/work/tiimo/",
  },
];
