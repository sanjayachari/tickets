import React from "react";

const InfiniteCategory = ({ items, cityDisplay, category }: any) => {
  const displayItems = items.slice(0, 4); // only 4 cards

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex gap-4 py-3">
      {displayItems.map((exp: any, i: number) => (
        <div
          key={i}
          className="flex-1 rounded-xl overflow-hidden shadow-md hover:shadow-md transition bg-white"
        >
          <img
            src={exp.image || "/fallback/fallback.png"}
            alt={exp.destination_Name}
            className="h-40 w-full object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-500">
              {exp.destination_Category || category}
            </p>
            <h3 className="font-semibold text-lg text-black line-clamp-1">
              {exp.destination_Name}
            </h3>
            {exp.rating && (
              <p className="text-yellow-500 text-sm">★ {exp.rating}</p>
            )}
            {exp.price && (
              <p className="text-gray-700 text-sm">from: {exp.price}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteCategory;
