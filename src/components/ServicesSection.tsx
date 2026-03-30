import { motion } from "framer-motion";
import { Headphones, Film, Gamepad2, Mic, Radio, Music } from "lucide-react";

const services = [
  { icon: Film, title: "FILM & TV", description: "Complete sound design, Foley, and post-production audio for film and television." },
  { icon: Gamepad2, title: "GAME AUDIO", description: "Interactive audio systems, procedural sound, and adaptive music for video games." },
  { icon: Mic, title: "FOLEY ART", description: "Custom Foley recording and performance to bring every scene to life." },
  { icon: Headphones, title: "MIXING", description: "Surround and spatial audio mixing for cinema, VR, and immersive installations." },
  { icon: Radio, title: "FIELD RECORDING", description: "On-location recording and custom sound library creation worldwide." },
  { icon: Music, title: "SONIC BRANDING", description: "Audio logos, brand sounds, and sonic identities for commercial brands." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            What I Do
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            SERVICES
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-card border border-border p-8 hover:border-primary/50 transition-colors"
            >
              <service.icon className="w-8 h-8 text-primary mb-6" />
              <h3 className="font-display text-base text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
