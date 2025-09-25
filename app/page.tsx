/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import FooterV1 from "./components/ui/footer/home/FooterV1";
import DelhiExperiences from "./components/ui/home/Experiences";
import FlexBanner from "./components/ui/home/FlexBanner";
import Experiences1 from "./components/ui/home/Experience1";
import Promo from "./components/ui/home/Promo";
import Experiences2 from "./components/ui/home/Experience2";
import HomeAbout from "./components/ui/home/HomeAbout";
import SubscribeCard from "./components/ui/home/SubscribeCard";
import Navbar from "./components/ui/navbar/Navbar";
import apiClient from "./lib/helper/apiClient";
import { useDomain } from "./context/Domain";

const DelhiTicketsHero: React.FC = () => {
  const [currency, setCurrency] = useState<string>("INR");
  const [language, setLanguage] = useState<string>("En");
  const [heroData, setHeroData] = useState<any>({});
  const { currentDomain, setCurrentDomain } = useDomain();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Determine domain dynamically with fallback
        let domain_name = "delhitickets.com"; // fallback default

        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;

          if (hostname === "localhost") {
            domain_name = "delhitickets.com"; // local dev fallback
          } else {
            domain_name = hostname.replace(/^www\./, "");
          }
        }

        // Update context so other components can use it
        setCurrentDomain(domain_name);

        // Fetch data for the current domain
        const res = await apiClient.get(`/domain/${domain_name}`);
        setHeroData(res.data.data);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, [setCurrentDomain]);

  return (
    <div className="w-full ubuntu-light">
      {/* Navbar */}
      <Navbar currency={currency} language={language} />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh] lg:h-[70vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://storage.googleapis.com/images.staybook.in/activities/main-0.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {heroData?.domain_City || "Delhi"}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
              {heroData?.domain_Description ||
                `Experience the best of Delhi with its popular attractions. Starting with Burj Khalifa, then explore Aquaventure Atlantis Delhi. Don’t miss Future Delhi for an unforgettable experience. Explore these natural wonders and unique cultural experiences.`}
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <DelhiExperiences />
      <FlexBanner />
      <Experiences1 />
      <Promo />
      <Experiences2 />
      <HomeAbout />
      <SubscribeCard />
      <FooterV1 />
    </div>
  );
};

export default DelhiTicketsHero;
