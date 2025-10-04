/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../components/ui/navbar/Navbar";
import Banner from "../components/ui/attraction/Banner";
import apiClient from "../lib/helper/apiClient";
import { useDomain } from "../context/Domain";
import CategoryNav from "../components/ui/attraction/CategoryNav";
import DelhiExperiences from "../components/ui/home/Experiences";
import Attractions from "../components/ui/attraction/Attractions";
import CategoryType from "../components/ui/categoryTypes/CategoryTypeV0";
import PromoBanner from "../components/ui/attraction/PromoBanner";
import PromoBanner1 from "../components/ui/attraction/PromoBanner1";
import PromoBanner2 from "../components/ui/attraction/PromoBanner2";
import FooterV1 from "../components/ui/footer/home/FooterV1";
import Footer from "../components/ui/footer/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { POIItem } from "../page";
import Experiences1 from "../components/ui/home/Experience1";
import ExperiencesAttraction from "../components/ui/attraction/ExperienceAttraction";

const AttractionPage: React.FC = () => {
  const pathname = usePathname(); // e.g., "/category/attractions"
  const parts = pathname.split("/").filter(Boolean); // ["category", "attractions"]
  const categorySlug = parts[parts.length - 1]; // "attractions"

  const [currency] = useState<string>("INR");
  const [language] = useState<string>("English");
  const [pageData, setPageData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  const { currentDomain, setCurrentDomain, domainData, setDomainData } = useDomain();
  const [poiItems, setPoiItems] = useState<POIItem[]>([]);
 const [formattedPoiItems, setFormattedPoiItems] = useState<
    [string, POIItem[]][]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine domain dynamically
        let domain_name = "delhitickets.com"; // fallback
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
          domain_name = hostname === "localhost"
            ? "delhitickets.com"
            : hostname.replace(/^www\./, ""); // only domain name
        }

        setCurrentDomain(domain_name);

        // Strip https:// and .com for API route
        const format_domain_name = domain_name.replace(/^https?:\/\//, "").replace(/\.com$/, "");

        // ✅ 1st API call: domain data
        if (!domainData) {
          const res = await apiClient.get(`/domain/${format_domain_name}`);
          setDomainData(res.data.data);
          setPageData(res.data.data);
        } else {
          setPageData(domainData);
        }

        // ✅ 2nd API call: category data
        if (categorySlug) {
          const categoryRes = await apiClient.get(
            `/domain/${format_domain_name}/category/${categorySlug}`
          );
          setCategoryData(categoryRes.data.data);
        }

      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, [categorySlug, domainData, setCurrentDomain, setDomainData]);


    useEffect(() => {
      const fetchPOI = async () => {
        // setLoadingPOI(true);
        try {
          const poiRef = collection(
            db,
            "TOUR-AND-TRAVELS-INFORMATION/IN/POINT-OF-INTEREST-INFORMATION"
          );
          const q = query(poiRef, where("destination_City_Code", "==", "delhi"));
          const querySnapshot = await getDocs(q);
  
          const poiList: POIItem[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as any),
          }));
  
          setPoiItems(poiList);
        } catch (err: any) {
          console.error("Firebase fetch error:", err);
          // setErrorPOI(err.message);
        }
        // setLoadingPOI(false);
      };
  
      fetchPOI();
    }, []);

     // Group POIs by destination_Category, sort by count descending, and limit categories/items
      const poiByCategorySortedLimited = useMemo(() => {
        const grouped: Record<string, POIItem[]> = {};
    
        // Group by category
        poiItems.forEach((item) => {
          const category = item.destination_Category || "Uncategorized";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(item);
        });
    
        // Convert to array of [category, items] and sort by length descending
        const sorted = Object.entries(grouped)
          .sort((a, b) => b[1].length - a[1].length)
          .slice(0, 6) // Take only top 6 categories
          .map(
            ([category, items]) =>
              [category, items.slice(0, 6)] as [string, POIItem[]]
          ); // Limit each category to 6 items
    
        return sorted; // [[category, items], ...] sorted & limited
      }, [poiItems]);
    
      // Update state when the sorted & limited list changes
      useEffect(() => {
        setFormattedPoiItems(poiByCategorySortedLimited);
      }, [poiByCategorySortedLimited]);

  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />
      <Banner categoryData={categoryData} domainData={domainData} />
      <CategoryNav />
      {/* <Attractions topAttractions={topAttractions}  />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner1 />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner2 /> */}
      <ExperiencesAttraction formattedPoiItems={formattedPoiItems} domainData={domainData} />
      <Footer />
    </div>
  )
}

export default AttractionPage;
