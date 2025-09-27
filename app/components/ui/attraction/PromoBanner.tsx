"use client";

import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <div className="bg-[#FDF8E6] py-3 m-4 rounded-3xl">
      <div className="w-full max-w-[1440px] mx-auto py-10 sm:py-14 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Card 1 */}
        <div className="w-full md:flex-1 relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo1.png"
            alt="Promo 1"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-4 sm:p-6 gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm font-medium">Enjoy these amazing Tour</p>
            <p className="font-bold text-base sm:text-lg leading-snug">
              Best TOUR
              <br />
              deals
            </p>
            <button className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium shadow">
              See Activities
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:flex-1 relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo2.png"
            alt="Promo 2"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-4 sm:p-6 gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm font-medium">
              Dont forget to check out these activities
            </p>
            <p className="font-bold text-base sm:text-lg leading-snug">
              All Time Favourite
              <br />
              Activities
            </p>
            <button className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium shadow">
              See Activities
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full md:flex-1 relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo3.png"
            alt="Promo 3"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-4 sm:p-6 gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm font-medium">20% Discount</p>
            <p className="font-bold text-base sm:text-lg leading-snug">
              Discover the wow
              <br />
              Activities
            </p>
            <button className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium shadow">
              See Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
