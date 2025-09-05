import React from "react";

interface GridItem {
  image: string;
  title: string;
  subtitle?: string;   // e.g. offer, tag
  rating?: number | string;
  price?: string;
}

interface GridSectionProps {
  title: string;
  items: GridItem[];
  columns?: string; // tailwind grid cols e.g. "grid-cols-2 md:grid-cols-3"
  onSeeAll?: () => void;
}

export default function GridSection({
  title,
  items,
  columns = "grid-cols-2 md:grid-cols-4", // default 4 on desktop
  onSeeAll,
}: GridSectionProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-blue-600 text-sm font-semibold flex items-center gap-1"
          >
            See all <span>›</span>
          </button>
        )}
      </div>

      {/* Grid */}
      <div className={`grid ${columns} gap-6`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              {item.subtitle && (
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              )}
              <h3 className="font-semibold text-lg text-black">{item.title}</h3>
              {item.rating && (
                <p className="text-yellow-500 text-sm">★ {item.rating}</p>
              )}
              {item.price && (
                <p className="text-gray-700 text-sm">from: {item.price}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
