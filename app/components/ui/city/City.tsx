"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";
import TicketCard from "./CityCard";

const images = ["/city/city1.png", "/city/city1.png", "/city/city1.png"];

const City = ({ tours = [], poiData }: any) => {
  console.log("tours", tours);
  console.log("poiData", poiData);

  const [current, setCurrent] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-3">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {/* Left text */}
        <div className="flex flex-col justify-center p-2 md:p-4">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 leading-tight">
            <h2 className="text-lg font-semibold">
              {(
                poiData?.destination_City_Slug_Name?.replace(/-/g, " ") ??
                "POIs"
              ).replace(/^./, (str: string) => str.toUpperCase())}
            </h2>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-5 md:leading-6 line-clamp-4">
            {poiData?.destination_description ?? "Description not available"}
          </p>
        </div>

        {/* Right slider */}
        <div className="h-[200px] sm:h-[250px] md:h-[300px] relative flex items-center justify-center bg-gray-100 overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                <Image
                  src={img}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
          >
            <ChevronLeft className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
          >
            <ChevronRight className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 flex space-x-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  idx === current ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-6 gap-4">
        {/* Left side: results */}
        <div className="text-black font-medium text-sm sm:text-base">
          {(
            poiData?.destination_City_Slug_Name?.replace(/-/g, " ") ?? "POIs"
          ).replace(/^./, (str: string) => str.toUpperCase())}{" "}
          : {tours.length} results
        </div>

        {/* Right side: toggle (only visible on md+) */}
        <div className="hidden md:flex gap-2 border border-black rounded-full px-3 py-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded-full ${
              viewMode === "grid" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-full ${
              viewMode === "list" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <List className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Tickets Section */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {tours.map((ticket: any, idx: number) => (
          <TicketCard
            key={idx} 
            slug={ticket?.tour_Slug_Name}
            imageUrl={ticket?.tour_Image_Url ?? "/city/city1.png"}
            title={ticket?.tour_Name ?? "Untitled Tour"}
            description={ticket?.tour_Description ?? "No description"}
            rating={Number(ticket?.tour_Rating) || 0}
            reviews={Number(ticket?.tour_Review_Count) || 0}
            oldPrice={
              Number(ticket?.tour_Package_Cost_Breakup?.base_Price) || 0
            }
            newPrice={
              Number(ticket?.tour_Package_Cost_Breakup?.total_Price) || 0
            }
            discount={Number(ticket?.tour_Package_Cost_Breakup?.tax_Price) || 0}
            view={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default City;
