import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceIcons } from "@/components/serviceIcons";
import { useServicesDrawer } from "@/components/ServicesDrawerProvider";

const ServicesSection = () => {
  const { openServices } = useServicesDrawer();

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
          <p className="text-muted-foreground font-body text-sm mt-5">
            Select a service to read the full description.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => openServices(service.slug)}
                  aria-label={`Read more about ${service.tab}`}
                  className="group w-full text-left bg-card border border-border p-8 hover:border-primary/50 transition-colors cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <Icon className="w-8 h-8 text-primary mb-6" />
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-sm text-foreground mb-3">
                    {service.tab}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {service.tagline}
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
