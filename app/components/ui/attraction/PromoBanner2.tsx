"use client";

import React from "react";
import Image from "next/image";

const PromoBanner2 = () => {
  return (
    <div className="bg-[#f8e8db] py-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Special discount on your first Booking
          </h2>
          <p className="text-lg text-gray-700 max-w-md">
            Limited time offer, don't miss the opportunity{" "}
          </p>
          <button className="bg-[#EB662B] text-white px-6 py-3 rounded-md font-bold w-fit">
            Signup Now
          </button>
        </div>

        {/* Right Image */}
        <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden">
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
