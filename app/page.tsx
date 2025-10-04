/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect, useState } from "react";
import FooterV1 from "./components/ui/footer/home/FooterV1";
import DelhiExperiences from "./components/ui/home/Experiences";
import Experiences1 from "./components/ui/home/Experience1";
import SubscribeCard from "./components/ui/home/SubscribeCard";
import Navbar from "./components/ui/navbar/Navbar";
import { useDomain } from "./context/Domain";
import { DomainRequests } from "./lib/api/ticket/domainRequest";
import { DomainData } from "./classes/DomainData";

// Each POI item
export interface POIItem {
  id: string;
  destination_City_Name: string;
  destination_Visiting_Places_List: any[]; // Can refine if you have structure
  destination_Latitude: number;
  destination_Visiting_Details: any[];
  destination_Landmark: string;
  destination_Highlights: string;
  destination_Slug_Name: string;
  destination_Country_Code: string;
  destination_Opening_Hours: string[];
  destination_General_Info: string;
  destination_Nerby_List: any[];
  destination_Nearby_Places_List: any[];
  destination_Place_Id: string;
  destination_Longitude: number;
  destination_State_Code: string;
  destination_Highlights_List: any[];
  destination_Address: string;
  destination_State_Name: string;
  destination_Info: string;
  destination_Rating_Details: {
    overall_Rating: number;
    rating_Distribution: Record<string, number>;
    total_Reviews: number;
  };
  destination_Visiting_Description: string;
  destination_Image_Object_List: any[];
  destination_Name: string;
  destination_Map_Url: string;
  destination_Meta_Object_Details: {
    meta_Title: string;
    meta_Description: string;
    meta_Keywords: string;
  };
  destination_Id: string;
  destination_Website_Url: string;
  destination_City_Slug_Name: string;
  destination_Near_Train_Station: any;
  destination_Country_Slug_Name: string;
  destination_City_Slug: string;
  destination_State_Slug_Name: string;
  destination_Category: string;
  destination_City_Code: string;
  destination_Business_Status: string;
  destination_Country_Name: string;
  destination_Tours_Count: number;
  destination_Pincode: string | number;
  destination_Phone: string;
  destination_Near_Bus_Station: any;
  destination_Visiting_Info: string;
  destination_Near_Airport: any;
  destination_Image_Url: string;
  destination_description: string;
}

const DelhiTicketsHero: React.FC = () => {
  const [currency] = useState<string>("INR");
  const [language] = useState<string>("En");
  const { setCurrentDomain, setIsLoading, setDomainData, domainData } =
    useDomain();
  const [poiItems, setPoiItems] = useState<POIItem[]>([]);
  const [formattedPoiItems, setFormattedPoiItems] = useState<
    [string, POIItem[]][]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine domain dynamically
        let domain_name = "delhitickets.com"; // fallback default
        if (typeof window !== "undefined") {
          const hostname = window.location.hostname;
          domain_name =
            hostname === "localhost"
              ? "delhitickets.com"
              : hostname.replace(/^www\./, "");
        }

        setCurrentDomain(domain_name);

        // ✅ Use typed API call
        const res = await DomainRequests.fetchDomainData({
          domain: domain_name,
        });

        if (res.status) {
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

   {domainData && (
  <DelhiExperiences
    setPoiItems={setPoiItems}
    poiItems={poiItems}
    setFormattedPoiItems={setFormattedPoiItems}
    formattedPoiItems={formattedPoiItems}
    domainData={domainData}   // ✅ guaranteed non-null
  />
)}


      <Experiences1
        formattedPoiItems={formattedPoiItems}
        domainData={domainData}
      />
      {/* <Promo />
      <Experiences2 />
      <  /> */}
      <SubscribeCard />
      <FooterV1 />
    </div>
  );
};

export default DelhiTicketsHero;
