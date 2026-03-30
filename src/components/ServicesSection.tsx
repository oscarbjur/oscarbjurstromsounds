import { motion } from "framer-motion";
import { Gamepad2, MousePointerClick, Music, Tv } from "lucide-react";

const services = [
  {
    icon: MousePointerClick,
    title: "UI/UX SOUND DESIGN",
    description: "Crafting intuitive sonic feedback for apps, products, and digital interfaces — from micro-interactions to full system soundscapes.",
  },
  {
    icon: Gamepad2,
    title: "GAME AUDIO IMPLEMENTATION & DESIGN",
    description: "End-to-end game audio: sound design, adaptive music, procedural systems, and implementation in Wwise & FMOD.",
  },
  {
    icon: Music,
    title: "AUDIO LOGOS & IDENTITIES",
    description: "Memorable sonic branding — audio logos, brand sounds, and cohesive audio identities that define how a brand is heard.",
  },
  {
    icon: Tv,
    title: "COMMERCIALS",
    description: "Sound design and mixing for TV spots, digital ads, and campaign films — punchy, polished, and on-brand.",
  },
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
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            SERVICES
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
              <h3 className="font-display text-sm text-foreground mb-3">
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
