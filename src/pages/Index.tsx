import { useState, useCallback, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ShowreelSection from "@/components/ShowreelSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const IntroAnimation = lazy(() => import("@/components/IntroAnimation"));

const Index = () => {
  const hasPlayed = sessionStorage.getItem("intro-played") === "true";
  const [introComplete, setIntroComplete] = useState(hasPlayed);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("intro-played", "true");
    setIntroComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <IntroAnimation onComplete={handleIntroComplete} />
      </Suspense>
      <Navbar />
      <ShowreelSection />
      <PortfolioSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
