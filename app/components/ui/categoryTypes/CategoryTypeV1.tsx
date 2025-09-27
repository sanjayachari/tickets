"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Item {
  title: string;
  iconUrl: string; // URL for the icon
}

const CategoryTypeV1: React.FC = () => {
  // Default categories with image icons
  const categories: Item[] = [
    { title: "Attractions", iconUrl: "https://res.cloudinary.com/djs3qzov4/image/upload/v1758954574/museum_icon_v2aeus.png" },
    { title: "Museums", iconUrl: "https://res.cloudinary.com/djs3qzov4/image/upload/v1758954574/themepark_icon_zvess5.png" },
    { title: "Zoos", iconUrl: "https://res.cloudinary.com/djs3qzov4/image/upload/v1758954574/themepark_icon_zvess5.png" },
    { title: "Theme Parks", iconUrl: "https://res.cloudinary.com/djs3qzov4/image/upload/v1758954574/landmark_icon_ykssj0.png" },
  ];

  const [selected, setSelected] = useState<string>("All");

  return (
    <section className="py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {categories.map((item, index) => {
            const isSelected = selected === item.title;
            return (
              <button
                key={index}
                onClick={() => setSelected(item.title)}
                className={` h-[130px] w-[130px] flex flex-col justify-center items-center gap-2 px-4 py-2 rounded-lg border transition ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 relative">
                  <Image src={item.iconUrl} alt={item.title} fill style={{ objectFit: "contain" }} />
                </div>
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryTypeV1;
