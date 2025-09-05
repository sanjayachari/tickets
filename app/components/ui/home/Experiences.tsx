import Image from "next/image";
import React from "react";
import CategorySection from "./CategorySection";
import Link from "next/link";

// Data Objects
const topAttractions = [
  { title: "Burj Khalifa", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Dubai Frame", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Burj Al Arab", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg" },
];

const bestExperiences = [
  {
    title: "Museum of Illusions",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/burj.jpeg",
  },
  {
    title: "Embarking in a 3-Day Adventure",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/burj.jpeg",
  },
  {
    title: "Explore Red Fort Skip the ticket",
    tag: "Ticket",
    rating: "4.5",
    price: "₹4,500/Per",
    image: "/burj.jpeg",
  },
  {
    title: "Timezone Pacific Mall Garden",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/burj.jpeg",
  },
];

const categories = [
  { name: "All", icon: "/icons/grid_view.png" },
  { name: "Landmarks", icon: "/icons/landmark.png" },
  { name: "Museums", icon: "/icons/museum.png" },
  { name: "Theme Park", icon: "/icons/themepark.png" },
  { name: "Zoo", icon: "/icons/zoo.png" },
  { name: "Monument", icon: "/icons/monument.png" },
  { name: "Water park", icon: "/icons/waterpark.png" },
];

const landmarks = [
  {
    title: "Burj Khalifa",
    offer: "6% off (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of the Future",
    offer: "6% off (38K+ reviews)",
    image: "/burj.jpeg",
  },
  { title: "Dubai Frame", offer: "6% off (38K+ reviews)", image: "/burj.jpeg" },
];

const museums = [
  {
    title: "Dubai Museum",
    offer: "6% off (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of Illusions",
    offer: "6% off (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Etihad Museum",
    offer: "6% off (38K+ reviews)",
    image: "/burj.jpeg",
  },
];

const Experiences: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Top Attractions */}
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

      {/* Best Experiences */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">
              Best experiences in Dubai
            </h2>
            <Link
              href="/attractions"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              See all <span>›</span>
            </Link>
          </div>

          {/* Responsive Scrollable Container */}
          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 no-scrollbar py-2">
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

      {/* Explore Dubai */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <h2 className="text-2xl font-bold mb-6 text-black">Explore Dubai</h2>
          <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar px-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-sm border border-gray-300 text-sm font-medium hover:bg-gray-100 text-black flex-shrink-0"
              >
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Landmarks */}
          <div className="mb-10">
            <CategorySection
              title="Landmarks in Dubai"
              items={landmarks}
              onSeeAll={() => console.log("See all landmarks clicked")}
            />
          </div>

          {/* Museums */}
          <CategorySection
            title="Museums in Dubai"
            items={museums}
            onSeeAll={() => console.log("See all museums clicked")}
          />
        </div>
      </section>
    </div>
  );
};

export default Experiences;
