"use client";

import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <div className="bg-[#FDF8E6] py-3 m-4 rounded-3xl">
      <div className="w-full max-w-[1440px] mx-auto py-14 px-4 sm:px-6 md:px-12 lg:px-20 flex gap-3">
        {/* Card 1 */}
        <div className="flex-1 relative h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo1.png"
            alt="Promo 1"
            fill
            className="object-cover rounded-xl"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6 gap-3">
            <p className="text-sm font-medium">Enjoy these amazing Tour</p>
            <p className="font-bold text-lg">
              Best TOUR
              <br />
              deals
            </p>
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium shadow">
              See Activities
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 relative h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo2.png"
            alt="Promo 2"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6 gap-3">
            <p className="text-sm font-medium">
              Don't forget to check out these activities
            </p>
            <p className="font-bold text-lg">
              All Time Favourite
              <br />
              Activities
            </p>
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium shadow">
              See Activities
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex-1 relative h-[300px] rounded-xl overflow-hidden">
          <Image
            src="/attractions/promo3.png"
            alt="Promo 3"
            fill
            className="object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6 gap-3">
            <p className="text-sm font-medium">20% Discount</p>
            <p className="font-bold text-lg">
              Discover the wow
              <br />
              Activities
            </p>
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium shadow">
              See Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
