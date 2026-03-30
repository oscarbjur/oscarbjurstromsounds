import { motion } from "framer-motion";
import { useState } from "react";

const showreels = [
  {
    title: "AAA Showreel",
    embedUrl: "https://www.youtube.com/embed/svi802Kilek?rel=0&modestbranding=1",
  },
  {
    title: "Indie Showreel",
    embedUrl: "https://www.youtube.com/embed/qTXknLtPP94?rel=0&modestbranding=1",
  },
  {
    title: "Subnautica Below Zero — Fan Cinematic",
    embedUrl: "https://www.youtube.com/embed/wMJDjlocg3M?rel=0&modestbranding=1",
  },
];

const ShowreelSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? showreels.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === showreels.length - 1 ? 0 : c + 1));

  return (
    <section className="relative pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-2xl md:text-4xl text-foreground uppercase">
            Oscar Bjurström Sounds<span className="text-primary">.</span>
        </motion.div>


        <div className="max-w-5xl mx-auto relative flex items-center gap-4">
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

          {/* Video column */}
          <div className="flex-1 min-w-0">
            {/* Video title */}
            <p className="text-center text-muted-foreground font-body text-sm tracking-[0.2em] uppercase mb-4">
              {showreels[current].title}
            </p>

            {/* Video embed */}
            <div className="relative w-full aspect-video bg-card border border-border overflow-hidden">
              <iframe
                key={current}
                src={showreels[current].embedUrl}
                title={showreels[current].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {showreels.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === current ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to showreel ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
