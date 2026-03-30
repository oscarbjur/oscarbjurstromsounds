import { motion } from "framer-motion";

const ShowreelSection = () => {
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
            AAA Showreel
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            OBS
          </h1>
          <p className="font-body text-base tracking-[0.15em] text-muted-foreground">
            OSCAR BJURSTRÖM SOUNDS
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative w-full aspect-video bg-card border border-border overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/svi802Kilek?rel=0&modestbranding=1"
              title="OBS AAA Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
