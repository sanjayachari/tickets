/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// 🔹 Firebase imports
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useDomain } from "@/app/context/Domain";
import { app } from "@/app/lib/firebase";
import apiClient from "@/app/lib/helper/apiClient";
import Navbar from "../navbar/Navbar";
import City from "../city/City";
import FooterV1 from "../footer/home/FooterV1";

const db = getFirestore(app);

interface DynamicPoiPageProps {
  params?: { slug?: string };
  subDomain?: string; // optional subdomain
}

const DynamicPoiPage: React.FC<DynamicPoiPageProps> = ({ params, subDomain }) => {
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("En");
    console.log('=======params==' , params , subDomain)
  const { currentDomain, setCurrentDomain, isLoading, setIsLoading, setDomainData } = useDomain();
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | undefined>(params?.slug || subDomain);

  const [poiData, setPoiData] = useState<any>(null);
  const [tourPackages, setTourPackages] = useState<any[]>([]);

  // 🔹 Determine slug with POI + City
// 🔹 Determine slug with POI + City
useEffect(() => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname.replace(/^www\./, ""); 
    const parts = hostname.split("."); // ["taj-mahal", "agratickets", "com"]

    if (parts.length > 2) {
      const poiPart = parts[0]; // e.g. taj-mahal
      const rootDomain = parts.slice(-2).join("."); // agratickets.com
      const city = rootDomain.replace("tickets.com", ""); // agratickets.com -> agra

      const fullSlug = `${poiPart}-${city}`; // taj-mahal-agra
      if (slug !== fullSlug) {
        setSlug(fullSlug);
      }
    } else {
      // fallback for non-subdomain case
      const pathSlug = pathname.split("/")[1];
      if (slug !== pathSlug) {
        setSlug(pathSlug);
      }
    }
  }
}, [pathname]);


  // 🔹 Fetch domain info
  useEffect(() => {
    const fetchDomain = async () => {
      try {
        let domain_name = "delhitickets.com";
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
          domain_name = hostname === "localhost" ? "delhitickets.com" : hostname.replace(/^www\./, "");
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

  console.log('slug__' , slug)
  // 🔹 Fetch POI & Tours
  useEffect(() => {
    const fetchPoiAndTours = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);

        // Fetch POI doc
        const poiRef = doc(db, "TOUR-AND-TRAVELS-INFORMATION", "IN", "POINT-OF-INTEREST-INFORMATION", slug);
        const poiSnap = await getDoc(poiRef);
        if (poiSnap.exists()) {
          setPoiData({ id: poiSnap.id, ...poiSnap.data() });
        } else {
          console.warn("No POI found for slug:", slug);
        }

        // Fetch Tours linked to this POI
        const tourRef = collection(db, "TOUR-AND-TRAVELS-INFORMATION", "IN", "TOUR-PACKAGE-INFORMATION");
        const q = query(tourRef, where("tour_Point_Of_Interest_Slug_List", "array-contains", slug));
        const tourSnap = await getDocs(q);

        const tours: any[] = [];
        tourSnap.forEach((doc) => tours.push({ id: doc.id, ...doc.data() }));
        setTourPackages(tours);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoiAndTours();
  }, [slug, setIsLoading]);

  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />

      <div className="relative w-full h-full">
        {isLoading ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
          <div className="space-y-4">
            <City tours={tourPackages} poiData={poiData} />
          </div>
        )}
      </div>

      <FooterV1 />
    </div>
  );
};

export default DynamicPoiPage;
