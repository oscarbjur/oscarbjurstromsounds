import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ShowreelSection from "@/components/ShowreelSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem("intro-played") === "true"
  );

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("intro-played", "true");
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      {introComplete && (
        <>
          <Navbar />
          <ShowreelSection />
          <PortfolioSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
