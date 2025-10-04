import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Item {
  image: string;
  title: string;
  offer?: string;
  description?: string;
  categoriesTypes?: string; // Added this field
}

interface CategorySectionProps {
  title: string;
  items: Item[];
  onSeeAll?: () => void;
  seeAllHref?: string;
}

export default function CategorySectionAttraction({
  title,
  items,
  onSeeAll,
  seeAllHref,
}: CategorySectionProps) {

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const category = items[0]?.categoriesTypes || title;
  const city = items[0]?.description?.split(",")?.pop()?.trim() || ""; 
  // takes last part after comma from description → city

  const categorySlug = slugify(category);
  const citySlug = slugify(city);

  const finalSlug = citySlug
    ? `${categorySlug}-in-${citySlug}`
    : categorySlug;


  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-black">{title}</h3>
        {onSeeAll && (
          <Link
            href={`/attractions/${finalSlug}`}
            onClick={onSeeAll}
            className="text-blue-600 text-sm font-semibold flex items-center gap-1"
          >
            See all <ChevronRight className="h-5 w-5 text-black" />
          </Link>
        )}
      </div>

      {/* Responsive scrollable container */}
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 no-scrollbar py-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-[230px] w-[150px] md:w-full rounded-2xl overflow-hidden shadow-md hover:shadow-md transition relative md:h-[335px]"
          >
            <Image
              src={item.image || "/fallback/fallback.png"}
              alt={item.title}
              height={400}
              width={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent p-4">
              <h3 className="text-white font-semibold line-clamp-2">{item.title}</h3>

              {item.offer && (
                <p className="text-sm inline-block rounded-full text-white">
                  {item.offer.split(" ").map((word, idx) => {
                    if (word.includes("%")) {
                      return (
                        <span
                          key={idx}
                          className="bg-[#088229] text-white px-2 py-1 rounded-tl-xl rounded-bl-sm rounded-br-xl rounded-tr-sm font-semibold"
                        >
                          {word} off
                        </span>
                      );
                    }
                    return <span key={idx}> {word} </span>;
                  })}
                </p>
              )}

              {item.description && (
                <p className="text-gray-200 text-sm mt-1 line-clamp-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
