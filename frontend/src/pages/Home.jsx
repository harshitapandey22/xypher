import React from "react";
import GoogleTranslate from "../components/GoogleTranslate";
import Header from "../components/Header";
import HeroSection from "../components/Hero";
import AboutUs from "../components/AboutUs";
import FeatureSection from "../components/Features";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden scrollbar-hide">
      <GoogleTranslate />
      <div className="absolute top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-8 py-4 bg-transparent">
          <Header />
        </div>
      </div>
      <main className="pt-[80px]">
        <HeroSection />
        <AboutUs />
        <FeatureSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}