import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              THE STORY
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                With over a decade of experience in sound design, I specialize in creating
                immersive audio experiences for film, video games, and interactive media.
              </p>
              <p>
                From the subtle ambiance of a quiet forest to the explosive chaos of a
                sci-fi battle sequence, every sound is meticulously crafted to serve the
                narrative and elevate the emotional impact.
              </p>
              <p>
                I believe that great sound design is invisible — it pulls you deeper into the
                story without you ever noticing. That's the craft I pursue every day.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "150+", label: "Projects" },
              { number: "10+", label: "Years" },
              { number: "40+", label: "Clients" },
              { number: "12", label: "Awards" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border p-8 text-center"
              >
                <p className="font-display text-2xl text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground font-body text-sm tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
