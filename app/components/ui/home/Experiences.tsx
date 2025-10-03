/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { DomainRequests } from "@/app/lib/api/ticket/domainRequest";
import { DomainErrorResponse } from "@/app/lib/api/ticket/requestParams";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { POIItem } from "@/app/page";
import { DomainData } from "@/app/classes/DomainData";

const categoriesTypes = [
  { name: "All", icon: "/icons/grid_view.png" },
  { name: "Landmarks", icon: "/icons/landmark.png" },
  { name: "Museums", icon: "/icons/museum.png" },
  { name: "Park", icon: "/icons/themepark.png" },
  { name: "Zoo", icon: "/icons/zoo.png" },
  { name: "Monument", icon: "/icons/monument.png" },
  { name: "Water park", icon: "/icons/waterpark.png" },
];

interface Category {
  category_Id: number;
  category_Slug: string;
  category_Domain_Name: string;
  category_Name: string;
  category_Title?: string;
  category_Info?: string;
  category_Description?: string;
  category_Image_Url?: string;
  category_Meta_Data?: {
    title?: string;
    keywords?: string;
    description?: string;
    image_url?: string;
    canonical_url?: string;
  };
  category_Availability?: boolean;
  category_Is_Top_Attraction?: boolean;
  category_Is_Popular_Category?: boolean;
  category_Created_At?: string;
  category_Updated_At?: string;
}

interface TourItem {
  id: string;
  tour_Name: string;
  tour_Covered_City: string[];
  tour_Image_Url?: string;
  [key: string]: any;
}

interface ExperiencesProps {
  setPoiItems: React.Dispatch<React.SetStateAction<POIItem[]>>;
  poiItems: POIItem[];
  setFormattedPoiItems: React.Dispatch<React.SetStateAction<any>>;
  formattedPoiItems: [string, POIItem[]][];
  domainData: DomainData | null;
}

