import Link from "next/link";
import React from "react";

interface Item {
  title: string;
  image: string;
  tag: string;
  price: string;
  rating: string;
}

interface CategoryTypeProps {
  bestExperiences: Item[];
  title: string;
}

const CategoryType: React.FC<CategoryTypeProps> = ({
  bestExperiences,
  title,
}) => {
  return (
    <section className="py-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <Link
            href="/attractions"
            className="text-blue-600 text-sm font-semibold flex items-center gap-1"
          >
            See all <span>›</span>
          </Link>
        </div>

        {/* Responsive Scrollable Container */}
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 no-scrollbar py-2 px-1">
          {bestExperiences.map((exp, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 md:w-full rounded-xl overflow-hidden shadow-md hover:shadow-md transition"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">{exp.tag}</p>
                <h3 className="font-semibold text-lg text-black">
                  {exp.title}
                </h3>
                <p className="text-yellow-500 text-sm">★ {exp.rating}</p>
                <p className="text-gray-700 text-sm">from: {exp.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryType;
