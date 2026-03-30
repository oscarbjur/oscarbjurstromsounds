export const categories = [
  "Game Audio Implementation & Design",
  "UI/UX Sound Design",
  "Audio Logos & Identities",
  "Commercials",
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
    imageUrl: "/src/assets/my-epic-nightmare.png",
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
    imageUrl: "/src/assets/bubble-burst.png",
    gameLink: "https://rfusade.itch.io/bubbleburst",
  },
  {
    slug: "streamline-os",
    title: "STREAMLINE OS",
    category: "UI/UX Sound Design",
    role: "UX Audio Lead",
    type: "Operating System",
    description: "System-wide notification, alert, and interaction sound set for a next-gen desktop OS.",
    year: "2023",
  },
  {
    slug: "nordisk-bank",
    title: "NORDISK BANK",
    category: "Audio Logos & Identities",
    role: "Composer & Sound Designer",
    type: "Brand Identity",
    description: "Audio logo, hold music, and branded soundscape for a Nordic financial institution.",
    year: "2022",
  },
];
