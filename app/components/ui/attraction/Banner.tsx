/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import React from "react";
import Image from "next/image";

interface BannerProps {
  categoryData: any;
  domainData: any;
}

const Banner = ({ categoryData, domainData }: BannerProps) => {
  const imageUrl = categoryData?.category_Image_Url || "";
  const categoryName = categoryData?.category_Name || "";
  const domainName = domainData?.domain_City || domainData?.domain_Name || "";

  return (
    <div className="w-full relative">
      {/* Banner Image */}
      <div className="w-full h-[200px] relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={categoryName || "Banner Image"}
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Top Breadcrumb */}
      <div className="absolute top-4 left-0 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-3 text-white rounded">
          <span className="text-sm">
            {domainName} / {categoryName}
          </span>
        </div>
      </div>

      {/* Bottom Category Name */}
      <div className="absolute bottom-4 left-0 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex justify-between items-center py-3 text-white rounded">
          <h1 className="text-lg sm:text-xl md:text-3xl font-semibold">
            {categoryName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
