import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ShowreelSection from "@/components/ShowreelSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Section ids a shareable link can point at, e.g. /#/showreel
const SECTION_IDS = ["portfolio", "showreel", "about", "contact"];

const Index = () => {
  const location = useLocation();

  // A link like /#/showreel lands the visitor straight on that section
  useEffect(() => {
    const section = location.pathname.replace(/^\//, "");
    if (!SECTION_IDS.includes(section)) return;
    // Wait a beat so the page has laid out before we jump
    const timer = window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "auto" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PortfolioSection />
      <ShowreelSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