const Experiences: React.FC<ExperiencesProps> = ({
  setPoiItems,
  poiItems,
  setFormattedPoiItems,
  formattedPoiItems,
  domainData
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const response = await DomainRequests.fetchCategoryData({
        domain: "delhitickets", // domain slug
      });
      console.log("response____", response);
      if (response.status && response.data) {
        // assuming categories are in response.data.categories
        const domainCategories: Category[] = response.data;
        console.log("domainCategories", domainCategories);
        setCategories(domainCategories);
      } else {
        const err = response as DomainErrorResponse;
        setError(err.message);
      }

      setLoading(false);
    };

    fetchCategories();
  }, []);

  const [loadingPOI, setLoadingPOI] = useState<boolean>(true);
  const [errorPOI, setErrorPOI] = useState<string | null>(null);

  // Fetch POI (your existing useEffect)
  useEffect(() => {
    const fetchPOI = async () => {
      setLoadingPOI(true);
      try {
        const poiRef = collection(
          db,
          "TOUR-AND-TRAVELS-INFORMATION/IN/POINT-OF-INTEREST-INFORMATION"
        );
        const q = query(poiRef, where("destination_City_Code", "==", `${domainData?.domain_City ?? "delhi"}}`));
        const querySnapshot = await getDocs(q);

        const poiList: POIItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        console.log("poiList____", poiList);
        setPoiItems(poiList);
      } catch (err: any) {
        console.error("Firebase fetch error:", err);
        setErrorPOI(err.message);
      }
      setLoadingPOI(false);
    };

    fetchPOI();
  }, []);

  const [tourItems, setTourItems] = useState<TourItem[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [errorTours, setErrorTours] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      setLoadingTours(true);
      try {
        const toursRef = collection(
          db,
          "TOUR-AND-TRAVELS-INFORMATION/IN/TOUR-PACKAGE-INFORMATION"
        );

        // Firestore array-contains query
        const q = query(
          toursRef,
          where("tour_City_Covered", "array-contains", "Delhi"),
          limit(4)
        );

        const querySnapshot = await getDocs(q);

        const toursList: TourItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        console.log("toursList____", toursList);
        setTourItems(toursList);
      } catch (err: any) {
        console.error("Firebase fetch tours error:", err);
        setErrorTours(err.message);
      }
      setLoadingTours(false);
    };
    fetchTours();
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
    <div className="bg-white">
      {/* Top Attractions */}
      <section className="bg-[#F1F6FF] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 via-green-600 to-yellow-500 bg-clip-text text-transparent">
              Top Attraction in {domainData && domainData.domain_City || "Delhi"}
            </h2>
            <Link
              href="/attractions"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              See all <ChevronRight className="h-5 w-5 text-black" />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 no-scrollbar">
            {poiByCategorySortedLimited.length > 0 &&
              poiByCategorySortedLimited[0][1].length > 0 &&
              poiByCategorySortedLimited[0][1].map((poi) => (
                <div
                  key={poi.id}
                  className="relative h-[230px] w-[150px] md:h-[300px] md:w-[240px] rounded-xl overflow-hidden shadow flex-shrink-0"
                >
                  <img
                    src={poi.destination_Image_Url || "/fallback/fallback.png"}
                    alt={poi.destination_Image_Url}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold line-clamp-2">
                      {poi.destination_City_Slug
                        ? poi.destination_City_Slug
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        : ""}
                    </h3>

                    {poi.destination_Business_Status && (
                      <p className="text-gray-200 text-sm">
                        {poi.destination_Business_Status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F1F6FF] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black bg-clip-text">
              Popular categories
            </h2>
            <Link
              href="/attractions"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              See all <ChevronRight className="h-5 w-5 text-black" />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 no-scrollbar">
            {categories.length > 0 ? (
              categories.map((item) => (
                <div
                  key={item.category_Slug}
                  className="relative h-[230px] w-[150px] md:h-[300px] md:w-[240px] rounded-xl overflow-hidden shadow flex-shrink-0"
                >
                  <img
                    src={item.category_Image_Url}
                    alt={item.category_Name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold">
                      {item.category_Name}
                    </h3>
                    {item.category_Title && (
                      <p className="text-gray-200 text-sm">
                        {item.category_Title}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No categories available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Best Experiences */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              Best experiences in {domainData &&  domainData.domain_City || "Delhi"}
            </h2>
            <Link
              href="/attractions"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              See all <ChevronRight className="h-5 w-5 text-black" />
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 no-scrollbar py-2 px-1">
            {tourItems.length > 0 &&
              tourItems.slice(0, 6).map((tour, i) => (
                <Link
                  href={`/things-to-do/${tour.id || `/attractions`}`}
                  key={tour.id}
                  className="flex-shrink-0 h-[400px] w-64 md:w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  <img
                    src={tour.tour_Image_Url || "/fallback/fallback.png"} // fallback if no image
                    alt={tour.tour_Name || "Tour"}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        {tour.tour_Tag || "Ticket"}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold">
                          {tour.tour_Rating || "N/A"}
                        </p>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mb-1" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-black line-clamp-2 break-words">
                      {tour.tour_Name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        {tour.tour_Type || "Unknown"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 text-sm">
                        <span className="text-red-300 line-through">
                          {(
                            tour.tour_Package_Cost_Breakup.total_Price * 1.05
                          ).toFixed(0)}
                        </span>
                      </p>
                      <div className="font-semibold">
                        {tour.tour_Package_Cost_Breakup.total_Price || "-"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          {/* Category buttons */}
          <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar px-2">
            {formattedPoiItems.map(([category], i) => {
              const matchedCat = categoriesTypes.find(
                (cat) => cat.name.toLowerCase() === category.toLowerCase()
              );
              const icon = matchedCat
                ? matchedCat.icon
                : "/fallback/fallback.png";

              return (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-sm font-medium hover:bg-gray-100 text-black flex-shrink-0 ${
                    selectedCategory === category
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={icon}
                    alt={category}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {category}
                </button>
              );
            })}
          </div>

          {/* Show items for selected category */}
          {formattedPoiItems.map(([category, items], idx) =>
            category === selectedCategory ? (
              <div key={idx}>
                {/* You can reuse CategorySection here */}
                {/* Example simple output */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((poi, i) => (
                    <div key={i} className="rounded-lg shadow p-3">
                      <Image
                        src={poi.destination_Image_Url || "/icons/landmark.png"}
                        alt={poi.id}
                        width={300}
                        height={200}
                        className="w-full h-[160px] object-cover rounded"
                      />
                      <h4 className="mt-2 font-semibold">{poi.id}</h4>
                      <p className="text-sm text-gray-500">
                        {poi.destination_Landmark}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>
    </div>
  );
};

export default Experiences;
