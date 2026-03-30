import { useState, useEffect, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";

const PSXSpeakerCanvas = lazy(() => import("@/components/PSXSpeakerCanvas"));

const links = [
  { href: "portfolio", label: "Work" },
  { href: "services", label: "Services" },
  { href: "about", label: "About" },
  { href: "contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <Suspense fallback={null}>
              <PSXSpeakerCanvas scrollProgress={scrollProgress} />
            </Suspense>
          </div>
          <Link to="/" className="font-display text-2xl text-foreground tracking-widest">
            OBS<span className="text-primary">.</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            isHome ? (
              <a
                key={link.href}
                href={`#${link.href}`}
                className="text-muted-foreground font-body text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={`/#${link.href}`}
                className="text-muted-foreground font-body text-xs tracking-[0.2em] uppercase hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
