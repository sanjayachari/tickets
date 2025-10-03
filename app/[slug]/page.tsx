/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { useDomain } from "../context/Domain";
import apiClient from "../lib/helper/apiClient";
import Navbar from "../components/ui/navbar/Navbar";
import FooterV1 from "../components/ui/footer/home/FooterV1";
import City from "../components/ui/city/City";
import { usePathname } from "next/navigation";

// 🔹 Firebase imports
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../lib/firebase"; // make sure you have firebase initialized

const db = getFirestore(app);

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

  const pathname = usePathname();
  const slug = pathname.split("/")[1]; // e.g. red-fort-delhi
  const [poiData, setPoiData] = useState<any>(null);
  const [tourPackages, setTourPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchDomain = async () => {
      try {
        let domain_name = "delhitickets.com"; // fallback default
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
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
      }
    };

    fetchDomain();
  }, [setCurrentDomain, setDomainData]);

  useEffect(() => {
    const fetchPoiAndTours = async () => {
      try {
        setIsLoading(true);

        // 🔹 Fetch POI document
        const poiRef = doc(db, "TOUR-AND-TRAVELS-INFORMATION", "IN", "POINT-OF-INTEREST-INFORMATION", slug);
        const poiSnap = await getDoc(poiRef);
        if (poiSnap.exists()) {
          setPoiData({ id: poiSnap.id, ...poiSnap.data() });
        } else {
          console.warn("No POI found for slug:", slug);
        }

        // 🔹 Fetch Tours that include this POI
        const tourRef = collection(db, "TOUR-AND-TRAVELS-INFORMATION", "IN", "TOUR-PACKAGE-INFORMATION");
        const q = query(tourRef, where("tour_Point_Of_Interest_Slug_List", "array-contains", slug));
        const tourSnap = await getDocs(q);

        const tours: any[] = [];
        tourSnap.forEach((doc) => {
          tours.push({ id: doc.id, ...doc.data() });
        });
        setTourPackages(tours);

      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchPoiAndTours();
  }, [slug, setIsLoading]);

  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />

      <div className="relative w-full h-full">
        {/* Example usage of fetched POI + Tours */}
        {isLoading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
          <div className="space-y-4">
            <City tours={tourPackages}
            poiData={poiData}
            /> {/* 🔹 Pass tourPackages into City */}
          </div>
        )}
      </div>

      <FooterV1 />
    </div>
  );
};

export default DelhiTicketsHero;
