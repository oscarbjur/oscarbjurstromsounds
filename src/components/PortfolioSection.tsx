import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, projects, type Category, type Project } from "@/data/projects";
import ProjectArtwork from "@/components/ProjectArtwork";

const tile = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

// Oscar's own project artwork (his own games and jam entries).
const ownArtwork: Record<string, string> = {
  "warlock-activities": tile("warlock-tile.jpg"),
  "bloom-eternal": tile("bloom-tile.jpg"),
  "spite-blood-and-gold": tile("spite-tile.jpg"),
  "pyro-survivor": tile("pyro-tile.jpg"),
};

const selectedSlugs = [
  "4am",
  "evil-moon-unspoken",
  "tiimo",
  "wavell",
  "betano-easter",
  "dsb",
  "xellia",
];

// Artwork for projects that are not covered by an official brand asset.
function fallbackThumb(project: Project): string | null {
  if (ownArtwork[project.slug]) return ownArtwork[project.slug];
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

  const selected = selectedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

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
          className="text-center mb-14"
        >
          <h1 className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            OSCAR BJURSTRÖM SOUND
          </h1>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            WORK
          </h2>
        </motion.div>
      </div>

      {/* Selected work reel */}
      <div className="selected-reel" aria-label="Selected work">
        <div className="selected-reel-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="selected-reel-group" aria-hidden={copy === 1 ? true : undefined}>
              {selected.map((project) => (
                <div key={project.slug} className="selected-reel-item">
                  <Link
                    to={`/project/${project.slug}`}
                    className="selected-reel-link group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    tabIndex={copy === 1 ? -1 : undefined}
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-secondary">
                      <ProjectArtwork
                        slug={project.slug}
                        alt={project.title}
                        fallbackSrc={fallbackThumb(project)}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-display text-base md:text-lg text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-primary font-body text-xs tracking-[0.15em] uppercase mt-1">
                        {project.type}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Divider between reel and full grid */}
        <div className="max-w-xs mx-auto border-t border-border mt-24 mb-16" />

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
          {filtered.map((project, i) => (
            <Link key={project.slug} to={`/project/${project.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer w-full h-full"
              >
                <ProjectArtwork
                  slug={project.slug}
                  alt={project.title}
                  fallbackSrc={fallbackThumb(project)}
                />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
