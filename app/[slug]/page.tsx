/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { useDomain } from "../context/Domain";
import apiClient from "../lib/helper/apiClient";
import Navbar from "../components/ui/navbar/Navbar";
import FooterV1 from "../components/ui/footer/home/FooterV1";
import City from "../components/ui/city/City";

const DelhiTicketsHero: React.FC = () => {
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("En");
  const {
    currentDomain,
    setCurrentDomain,
    isLoading,
    setIsLoading,
    setDomainData,
    domainData,
  } = useDomain();

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
        const res = await apiClient.get(`/domain/${domain_name}`);
        setDomainData(res.data.data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setIsLoading(false); // end loading
      }
    };

    fetchData();
  }, [setCurrentDomain, setIsLoading]);

  console.log("dom", domainData);

  // Render full UI after loading
  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />

      <div className="relative w-full h-full">
        <City />
      </div>

      <FooterV1 />
    </div>
  );
};

export default DelhiTicketsHero;
