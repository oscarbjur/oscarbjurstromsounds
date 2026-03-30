import { motion } from "framer-motion";
import { Play } from "lucide-react";

const projects = [
  {
    title: "ECHOES OF MARS",
    category: "Feature Film",
    description: "Full sound design and Foley for a sci-fi thriller set on a terraformed Mars colony.",
    year: "2025",
  },
  {
    title: "HOLLOW DEPTHS",
    category: "Video Game",
    description: "Procedural audio systems and ambient soundscapes for an underwater survival horror game.",
    year: "2024",
  },
  {
    title: "NEON PULSE",
    category: "Commercial",
    description: "Sonic branding and sound effects for a luxury automotive brand campaign.",
    year: "2024",
  },
  {
    title: "THE LAST FREQUENCY",
    category: "Documentary",
    description: "Field recording and sound design for an award-winning nature documentary series.",
    year: "2023",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground">
            PORTFOLIO
          </h2>
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-t border-border py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-secondary/30 px-4 -mx-4 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                  <Play className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 md:text-right">
                <span className="text-primary font-body text-xs tracking-[0.2em] uppercase border border-primary/30 px-3 py-1">
                  {project.category}
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
