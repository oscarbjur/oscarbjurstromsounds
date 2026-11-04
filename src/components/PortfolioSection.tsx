import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { categories, projects, type Category, type Project } from "@/data/projects";
import ProjectArtwork from "@/components/ProjectArtwork";
import ProjectModal from "@/components/ProjectModal";

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

// Reel roll speed in px/s. Reduced-motion visitors get a slower roll, never a
// stopped one — Windows often reports reduced motion by default.
const REEL_SPEED = 64;
const REEL_SPEED_REDUCED = 28;
// How long the reel stays still after a visitor scrolls or drags it themselves.
const RESUME_DELAY_MS = 2500;

const PortfolioSection = () => {
  const [active, setActive] = useState<Category>(() => {
    const saved = sessionStorage.getItem("portfolioCategory");
    return (saved as Category) || "Game Audio Implementation & Design";
  });

  const [openProject, setOpenProject] = useState<Project | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

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

  // JS-driven marquee: the track is duplicated once and the viewport wraps at
  // the halfway point, so the roll is seamless and the visitor can also scroll
  // or drag the scrollbar to move through the works themselves.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let raf = 0;
    let last = performance.now();
    let hovering = false;
    let focusing = false;
    let dragging = false;
    let resumeAt = 0;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const speed = () => (reduced.matches ? REEL_SPEED_REDUCED : REEL_SPEED);
    const groupWidth = () => (trackRef.current ? trackRef.current.scrollWidth / 2 : 0);
    const paused = () =>
      hovering || focusing || dragging || performance.now() < resumeAt;
    const bumpIdle = () => {
      resumeAt = performance.now() + RESUME_DELAY_MS;
    };

    const updateThumb = () => {
      const bar = barRef.current;
      const thumb = thumbRef.current;
      const half = groupWidth();
      if (!bar || !thumb || half <= 0) return;
      const barW = bar.clientWidth;
      const thumbW = Math.min(
        barW,
        Math.max((viewport.clientWidth / half) * barW, 44),
      );
      const maxPos = barW - thumbW;
      const pos = Math.min(1, viewport.scrollLeft / half) * maxPos;
      thumb.style.width = `${thumbW}px`;
      thumb.style.transform = `translateX(${pos}px)`;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const half = groupWidth();
      if (half > 0) {
        if (!paused()) viewport.scrollLeft += speed() * dt;
        if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
        updateThumb();
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const half = groupWidth();
      if (half > 0 && viewport.scrollLeft >= half) viewport.scrollLeft -= half;
      updateThumb();
    };

    const onPointerEnter = () => {
      hovering = true;
    };
    const onPointerLeave = () => {
      hovering = false;
    };
    const onFocusIn = () => {
      focusing = true;
    };
    const onFocusOut = () => {
      focusing = false;
    };
    const onWheel = () => bumpIdle();
    const onTouchStart = () => bumpIdle();

    const thumb = thumbRef.current;
    const onThumbDown = (e: PointerEvent) => {
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = viewport.scrollLeft;
      thumb?.setPointerCapture(e.pointerId);
      thumb?.classList.add("is-dragging");
    };
    const onThumbMove = (e: PointerEvent) => {
      if (!dragging) return;
      const bar = barRef.current;
      const half = groupWidth();
      if (!bar || half <= 0) return;
      const scale = half / bar.clientWidth;
      const next = dragStartScroll + (e.clientX - dragStartX) * scale;
      // Wrap in both directions so dragging past either end keeps rolling.
      viewport.scrollLeft = ((next % half) + half) % half;
      updateThumb();
    };
    const onThumbUp = () => {
      if (!dragging) return;
      dragging = false;
      thumb?.classList.remove("is-dragging");
      bumpIdle();
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerenter", onPointerEnter);
    viewport.addEventListener("pointerleave", onPointerLeave);
    viewport.addEventListener("focusin", onFocusIn);
    viewport.addEventListener("focusout", onFocusOut);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    thumb?.addEventListener("pointerdown", onThumbDown);
    thumb?.addEventListener("pointermove", onThumbMove);
    thumb?.addEventListener("pointerup", onThumbUp);
    thumb?.addEventListener("pointercancel", onThumbUp);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      viewport.removeEventListener("focusin", onFocusIn);
      viewport.removeEventListener("focusout", onFocusOut);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("touchstart", onTouchStart);
      thumb?.removeEventListener("pointerdown", onThumbDown);
      thumb?.removeEventListener("pointermove", onThumbMove);
      thumb?.removeEventListener("pointerup", onThumbUp);
      thumb?.removeEventListener("pointercancel", onThumbUp);
    };
  }, []);

  return (
    <section id="portfolio" className="pt-44 pb-20 lg:pb-32 bg-card">
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
        <div ref={viewportRef} className="selected-reel-viewport">
          <div ref={trackRef} className="selected-reel-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="selected-reel-group" aria-hidden={copy === 1 ? true : undefined}>
                {selected.map((project) => (
                  <div key={project.slug} className="selected-reel-item">
                    <button
                      type="button"
                      onClick={() => {
                        if (!project.comingSoon) setOpenProject(project);
                      }}
                      className={`selected-reel-link group block w-full text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        project.comingSoon ? "cursor-default" : ""
                      }`}
                      tabIndex={copy === 1 ? -1 : undefined}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary lg:aspect-[16/10]">
                        <div
                          className={`absolute inset-0 ${
                            project.comingSoon ? "scale-110 blur-lg" : ""
                          }`}
                        >
                          <ProjectArtwork
                            slug={project.comingSoon ? `teaser-${project.slug}` : project.slug}
                            alt={project.comingSoon ? "Coming soon" : project.title}
                            fallbackSrc={
                              project.comingSoon
                                ? (project.teaserImage ?? fallbackThumb(project))
                                : fallbackThumb(project)
                            }
                          />
                        </div>
                        {project.comingSoon && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20">
                            <span className="font-display text-lg md:text-xl uppercase tracking-[0.25em] text-foreground">
                              Coming Soon...
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-center">
                        {project.comingSoon ? (
                          <h3 className="font-display text-base md:text-lg text-foreground">
                            Coming Soon...
                          </h3>
                        ) : (
                          <>
                            <h3 className="font-display text-base md:text-lg text-foreground">
                              {project.title}
                            </h3>
                            <p className="text-primary font-body text-xs tracking-[0.15em] uppercase mt-1">
                              {project.type}
                            </p>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Draggable scrollbar: grabs pause the roll, it resumes after a moment */}
        <div ref={barRef} className="selected-reel-scrollbar">
          <div
            ref={thumbRef}
            className="selected-reel-thumb"
            role="presentation"
          />
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
        <div className="grid grid-cols-2 auto-rows-min lg:grid-cols-4 lg:auto-rows-[200px] gap-3">
          {filtered.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => {
                if (!project.comingSoon) setOpenProject(project);
              }}
              className={`block w-full text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                project.comingSoon ? "cursor-default" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card ${
                  project.comingSoon ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div className="relative aspect-[16/10] min-h-0 overflow-hidden lg:aspect-auto lg:flex-1">
                  <div
                    className={`absolute inset-0 ${
                      project.comingSoon ? "scale-110 blur-lg" : ""
                    }`}
                  >
                    <ProjectArtwork
                      slug={project.comingSoon ? `teaser-${project.slug}` : project.slug}
                      alt={project.comingSoon ? "Coming soon" : project.title}
                      fallbackSrc={
                        project.comingSoon
                          ? (project.teaserImage ?? fallbackThumb(project))
                          : fallbackThumb(project)
                      }
                    />
                  </div>
                  {project.comingSoon && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 px-2 text-center">
                      <span className="font-display text-sm uppercase tracking-[0.2em] text-foreground">
                        Coming Soon...
                      </span>
                    </div>
                  )}
                  {/* Hover reveal (pointer devices) */}
                  {!project.comingSoon && (
                    <div className="absolute inset-0 hidden bg-background/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex lg:flex-col lg:items-center lg:justify-center p-4 text-center">
                      <h3 className="font-display text-lg text-foreground mb-1">
                        {project.title}
                      </h3>
                      <p className="text-primary font-body text-xs tracking-wider uppercase">
                        {project.type}
                      </p>
                    </div>
                  )}
                </div>
                {/* Caption plate (touch devices, where hover never happens) */}
                <div className="shrink-0 border-t border-border bg-card px-2 py-2 lg:hidden">
                  <h3 className="font-display line-clamp-3 text-[12px] leading-tight text-foreground">
                    {project.comingSoon ? "Coming Soon..." : project.title}
                  </h3>
                  <p className="mt-1 line-clamp-4 text-[9px] font-medium uppercase leading-[1.35] tracking-[0.1em] text-muted-foreground">
                    {project.comingSoon ? "" : project.type}
                  </p>
                </div>
              </motion.div>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal
        project={openProject}
        fallbackSrc={openProject ? fallbackThumb(openProject) : null}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
};

export default PortfolioSection;
