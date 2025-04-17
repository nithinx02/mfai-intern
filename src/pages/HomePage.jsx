import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import AnalysisSection from "../components/AnalysisSection";
import AboutUsSection from "../components/AboutUsSection";
import HowItWorksSection from "../components/HowItWorksSection";

function HomePage() {
  const [opacity, setOpacity] = useState(false);

  useEffect(() => {
    setOpacity(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        opacity ? "opacity-100" : "opacity-0"
      }`}
    >
      <NavBar />
      <Header />
      <FeaturesSection />
      <AnalysisSection />
      <HowItWorksSection />
      <AboutUsSection />
      <Footer />
    </div>
  );
}

export default HomePage;
