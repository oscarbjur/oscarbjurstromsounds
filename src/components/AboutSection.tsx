import { motion } from "framer-motion";
import oscarPhoto from "@/assets/oscar-photo.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="flex flex-col items-center text-center px-[56px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl text-foreground mb-6" style={{ fontFamily: "'Sarina', cursive" }}>
              Oscar Bjurström
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p className="text-left">
                I’m a sound designer and composer based in Malmö, Sweden, specializing in UX/UI sound and audio identities for global brands, devices, and video games.
                {"\n\n"}
                I believe every sound needs a place, a meaning, and a strategy behind it, and that includes silence, which can say more than any note when it’s used deliberately. My work is immersive, functional, and always made with purpose.
              </p>
              <p className="text-left">
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={oscarPhoto}
              alt="Oscar Bjurström"
              className="w-full max-w-md rounded-lg object-cover aspect-[3/4] border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
