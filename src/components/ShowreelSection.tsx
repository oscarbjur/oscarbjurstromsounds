import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Showreels
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            OBS
          </h1>
          <p className="font-body text-base tracking-[0.15em] text-muted-foreground">
            OSCAR BJURSTRÖM SOUNDS
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
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

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-14 -translate-y-1/2 z-10 p-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous showreel"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-14 -translate-y-1/2 z-10 p-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next showreel"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

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
      </div>
    </section>
  );
};

export default ShowreelSection;
