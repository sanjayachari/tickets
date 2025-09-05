import React from "react";

interface Item {
  image: string;
  title: string;
  offer?: string;
}

interface CategorySectionProps {
  title: string;
  items: Item[];
  onSeeAll?: () => void; // optional callback
}

export default function CategorySection({ title, items, onSeeAll }: CategorySectionProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-blue-600 text-sm font-semibold flex items-center gap-1"
          >
            See all <span>›</span>
          </button>
        )}
      </div>

      {/* Responsive scrollable container */}
      <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:gap-6 no-scrollbar py-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 sm:w-56 md:w-full rounded-xl overflow-hidden shadow-md hover:shadow-md transition relative h-[260px]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">{item.title}</h3>
              {item.offer && (
                <p className="text-green-400 text-sm">{item.offer}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
