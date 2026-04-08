import { Youtube, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-background border-t border-border">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-muted-foreground font-body text-xs tracking-widest">
        © 2026 — ALL RIGHTS RESERVED
      </p>
      <div className="flex items-center gap-5">
        <a href="https://www.youtube.com/@oscarbjurstrom" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Youtube className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/oscarbjurstromsound" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/oscar-bjurström-77053228b/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      <a href="#" className="font-display text-base text-foreground tracking-widest">
        OBS<span className="text-primary">.</span>
      </a>
    </div>
  </footer>
);

export default Footer;
