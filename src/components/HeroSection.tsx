import { motion } from "framer-motion";

const WaveformVisualizer = () => (
  <div className="flex items-center gap-[2px] h-8">
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="waveform-bar w-[2px] bg-primary rounded-full"
        style={{
          animationDelay: `${i * 0.05}s`,
          opacity: 0.4 + Math.random() * 0.6,
        }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6">
            Sound Designer & Audio Engineer
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-none tracking-wide text-foreground mb-2">
            OBS
          </h1>
          <p className="font-display text-lg md:text-2xl tracking-[0.15em] text-muted-foreground mb-8">
            OSCAR BJURSTRÖM SOUNDS
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <WaveformVisualizer />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-muted-foreground font-body text-lg max-w-xl mx-auto"
        >
          Film. Games. Interactive Media. Every frame deserves a story told through sound.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="bg-primary text-primary-foreground px-8 py-3 font-body text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="border border-foreground/20 text-foreground px-8 py-3 font-body text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
