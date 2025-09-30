/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { useDomain } from "../context/Domain";
import Navbar from "../components/ui/navbar/Navbar";
import FooterV1 from "../components/ui/footer/home/FooterV1";

const DelhiTicketsHero: React.FC = () => {
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("En");


  // Render full UI after loading
  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />

      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh] lg:h-[70vh]">
    
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12 text-white">
          hhh
          </div>
        </div>
      </div>

   
      <FooterV1 />
    </div>
  );
};

export default DelhiTicketsHero;
