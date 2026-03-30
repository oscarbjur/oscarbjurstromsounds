export const categories = [
  "All",
  "UI/UX Sound Design",
  "Game Audio Implementation & Design",
  "Audio Logos & Identities",
  "Commercials",
] as const;

export type Category = (typeof categories)[number];

export interface Project {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
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
