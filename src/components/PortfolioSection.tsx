import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { categories, projects, type Category } from "@/data/projects";


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

        <div className="space-y-0">
          {filtered.map((project, i) => (
            <Link key={project.slug} to={`/project/${project.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group border-t border-border py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-secondary/30 px-4 -mx-4 transition-colors"
            >
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
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
