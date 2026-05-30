import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, projects, type Category } from "@/data/projects";

function getThumb(project: typeof projects[number]): string | null {
  if (project.imageUrl) return project.imageUrl;
  if (project.videoUrl) {
    const match = project.videoUrl.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

// Varying spans for a collage feel
const spanPatterns = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const PortfolioSection = () => {
  const [active, setActive] = useState<Category>(() => {
    const saved = sessionStorage.getItem("portfolioCategory");
    return (saved as Category) || "Game Audio Implementation & Design";
  });

  const handleCategoryChange = (cat: Category) => {
    setActive(cat);
    sessionStorage.setItem("portfolioCategory", cat);
  };

  const filtered = projects.filter((p) => p.category === active);

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
              onClick={() => handleCategoryChange(cat)}
              className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-xl transition-all ${
                active === cat
                  ? "btn-puffy"
                  : "bg-secondary text-muted-foreground border-none rounded-xl shadow-[0_4px_0_hsl(0_0%_8%),inset_0_1px_2px_hsl(0_0%_20%/0.3)] hover:text-foreground"
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
            const span = spanPatterns[i % spanPatterns.length];

            return (
              <Link key={project.slug} to={`/project/${project.slug}`} className={`${span} block`}>
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
