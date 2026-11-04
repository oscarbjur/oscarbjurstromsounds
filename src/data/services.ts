export type ServiceIconKey = "ui" | "game" | "brand" | "post";

export type Service = {
  slug: string;
  tab: string;
  title: string;
  tagline: string;
  icon: ServiceIconKey;
  intro: string[];
  includes: string[];
  projectSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "ui-ux-sound-design",
    tab: "UI/UX Sound Design",
    title: "UI/UX Sound Design",
    tagline: "Sound that makes an interface feel obvious.",
    icon: "ui",
    intro: [
      "I design and implement UX sound for apps, devices and digital products, from single micro-interactions to complete system soundscapes. Every cue has a job: to confirm, to warn, to guide, or to stay out of the way.",
      "The work starts with the product itself. I map the states an interface can be in, agree with the design team on what each one should communicate, then build a palette that keeps the whole system coherent as it grows.",
    ],
    includes: [
      "Sound principles and a shared sonic palette for the product",
      "Interaction, notification and status sounds",
      "Accessibility review so sound supports the interface instead of competing with it",
      "Implementation in Wwise, FMOD or native platform audio",
      "Delivery and handover documentation for engineering teams",
    ],
    projectSlugs: ["wavell", "tiimo", "dividandy"],
  },
  {
    slug: "game-sound-design",
    tab: "Game Sound Design & Implementation",
    title: "Game Sound Design and Implementation",
    tagline: "Adaptive audio that reacts to what the player does.",
    icon: "game",
    intro: [
      "From concept to final build: sound design, adaptive music and procedural systems, implemented and mixed inside the engine.",
      "I have worked on game jams, indie titles and larger productions, in teams of two and teams of twenty, so I am as comfortable making the assets as I am wiring them up so they behave under real play conditions.",
    ],
    includes: [
      "Sound design for characters, weapons, environments and game UI",
      "Adaptive and procedural music systems",
      "Wwise and FMOD integration, including the technical side",
      "In-engine mixing and balancing across full playthroughs",
      "Final delivery prepared for platform requirements",
    ],
    projectSlugs: [
      "evil-moon-unspoken",
      "tilberinn",
      "spite-blood-and-gold",
      "4am",
      "warlock-activities",
      "bloom-eternal",
      "pyro-survivor",
    ],
  },
  {
    slug: "sonic-branding",
    tab: "Sonic Branding",
    title: "Sonic Branding",
    tagline: "A brand people recognise with their ears.",
    icon: "brand",
    intro: [
      "Audio logos, brand sounds and fuller sonic identities, built around what a brand actually stands for rather than what is currently in fashion.",
      "A brand sound has to survive three seconds on a phone and still hold up as the anchor of a year of campaigns. I design with that lifespan in mind and write down the rules so the sound stays intact in other people's hands.",
    ],
    includes: [
      "Audio logo and signature sound",
      "Sonic identity system across products and campaigns",
      "Guidelines for consistent use across channels",
      "Edits and variations for every length and format",
      "Delivery for broadcast, digital and in-product use",
    ],
    projectSlugs: ["xellia", "betano-easter"],
  },
  {
    slug: "audio-post-production",
    tab: "Audio Post Production",
    title: "Audio Post Production",
    tagline: "Clean, balanced, broadcast-ready sound.",
    icon: "post",
    intro: [
      "Dialogue, ambience, sound design, music and mix for film, TV, commercials and campaign films, from a first rough cut to the final master.",
      "I mix to the loudness standards each platform expects, so a piece lands as intended whether it runs on television, on a screen in a shop or inside a social feed.",
    ],
    includes: [
      "Dialogue editing and noise treatment",
      "Ambience, foley and sound design passes",
      "Music editing and mixing",
      "Mixes prepared to platform loudness standards",
      "Masters and versions for broadcast, digital and social",
    ],
    projectSlugs: ["svt-familjefighten", "betano-easter", "dsb"],
  },
];
