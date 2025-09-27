"use client";

import { useDomain } from "@/app/context/Domain";
import Link from "next/link";
import React, { useState } from "react";

interface NavbarProps {
  currency: string;
  language: string;
}

const Navbar: React.FC<NavbarProps> = ({ currency, language }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentDomain } = useDomain(); // ✅ get current domain

  // ✅ Domain-specific logos
  const logos: { [key: string]: string[] } = {
    "delhitickets.com": [
      "/delhilogo.png",
      "/DelhiTickets.png",
      "/brand_logo_staybook.gif",
    ],
    "agratickets.com": [
      "/agralogo.png",
      "/AgraTickets.png",
      "/brand_logo_staybook.gif",
    ],
  };

  const currentLogos = logos[currentDomain] || [
    "/default_logo.png",
    "/DefaultTickets.png",
    "/brand_logo_staybook.gif",
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-3">
        {/* Left: Logo + Branding */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {currentLogos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Logo ${idx}`}
              className="h-8 sm:h-12 rounded"
            />
          ))}
        </Link>

        {/* Right: Currency & Language */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 text-black">
          <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
            <span className="text-black">₹</span> {currency}
          </button>
          <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1 text-sm hover:bg-gray-50">
            <span className="text-black">🌐</span> {language}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none p-2 border border-gray-300 rounded-lg"
          >
            {isMobileMenuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2">
          <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
            <span className="text-black">₹</span> {currency}
          </button>
          <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
            <span className="text-black">🌐</span> {language}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
