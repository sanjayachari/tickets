import Link from 'next/link';
import React from 'react';

interface Item {
  title: string;
  price: string;
  image: string;
}

interface AttractionsProps {
  topAttractions: Item[];
}

const Attractions: React.FC<AttractionsProps> = ({ topAttractions }) => {
  return (
    <section className="bg-[#F1F6FF] py-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            Top Attraction in <span className="text-yellow-600">Dubai</span>
          </h2>
          <Link
            href="/attractions"
            className="text-blue-600 text-sm font-semibold flex items-center gap-1"
          >
            See all <span>›</span>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
          {topAttractions.map((item, i) => (
            <div
              key={i}
              className="relative h-[300px] w-[240px] rounded-xl overflow-hidden shadow flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Attractions;
