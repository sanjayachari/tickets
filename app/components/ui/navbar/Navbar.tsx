"use client";
import React, { useState } from "react";

interface NavbarProps {
  currency: string;
  language: string;
}

const Navbar: React.FC<NavbarProps> = ({ currency, language }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-3">
        {/* Left: Logo + Branding */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <img
            src="/delhilogo.png"
            alt="Delhi Tickets Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded"
          />
          <img
            src="/DelhiTickets.png"
            alt="Delhi Tickets Text Logo"
            className="h-8 sm:h-10"
          />
          <img
            src="/brand_logo_staybook.gif"
            alt="Staybook Logo"
            className="h-12 sm:h-16"
          />
        </div>

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
