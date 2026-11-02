import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, projects, type Category } from "@/data/projects";
import evilMoonImage from "@/assets/evil-moon-selected.jpg";
import betanoImage from "@/assets/betano-selected.jpg";
import tiimoImage from "@/assets/tiimo-selected.jpg";

const tile = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

// Full-bleed artwork for the work grid: no padded canvases, no black bars.
const workArtwork: Record<string, string> = {
  "4am": tile("4am.jpg"),
  "evil-moon-unspoken": evilMoonImage,
  tiimo: tiimoImage,
  wavell: tile("wavell-logo.webp"),
  "betano-easter": betanoImage,
  xellia: tile("xellia-logo.webp"),
  "warlock-activities": tile("warlock-tile.jpg"),
  "bloom-eternal": tile("bloom-tile.jpg"),
  "spite-blood-and-gold": tile("spite-tile.jpg"),
  "pyro-survivor": tile("pyro-tile.jpg"),
  dividandy: tile("dividandy-tile.jpg"),
  dsb: tile("dsb-tile.jpg"),
};

function getThumb(project: typeof projects[number]): string | null {
  if (workArtwork[project.slug]) return workArtwork[project.slug];
  if (project.imageUrl) return project.imageUrl;
  if (project.videoUrl) {
    const match = project.videoUrl.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}


const PortfolioSection = () => {
  const [active, setActive] = useState<Category>(() => {
    const saved = sessionStorage.getItem("portfolioCategory");
    return (saved as Category) || "Game Audio Implementation & Design";
  });

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
    sessionStorage.setItem("portfolioCategory", cat);
  };

  const filtered = projects
    .filter((p) => p.category === active)
    .slice()
    .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));

  return (
    <section id="portfolio" className="pt-44 pb-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            WORK
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-xl transition-all ${
                active === cat
                  ? "btn-puffy"
                  : "bg-transparent text-muted-foreground border border-border rounded-[10px] hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collage grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
          {filtered.map((project, i) => {
            const thumb = getThumb(project);

            return (
              <Link key={project.slug} to={`/project/${project.slug}`} className="block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer w-full h-full"
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground font-body text-sm">
                        {project.title}
                      </span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="font-display text-base md:text-lg text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-primary font-body text-xs tracking-wider uppercase">
                      {project.type}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
