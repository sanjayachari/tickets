"use client";

import React, { useState } from "react";

const CategoryNav: React.FC = () => {
  const navs = [
    { type: "All", icon: "FaGlobeAmericas" },
    { type: "Attractions", icon: "FaFerrisWheel" },
    { type: "Museums", icon: "FaLandmark" },
    { type: "Zoos", icon: "FaPaw" },
    { type: "Theme Parks", icon: "FaFerrisWheel" },
  ];

  // ✅ State to track selected nav, default is "All"
  const [selected, setSelected] = useState<string>("All");

  return (
      <div className="bg-[#F1F6FF]">

    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex gap-3 items-center py-3">
      {navs.map((item) => {
        const Icon = item.icon;
        const isActive = selected === item.type;
        return (
          <button
            key={item.type}
            onClick={() => setSelected(item.type)}
            className={`flex items-center gap-1 border rounded-lg px-3 py-1 text-sm 
              ${isActive ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 hover:bg-gray-50"}`}
          >
            {/* <Icon className={isActive ? "text-white" : "text-black"} /> */}
            {item.type}
          </button>
        );
      })}
        
      </div>
    </div>
  );
};

export default CategoryNav;
