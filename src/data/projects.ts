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
}

const projectImage = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export const projects: Project[] = [
  {
    slug: "warlock-activities",
    title: "WARLOCK ACTIVITIES",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game — The Game Assembly",
    description: "Audio implemented with adaptive soundscapes for an isometric adventure inspired by Death's Door.",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=Ogm5dDrMZnM",
  },
  {
    slug: "bloom-eternal",
    title: "BLOOM ETERNAL",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game — The Game Assembly",
    description: "Audio implemented with adaptive soundscapes for an isometric adventure inspired by Death's Door.",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=dEkKYZpwTlE",
  },
  {
    slug: "spite-blood-and-gold",
    title: "SPITE: BLOOD AND GOLD",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game — The Game Assembly",
    description: "Audio implemented with adaptive soundscapes in FMOD for an action RPG inspired by Diablo III.",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=7QUu7-tfD9Y",
  },
  {
    slug: "pyro-survivor",
    title: "PYRO SURVIVOR",
    category: "Game Audio Implementation & Design",
    role: "Programmer, Graphics, Audio & Composer",
    type: "Game Jam — b3agz Jam 2024",
    description: "Audio implemented with Wwise to create a satisfying gameplay loop in this short game inspired by Tomb of the Necrodancer.",
    year: "2024",
    videoUrl: "https://www.youtube.com/watch?v=hvkuYqcY6NI",
    gameLink: "https://embh.itch.io/pyro-survivor",
  },
  {
    slug: "my-epic-nightmare",
    title: "MY EPIC NIGHTMARE",
    category: "Game Audio Implementation & Design",
    role: "Programmer, Audio Implementer & Designer",
    type: "Game Jam — Nordic Game Jam 2025",
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
    type: "Game Jam — Global Game Jam 2025",
    description: "Audio design and music composition for this game created in Unity. Combined different genres and styles of gameplay and art to create this Wario Ware inspired game.",
    year: "2025",
    imageUrl: projectImage("bubble-burst.png"),
    gameLink: "https://rfusade.itch.io/bubbleburst",
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
    type: "TV Show — SVT",
    description: "Created sound design and music for the section in the show called \"Läskiga Natten\".",
    year: "2025",
    imageUrl: projectImage("svt-familjefighten.avif"),
  },
  {
    slug: "device-ux-sound-design",
    title: "DEVICE UX SOUND DESIGN PROJECT",
    category: "UI/UX Sound Design",
    role: "Sound Designer",
    type: "UX Sound Design",
    description: "Coming soon.",
    year: "2025",
  },
];
