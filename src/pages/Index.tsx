import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const PSXSpeakerCanvas = lazy(() => import("@/components/PSXSpeakerCanvas"));

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Floating PSX Speaker — fixed in center, spins on scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 opacity-50">
          <Suspense fallback={null}>
            <PSXSpeakerCanvas scrollProgress={scrollProgress} />
          </Suspense>
        </div>
      </div>

      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
