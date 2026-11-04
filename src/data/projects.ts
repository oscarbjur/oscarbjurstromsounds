export const categories = [
  "Game Audio Implementation & Design",
  "UI/UX Sound Design",
  "Sonic Branding",
  "Audio Post",
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
  /** Case not yet cleared for showing — the tile is blurred behind a "Coming Soon..." note. */
  comingSoon?: boolean;
}

const projectImage = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export const projects: Project[] = [
  {
    slug: "wavell",
    title: "WAVELL",
    category: "UI/UX Sound Design",
    role: "UI Sound Designer",
    type: "HEADPHONE BRAND - UI SOUND DESIGN",
    description: "Created several of the UI sounds for Wavell headphones as part of Sonic Minds' work on the Danish brand's audio identity. Inspired by Wavell's Arctic aesthetic, the sound world combines wind-like textures, open chords and warm, resonant tones. The wider UI sound system covers everyday interactions such as power, pairing, connection and noise cancellation, bringing a distinct character to the listening experience. Hear the sounds and explore the full case on Sonic Minds' website.",
    year: "2026",
    imageUrl: projectImage("wavell-wordmark.png"),
    websiteLink: "https://sonicmindsagency.com/work/wavell/",
  },
  {
    slug: "warlock-activities",
    title: "WARLOCK ACTIVITIES",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "SCHOOL PROJECT - SFX DESIGN & FMOD IMPLEMENTATION",
    description: "Designed original SFX and implemented adaptive soundscapes using FMOD for an isometric adventure inspired by Death's Door. Created in collaboration with a team of 13 across disciplines at The Game Assembly.",
    year: "2025",
    videoUrl: "https://www.youtube.com/watch?v=Ogm5dDrMZnM",
  },
  {
    slug: "bloom-eternal",
    title: "BLOOM ETERNAL",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "SCHOOL PROJECT - SFX DESIGN & FMOD IMPLEMENTATION",
    description: "Designed original SFX and implemented adaptive soundscapes using FMOD for an isometric adventure inspired by Death's Door. Created in collaboration with a team of 13 across disciplines at The Game Assembly.",
    year: "2025",
    videoUrl: "https://www.youtube.com/watch?v=dEkKYZpwTlE",
  },
  {
    slug: "spite-blood-and-gold",
    title: "SPITE: BLOOD AND GOLD",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "SCHOOL PROJECT - FMOD AUDIO IMPLEMENTATION",
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
    type: "GAME JAM - AUDIO, CODE & GRAPHICS",
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
    type: "GAME JAM - FMOD AUDIO IMPLEMENTATION",
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
    type: "GAMEJAM - AUDIO DESIGN & COMPOSITION",
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
    type: "INDIE GAME - SOUND DESIGN",
    description: "Producing sound design and planning out the sounds needed for the game through Sonic Minds. Currently in development.",
    year: "2026",
    imageUrl: projectImage("4am.jpg"),
    videoUrl: "https://www.youtube.com/watch?v=Io60KVQI350",
    steamLink: "https://store.steampowered.com/app/2537270/4AM/",
    websiteLink: "https://darkzonestudios.com/",
  },
  {
    slug: "tilberinn",
    title: "TILBERINN",
    category: "Game Audio Implementation & Design",
    role: "Audio Designer & Implementer",
    type: "SCHOOL PROJECT - FMOD AUDIO IMPLEMENTATION",
    description: "Created the audio and sound implementation through FMOD for this first person zombie shooter inspired by Call of Duty Zombies. Made with a group from The Game Assembly in a team of 23, including developers across a plethora of disciplines.",
    year: "2026",
    imageUrl: projectImage("tilberinn.png"),
    videoUrl: "https://www.youtube.com/watch?v=TsoN5X8pBcw",
    gameLink: "https://oliverriemvis.itch.io/tilberinn",
  },
  {
    slug: "evil-moon-unspoken",
    title: "EVIL MOON: UNSPOKEN",
    category: "Game Audio Implementation & Design",
    role: "Sound Designer & Audio Direction",
    type: "INDIE GAME - SOUND DESIGN AND AUDIO DIRECTION",
    description: "Collaborated with Neckbolt on a DOOM and Metroid Prime inspired shooter, creating the sound design and helping shape the direction of the soundscape. The audio leans on old school sound, blending retro with modern sound production. Currently in development.",
    year: "2026",
    imageUrl: projectImage("evil-moon-capsule.jpg"),
    steamLink: "https://store.steampowered.com/app/4861420/Evil_Moon_Unspoken/",
  },
  {
    slug: "betano-easter",
    title: "BETANO EASTER CAMPAIGN",
    category: "Audio Post",
    role: "Voice Mix, Sound Design & Mastering",
    type: "SPORTS BETTING BRAND - RADIO AD MIX, SOUND DESIGN & MASTERING",
    description: "Mixed voice, sound designed, and mastered a radio commercial for Betano's Easter campaign, delivered through Sonic Minds.",
    year: "2026",
    imageUrl: projectImage("betano-easter.png"),
  },
  {
    slug: "svt-familjefighten",
    title: "SVT FAMILJEFIGHTEN",
    category: "Audio Post",
    role: "Composer & Sound Designer",
    type: "PUBLIC BROADCASTER TV SHOW - SOUND DESIGN & COMPOSITION",
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
    type: "NEURODIVERGENT PLANNING APP - AUDIO LOGO & UX SOUND",
    description: "Created a bubbly, friendly and warm UX sound world for Tiimo, a planning app built for neurodivergent people. The audio carries a playful, almost game-like character to make everyday planning feel light and inviting.",
    year: "2026",
    imageUrl: projectImage("tiimo-icon.png"),
    websiteLink: "https://sonicmindsagency.com/work/tiimo/",
  },
  {
    slug: "dividandy",
    title: "DIVIDANDY",
    category: "UI/UX Sound Design",
    role: "UX Sound Designer",
    type: "INVESTMENT GAME APP - UX SOUND DESIGN",
    description: "Created several of the UX sounds for Dividandy, an entertainment-focused investment app where players compete with simulated money in real market conditions through tournaments, leaderboards and challenges. As part of Sonic Minds' work on the brand's sonic identity, the sounds balance the energy and playfulness of a game with the credibility of real financial markets. The UX sound suite carries the personality of Dividandy's fox mascot into every tap, transition and notification, sometimes literally sharp, agile and clever, sometimes more in attitude and texture. Hear the sounds and explore the full case on Sonic Minds' website.",
    year: "2026",
    imageUrl: projectImage("dividandy-logo-official.webp"),
    websiteLink: "https://sonicmindsagency.com/work/dividandy/",
  },
  {
    slug: "dsb",
    title: "DSB",
    category: "Audio Post",
    role: "Sound Designer - Audio Story",
    type: "DANISH STATE RAILWAYS - AUDIO STORY",
    description: "Collaborated with Sonic Minds to support DSB, the Danish State Railways, with some of their music and audio logo endeavors. My contribution was an audio story built around the brand's sound world. You can explore Sonic Minds' wider, award-winning work with DSB on their website.",
    year: "2026",
    imageUrl: projectImage("dsb-logo-official.png"),
    websiteLink: "https://sonicmindsagency.com/work/dsb/",
  },
  {
    slug: "xellia",
    title: "XELLIA",
    category: "Sonic Branding",
    role: "Composer & Sound Designer - Audio Logo",
    type: "PHARMACEUTICALS - AUDIO LOGO COMPOSITION",
    description: "Created the audio logo for Xellia Pharmaceuticals through Sonic Minds. Xellia is a global leader in fermentation-based anti-infectives, and bubbles and classical instruments sit together in the piece, giving the brand a human and approachable character while the chords and melody carry the pondus its science demands. The bubbles are a nod to the fermentation process behind Xellia's medicines, rooting the sound in both the brand and what they actually make.",
    year: "2026",
    imageUrl: projectImage("xellia-wordmark.png"),
    websiteLink: "https://www.xellia.com/",
    comingSoon: true,
  },
  {
    slug: "unannounced-ui",
    title: "UNANNOUNCED PROJECT",
    category: "UI/UX Sound Design",
    role: "Sound Designer",
    type: "CLIENT PROJECT - UI/UX SOUND DESIGN",
    description: "A UI/UX sound project currently in progress. The full case will be announced soon.",
    year: "2026",
    imageUrl: projectImage("teaser-ux.jpg"),
    comingSoon: true,
  },
];

