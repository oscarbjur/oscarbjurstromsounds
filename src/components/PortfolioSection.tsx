import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";

const categories = [
  "All",
  "UI/UX Sound Design",
  "Game Audio Implementation & Design",
  "Audio Logos & Identities",
  "Commercials",
] as const;

type Category = (typeof categories)[number];

interface Project {
  title: string;
  category: Exclude<Category, "All">;
  role: string;
  type: string;
  description: string;
  year: string;
}

const projects: Project[] = [
  {
    title: "ECHOES OF MARS",
    category: "Game Audio Implementation & Design",
    role: "Lead Sound Designer",
    type: "AAA Video Game",
    description: "Full sound design, implementation in Wwise, and interactive audio systems for a sci-fi RPG.",
    year: "2025",
  },
  {
    title: "NEON PULSE",
    category: "Audio Logos & Identities",
    role: "Sonic Brand Designer",
    type: "Brand Identity",
    description: "Audio logo and full sonic identity system for a luxury automotive brand.",
    year: "2024",
  },
  {
    title: "HOLLOW DEPTHS",
    category: "Game Audio Implementation & Design",
    role: "Audio Implementer & Designer",
    type: "Indie Game",
    description: "Procedural audio systems and adaptive soundscapes built in FMOD for an underwater survival horror.",
    year: "2024",
  },
  {
    title: "INTERFACE REIMAGINED",
    category: "UI/UX Sound Design",
    role: "UI Sound Designer",
    type: "App / Product",
    description: "Complete UI sound palette for a fintech app — micro-interactions, transitions, and feedback sounds.",
    year: "2024",
  },
  {
    title: "VOLVO — RECHARGE",
    category: "Commercials",
    role: "Sound Designer & Mixer",
    type: "TV / Digital Commercial",
    description: "Sound design and final mix for a global EV campaign spot.",
    year: "2023",
  },
  {
    title: "THE LAST FREQUENCY",
    category: "Game Audio Implementation & Design",
    role: "Field Recordist & Sound Designer",
    type: "Indie Game",
    description: "Field recording and layered sound design for an atmospheric narrative puzzle game.",
    year: "2023",
  },
  {
    title: "STREAMLINE OS",
    category: "UI/UX Sound Design",
    role: "UX Audio Lead",
    type: "Operating System",
    description: "System-wide notification, alert, and interaction sound set for a next-gen desktop OS.",
    year: "2023",
  },
  {
    title: "NORDISK BANK",
    category: "Audio Logos & Identities",
    role: "Composer & Sound Designer",
    type: "Brand Identity",
    description: "Audio logo, hold music, and branded soundscape for a Nordic financial institution.",
    year: "2022",
  },
];

const PortfolioSection = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            PROJECTS
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                active === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-0">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group border-t border-border py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-secondary/30 px-4 -mx-4 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-11 h-11 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors shrink-0">
                  <Play className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mt-1 max-w-lg">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:text-right shrink-0">
                <span className="text-foreground font-body text-xs tracking-wide border border-border px-3 py-1">
                  {project.role}
                </span>
                <span className="text-primary font-body text-xs tracking-[0.15em] uppercase border border-primary/30 px-3 py-1">
                  {project.type}
                </span>
                <span className="text-muted-foreground font-body text-sm">
                  {project.year}
                </span>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
