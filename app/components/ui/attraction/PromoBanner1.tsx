"use client";

import React from "react";
import Image from "next/image";

const PromoBanner1 = () => {
  return (
    <div className="w-full relative">
      {/* Banner Image */}
      <div className="w-full h-[400px] relative">
        <Image
          src="/attractions/promo4.png"
          alt="Attractions Image"
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Keep things flexible
          </h2>
          <p className="max-w-2xl text-lg md:text-xl">
            Use Reserve Now &amp; Pay Later to secure the activities you dont want to
            miss without being locked in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner1;
