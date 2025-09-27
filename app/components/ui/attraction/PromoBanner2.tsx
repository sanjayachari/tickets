"use client";

import React from "react";
import Image from "next/image";

const PromoBanner2 = () => {
  return (
    <div className="bg-[#f8e8db] py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12">
        {/* Left Content */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
            Special discount on your first Booking
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-md">
            Limited time offer, don’t miss the opportunity
          </p>
          <button className="bg-[#EB662B] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold sm:font-bold w-fit text-sm sm:text-base">
            Signup Now
          </button>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden">
          <Image
            src="/attractions/promo6.png"
            alt="Attractions Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner2;
