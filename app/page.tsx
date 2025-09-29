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
import { useDomain } from "./context/Domain";
import { DomainRequests } from "./lib/api/ticket/domainRequest";
import { DomainData } from "./classes/DomainData";

const DelhiTicketsHero: React.FC = () => {
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("En");
  const { setCurrentDomain, setIsLoading , setDomainData , domainData } = useDomain();

useEffect(() => {
  const fetchData = async () => {
    try {
      // Determine domain dynamically
      let domain_name = "delhitickets.com"; // fallback default
      if (typeof window !== "undefined") {
        const hostname = window.location.hostname;
        console.log("hostname", hostname);
        domain_name =
          hostname === "localhost"
            ? "delhitickets.com"
            : hostname.replace(/^www\./, "");
      }

      setCurrentDomain(domain_name);

      // ✅ Use typed API call
      const res = await DomainRequests.fetchDomainData({ domain: domain_name });

      if (res.status) {
        console.log("domain data", res.data);
        setDomainData(res.data as DomainData);
      } else {
        console.error("Domain API Error:", res.error);
      }
    } catch (err) {
      console.error("Unexpected API Error:", err);
    } finally {
      setIsLoading(false); // end loading
    }
  };

  fetchData();
}, [setCurrentDomain, setIsLoading]);

  // Render full UI after loading
  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />

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
              {domainData?.domain_City}
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">
              {domainData?.domain_Description}
            </p>
          </div>
        </div>
      </div>

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
