import { motion } from "framer-motion";
import { Mail, MapPin, Youtube, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "oscarbjurstromsound@gmail.com";

const CONTACT_PULSE_EVENT = "obs:contact-pulse";

const ContactSection = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const pulsePendingRef = useRef(false);
  const [pulsing, setPulsing] = useState(false);

  const pulseIfVisible = () => {
    const target = headingRef.current;
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setPulsing(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const onRequestPulse = () => {
      if (!pulseIfVisible()) pulsePendingRef.current = true;
    };
    window.addEventListener(CONTACT_PULSE_EVENT, onRequestPulse);
    return () => window.removeEventListener(CONTACT_PULSE_EVENT, onRequestPulse);
  }, []);

  useEffect(() => {
    const target = headingRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && pulsePendingRef.current) {
            pulsePendingRef.current = false;
            setPulsing(true);
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onAnimationEnd={() => setPulsing(false)}
          className={`text-center mb-20 ${pulsing ? "contact-pulse" : ""}`}
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Let's Work Together
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            GET IN TOUCH
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-md mx-auto text-center space-y-10"
        >
          <p className="text-muted-foreground font-body leading-relaxed">
            Got a cool project? I'd love to hear about it. Let's make something awesome together.
          </p>
          <div className="space-y-5 flex flex-col items-center">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground font-body text-sm">{CONTACT_EMAIL}</span>
            </a>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-foreground font-body text-sm">Malmö, Sweden</span>
            </div>
            <a
              href="https://www.youtube.com/@oscarbjurstrom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Youtube className="w-5 h-5 text-primary" />
              <span className="text-foreground font-body text-sm">Oscar Bjurström</span>
            </a>
            <a
              href="https://www.instagram.com/oscarbjurstromsound"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <Instagram className="w-5 h-5 text-primary" />
              <span className="text-foreground font-body text-sm">@oscarbjurstromsound</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
