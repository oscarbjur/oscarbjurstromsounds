import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useServicesDrawer } from "@/components/ServicesDrawerProvider";

const PSXSpeakerCanvas = lazy(() => import("@/components/PSXSpeakerCanvas"));

const links: { href: string; label: string; drawer?: boolean }[] = [
  { href: "portfolio", label: "Work" },
  { href: "showreel", label: "Showreel" },
  { href: "services", label: "Services", drawer: true },
  { href: "about", label: "About" },
  { href: "contact", label: "Contact" },
];

const FACE_COUNT = 36;
const RADIUS = 50;

const SpinningLogo = () => {
  const rotationRef = useRef(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      rotationRef.current -= 0.25;
      if (divRef.current) {
        divRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const angleStep = 360 / FACE_COUNT;
  const faceWidth = 2 * RADIUS * Math.tan(Math.PI / FACE_COUNT);

  return (
    <div
      ref={divRef}
      className="relative"
      style={{
        width: faceWidth,
        height: 32,
        transformStyle: "preserve-3d",
        margin: "0 auto",
      }}
    >
      {Array.from({ length: FACE_COUNT }).map((_, i) => {
        const angle = i * angleStep;
        const showText = i % 12 === 0;
        return (
          <div
            key={i}
            className="absolute inset-0 items-center justify-center flex flex-row"
            style={{
              width: faceWidth,
              height: 32,
              backfaceVisibility: "hidden",
              transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
            }}
          >
            {showText && (
              <span className="font-display text-2xl text-foreground whitespace-nowrap select-none tracking-widest">
                OBS<span className="text-primary">.</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { openServices } = useServicesDrawer();

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  const goTo = (link: { href: string; drawer?: boolean }) => {
    setMenuOpen(false);
    if (link.drawer) {
      openServices();
      return;
    }
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(link.href)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(link.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex flex-col items-center relative">
        {/* Headphones in top-left corner */}
        <div className="absolute left-6 top-5 w-10 h-10">
          <Suspense fallback={null}>
            <PSXSpeakerCanvas scrollProgress={scrollProgress} />
          </Suspense>
        </div>
        {/* Menu button, phones and small tablets only */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden absolute right-6 top-5 z-10 p-1 text-foreground bg-transparent border-none cursor-pointer"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {/* Centered OBS spinning banner */}
        <Link to="/" className="block" style={{ perspective: 600 }}>
          <SpinningLogo />
        </Link>
        {/* Centered nav links below */}
        <div className="hidden md:flex items-center gap-8 mt-2">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => goTo(link)}
              className="text-muted-foreground font-body text-xs tracking-[0.2em] uppercase hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-5 flex flex-col items-start gap-4">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => goTo(link)}
                className="text-foreground/85 font-body text-xs tracking-[0.2em] uppercase hover:text-foreground transition-colors bg-transparent border-none cursor-pointer text-left p-0"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
