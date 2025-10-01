/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDomain } from "@/app/context/Domain";
import apiClient from "@/app/lib/helper/apiClient";
import Banner from "@/app/components/ui/attraction/Banner";
import Navbar from "@/app/components/ui/navbar/Navbar";
import CategoryTypeV1 from "@/app/components/ui/categoryTypes/CategoryTypeV1";
import InfiniteCategory from "@/app/components/ui/categoryTypes/InfiniteCategory";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { POIItem } from "@/app/page";

const AttractionPage: React.FC = () => {
  const pathname = usePathname(); // e.g., "/category/attractions"
  const parts = pathname.split("/").filter(Boolean); // ["category", "attractions"]
  const categorySlug = parts[0]; // "attractions"
  console.log("parts", parts);
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("English");
  const [pageData, setPageData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  const { currentDomain, setCurrentDomain, domainData, setDomainData } =
    useDomain();

  // Local loading states for both API calls
  const [domainLoading, setDomainLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);

  const topAttractions = [
    { title: "Burj Khalifa", price: "from INR 21,999", image: "/main.png" },
    { title: "Dubai Frame", price: "from INR 21,999", image: "/main2.png" },
    { title: "Burj Al Arab", price: "from INR 21,999", image: "/main3.png" },
    { title: "Atlantis", price: "from INR 21,999", image: "/main4.png" },
    { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg" },
  ];

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
          domain_name =
            hostname === "localhost"
              ? "delhitickets.com"
              : hostname.replace(/^www\./, ""); // only domain name
        }

        setCurrentDomain(domain_name);

        // Strip https:// and .com for API route
        const format_domain_name = domain_name
          .replace(/^https?:\/\//, "")
          .replace(/\.com$/, "");

        // ✅ 1st API call: domain data
        if (!domainData) {
          setDomainLoading(true);
          const res = await apiClient.get(`/domain/${format_domain_name}`);
          setDomainData(res.data.data);
          setPageData(res.data.data);
          setDomainLoading(false);
        } else {
          setPageData(domainData);
          setDomainLoading(false);
        }

        // ✅ 2nd API call: category data
        if (categorySlug) {
          setCategoryLoading(true);
          const categoryRes = await apiClient.get(
            `/domain/${format_domain_name}/category/${categorySlug}`
          );
          console.log("categoryRes", categoryRes);
          setCategoryData(categoryRes.data.data);
          setCategoryLoading(false);
        }
      } catch (err) {
        console.error("API Error:", err);
        setDomainLoading(false);
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, domainData, setCurrentDomain, setDomainData]);

  const categoriesTypes = [
    {
      name: "Landmark",
      icon: "url",
    },
    {
      name: "Museums",
      icon: "url",
    },
    {
      name: "Theme Park",
      icon: "url",
    },
  ];




  const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const getPOIsFromUrl = async (url: string) => {
  try {
    // ✅ Extract last segment: museum-in-delhi
    const lastSegment = url.split("/").filter(Boolean).pop() || "";

    // ✅ Split category & city
    const parts = lastSegment.split("-in-");
    const categoryRaw = parts[0] || ""; // "museum"
    const cityRaw = parts[1] || ""; // "delhi"

    // ✅ Proper formats
    const category = capitalizeFirst(categoryRaw); // "Museum"
    const city = cityRaw.toLowerCase(); // "delhi"
    const cityDisplay = capitalizeFirst(cityRaw); // "Delhi"

    // ✅ Firestore query
    const poiRef = collection(
      db,
      "TOUR-AND-TRAVELS-INFORMATION",
      "IN",
      "POINT-OF-INTEREST-INFORMATION"
    );

    console.log('___category' , category)

    const q = query(
      poiRef,
      where("destination_Category", "==", category), // "Museum"
      where("destination_City_Code", "==", city) // "delhi"
    );

    const querySnapshot = await getDocs(q);

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return { cityDisplay, category, data };
  } catch (error) {
    console.error("Error fetching POIs:", error);
    return null;
  }
};

const [poiItems , setPoiItems] = useState<POIItem[]>([])
const [cityDisplay , setCityDisplay] = useState<string>('')
const [category , setCategory] = useState<string>('')

useEffect(() => {
    const fun = async () => {
      const data = await getPOIsFromUrl(window.location.href);
      if (data) {
        console.log('dat' , data)
        setPoiItems(data.data);
        setCityDisplay(data.cityDisplay);
        setCategory(data.category);
      }
    }

    fun()
} , [])

  return (
    <div className="w-full ubuntu-light">
      <Navbar currency={currency} language={language} />
      <Banner categoryData={categoryData} domainData={domainData} />
      <CategoryTypeV1 />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-3">
        <div className="w-full">
          <div className="flex items-center justify-between mb-4 w-full">
            <h2 className="text-2xl font-bold text-black">Top {category}s</h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Filter"
              >
                <Image
                  src="/icons/filter_1.png"
                  alt="Filter"
                  width={24} // icon width
                  height={24} // icon height
                  className="object-contain"
                />
              </button>
              <div className="flex gap-2 border rounded-md p-1">
                <div className="bg-emerald-800 text-white px-6 py-1 rounded-md font-bold">
                  Ticket
                </div>
                <div className=" text-black px-6 py-1 rounded-md font-bold">
                  Tour
                </div>
              </div>
            </div>
          </div>{" "}

        </div>
      </div>

       <div className="p-4 w-full">
  <InfiniteCategory items={poiItems} cityDisplay={cityDisplay} category={category} />
</div>

              {/* <InfiniteCategory />
          <InfiniteCategory /> */}
          <div className="flex justify-center items-center py-4">
            <div className="w-[200px] p-2 rounded-3xl flex justify-center items-center">
              Show more
            </div>
          </div>
    </div>
  );
};

export default AttractionPage;
