import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import evilMoonImage from "@/assets/evil-moon-selected.jpg";
import betanoImage from "@/assets/betano-selected.jpg";
import tiimoImage from "@/assets/tiimo-selected.jpg";

const selectedArtwork: Record<string, string> = {
  "4am": `${import.meta.env.BASE_URL}images/4am.jpg`,
  "evil-moon-unspoken": evilMoonImage,
  tiimo: tiimoImage,
  wavell: `${import.meta.env.BASE_URL}images/wavell-logo.webp`,
  "betano-easter": betanoImage,
  xellia: `${import.meta.env.BASE_URL}images/xellia-logo.webp`,
};

const selectedSlugs = [
  "4am",
  "evil-moon-unspoken",
  "tiimo",
  "wavell",
  "betano-easter",
  "xellia",
];

function getThumb(project: typeof projects[number]): string | null {
  if (selectedArtwork[project.slug]) return selectedArtwork[project.slug];
  if (project.imageUrl) return project.imageUrl;
  if (project.videoUrl) {
    const match = project.videoUrl.match(/(?:v=|youtu\.be\/)([^&]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

const SelectedWorksSection = () => {
  const selected = selectedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is typeof projects[number] => Boolean(p));

  return (
    <section id="selected-works" className="pt-44 pb-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            OSCAR BJURSTRÖM SOUND · SOUND DESIGN &amp; AUDIO IMPLEMENTATION
          </h1>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            SELECTED WORKS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {selected.map((project, i) => {
            const thumb = getThumb(project);

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link to={`/project/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-secondary">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground font-body text-sm">
                          {project.title}
                        </span>
                      </div>
                    )}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorksSection;
