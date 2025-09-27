"use client";

import React, { useState } from "react";
import { Globe, FerrisWheel, Landmark, PawPrint } from "lucide-react";

const CategoryNav: React.FC = () => {
  const navs = [
    { type: "All", icon: Globe },
    { type: "Attractions", icon: FerrisWheel },
    { type: "Museums", icon: Landmark },
    { type: "Zoos", icon: PawPrint },
    { type: "Theme Parks", icon: FerrisWheel },
  ];

  const [selected, setSelected] = useState<string>("All");

  return (
    <div className="bg-[#F1F6FF] py-2">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
          {navs.map((item) => {
            const Icon = item.icon;
            const isActive = selected === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setSelected(item.type)}
                className={`flex items-center gap-1 flex-shrink-0 border rounded-lg px-3 py-1 text-sm whitespace-nowrap
                  ${isActive ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 hover:bg-gray-50"}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-black"}`} />
                {item.type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
