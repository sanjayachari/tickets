/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
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

const AttractionPage: React.FC = () => {
  const pathname = usePathname(); // e.g., "/category/attractions"
  const parts = pathname.split("/").filter(Boolean); // ["category", "attractions"]
  const categorySlug = parts[parts.length - 1]; // "attractions"

  const [currency] = useState<string>("INR");
  const [language] = useState<string>("English");
  const [pageData, setPageData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  const { currentDomain, setCurrentDomain, domainData, setDomainData } = useDomain();

  const topAttractions = [
  { title: "Burj Khalifa", price: "from INR 21,999", image: "/main.png" },
  { title: "Dubai Frame", price: "from INR 21,999", image: "/main2.png" },
  { title: "Burj Al Arab", price: "from INR 21,999", image: "/main3.png" },
  { title: "Atlantis", price: "from INR 21,999", image: "/main4.png" },
  { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg" },
];


console.log('categorySlug____', categorySlug)
const bestExperiences = [
  {
    title: "Museum of Illusions",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main5.png",
  },
  {
    title: "Embarking in a 3-Day Adventure",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main6.png",
  },
  {
    title: "Explore Red Fort Skip the ticket",
    tag: "Ticket",
    rating: "4.5",
    price: "₹4,500/Per",
    image: "/main7.png",
  },
  {
    title: "Timezone Pacific Mall Garden",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main8.png",
  },
];

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

  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />
      <Banner categoryData={categoryData} domainData={domainData} />
      <CategoryNav />
      <Attractions topAttractions={topAttractions}  />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner1 />
      <CategoryType bestExperiences={bestExperiences} title="Top Attractions in delhi" />
      <PromoBanner2 />
      <Footer />
    </div>
  )
}

export default AttractionPage;
