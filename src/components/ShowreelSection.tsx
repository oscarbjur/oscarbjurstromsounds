import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  showreels,
  showreelEmbedUrl,
  showreelThumb,
  type Showreel,
} from "@/data/showreels";

const PlayGlyph = () => (
  <span className="showreel-play" aria-hidden="true">
    <span className="showreel-play-circle">
      <svg width="10" height="12" viewBox="0 0 10 12">
        <path d="M0 0L10 6L0 12Z" fill="currentColor" />
      </svg>
    </span>
  </span>
);

type PeekProps = {
  reel: Showreel;
  side: "left" | "right";
  onSelect: () => void;
};

const Peek = ({ reel, side, onSelect }: PeekProps) => (
  <button
    type="button"
    onClick={onSelect}
    aria-label={`Show ${reel.title}`}
    className={side === "left" ? "showreel-peek" : "showreel-peek showreel-peek-right"}
  >
    <span className="showreel-peek-frame">
      <img
        src={showreelThumb(reel.videoId)}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <span className="showreel-dim" />
      <span
        className={side === "left" ? "showreel-fade-left" : "showreel-fade-right"}
      />
      <PlayGlyph />
    </span>
    <span className="showreel-peek-label">{reel.title}</span>
  </button>
);

const ShowreelSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = showreels.length;

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  };
  const goTo = (i: number) => {
    if (i === current) return;
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "40%" : "-40%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0, scale: 0.95 }),
  };

  const springTransition = { type: "spring", stiffness: 200, damping: 28, mass: 0.8 };

  const leftReel = showreels[(current - 1 + total) % total];
  const rightReel = showreels[(current + 1) % total];

  return (
    <section id="showreel" className="relative pt-20 lg:pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            SHOWREEL
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto relative flex items-center gap-3 md:gap-5">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="btn-puffy-icon shrink-0"
            aria-label="Previous showreel"
          >
            <svg width="24" height="30" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L2 15L22 28Z" fill="hsl(210, 90%, 58%)" />
            </svg>
          </button>

          {/* Blurred preview of the previous reel */}
          {total > 1 && <Peek reel={leftReel} side="left" onSelect={prev} />}

          {/* Video column */}
          <div className="flex-1 min-w-0">
            {/* Video title */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={`title-${current}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={springTransition}
                className="text-center text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-4"
              >
                {showreels[current].title}
              </motion.p>
            </AnimatePresence>

            {/* Video embed */}
            <div className="relative w-full aspect-video bg-card border border-border overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={springTransition}
                  className="absolute inset-0"
                >
                  <iframe
                    src={showreelEmbedUrl(showreels[current].videoId)}
                    title={showreels[current].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Blurred preview of the next reel */}
          {total > 1 && <Peek reel={rightReel} side="right" onSelect={next} />}

          {/* Right arrow */}
          <button
            onClick={next}
            className="btn-puffy-icon shrink-0"
            aria-label="Next showreel"
          >
            <svg width="24" height="30" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L22 15L2 28Z" fill="hsl(210, 90%, 58%)" />
            </svg>
          </button>
        </div>

        {/* Small previews on phones, where the side peeks have no room */}
        <div className="showreel-chips">
          {showreels.map((reel, i) => (
            <button
              key={reel.videoId}
              type="button"
              data-active={i === current}
              onClick={() => goTo(i)}
              aria-label={`Show ${reel.title}`}
              className="showreel-chip"
            >
              <img
                src={showreelThumb(reel.videoId)}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              {i !== current && <span className="showreel-dim" />}
            </button>
          ))}
        </div>

        {/* Dots and count */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-6">
          <div className="flex gap-2">
            {showreels.map((reel, i) => (
              <button
                key={reel.videoId}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to showreel ${i + 1}`}
              />
            ))}
          </div>
          <span className="showreel-count">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
