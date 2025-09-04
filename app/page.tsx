"use client";

import React, { useState } from "react";
import DubaiExperiences from "./components/home/DubaiExperiences";
import FooterV1 from "./components/footer/home/FooterV1";

const DubaiTicketsHero: React.FC = () => {
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("En");

  return (
    <div className="w-full">
      {/* Navbar */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-[140px] flex justify-between items-center py-3">
          {/* Left: Logo + Branding */}
          <div className="flex items-center gap-3">
            <img
              src="/dubai-tickets-logo.png"
              alt="Dubai Tickets Logo"
              className="w-14 h-14 rounded"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-[#00796B]">Dubai</span>
              <span className="text-sm text-yellow-600 font-semibold">
                Tickets
              </span>
            </div>
            <span className="mx-2 text-gray-400">by</span>
            <img
              src="/BrandGroupLogo.svg"
              alt="Staybook Logo"
              className="h-6"
            />
          </div>

          {/* Right: Currency & Language */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
              <span className="text-base">₹</span> {currency}
            </button>
            <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
              <span className="text-base">🌐</span> {language}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full h-[677px]">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://storage.googleapis.com/images.staybook.in/activities/main-0.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full max-w-[1440px] mx-auto px-[140px] py-12 text-white">
            <h1 className="text-5xl font-bold">Dubai</h1>
            <p className="mt-3 text-lg leading-relaxed max-w-2xl">
              Experience the best of Dubai with its popular attractions.
              Starting with Burj Khalifa, then explore Aquaventure Atlantis
              Dubai. Don’t miss Future Dubai for an unforgettable experience.
              Explore these natural wonders and unique cultural experiences.
            </p>
            <a
              href="#"
              className="mt-4 inline-block text-white underline font-medium hover:text-gray-200"
            >
              See More.
            </a>
          </div>
        </div>
      </div>

      {/* Spacer Section */}
      <DubaiExperiences />
      <FooterV1 />
    </div>
  );
};

export default DubaiTicketsHero;
