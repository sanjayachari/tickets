import Image from "next/image";
import React, { useState } from "react";
import CategorySection from "./CategorySection";
import Link from "next/link";
import { ChevronRight, MapPin, Star } from "lucide-react";

// Data Objects
const topAttractions = [
  { title: "Burj Khalifa", price: "from INR 21,999", image: "/main.png" },
  { title: "Dubai Frame", price: "from INR 21,999", image: "/main2.png" },
  { title: "Burj Al Arab", price: "from INR 21,999", image: "/main3.png" },
  { title: "Atlantis", price: "from INR 21,999", image: "/main4.png" },
  { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg" },
];

const bestExperiences = [
  {
    title: "Museum of Illusions",
    tag: "Ticket",
    rating: "4.5",
    orgPrice: "₹17,800",
    price: "₹10,800/Per",
    image: "/main5.png",
    location: "Dubai",
  },
  {
    title: "Embarking in a 3-Day Adventure",
    tag: "Ticket",
    rating: "4.5",
    orgPrice: "₹17,800",
    price: "₹10,800/Per",
    image: "/main6.png",
    location: "Dubai",
  },
  {
    title: "Explore Red Fort Skip the ticket",
    tag: "Ticket",
    rating: "4.5",
    orgPrice: "₹9,800",
    price: "₹4,500/Per",
    image: "/main7.png",
    location: "Dubai",
  },
  {
    title: "Timezone Pacific Mall Garden",
    tag: "Ticket",
    rating: "4.5",
    orgPrice: "₹17,800",
    price: "₹10,800/Per",
    image: "/main8.png",
    location: "Dubai",
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
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of the Future",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  { title: "Dubai Frame", offer: "6% (38K+ reviews)", image: "/burj.jpeg" },
  {
    title: "Museum of the Future",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
];

const museums = [
  {
    title: "Dubai Museum",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of Illusions",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Etihad Museum",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Dubai Museum",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
];

const Experiences: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="bg-white">
      {/* Top Attractions */}
      <section className="bg-[#F1F6FF] py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-800 via-green-600 to-yellow-500 bg-clip-text text-transparent">
              Top Attraction in Dubai
            </h2>
            <Link
              href="/attractions"
              className="text-blue-600 text-sm font-semibold flex items-center gap-1"
            >
              See all <ChevronRight className="h-5 w-5 text-black" />
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 no-scrollbar">
            {topAttractions.map((item, i) => (
              <div
                key={i}
                className="relative h-[230px] w-[150px] md:h-[300px] md:w-[240px] rounded-xl overflow-hidden shadow flex-shrink-0"
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
              See all <ChevronRight className="h-5 w-5 text-black" />
            </Link>
          </div>

          {/* Responsive Scrollable Container */}
          <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-4 md:gap-6 no-scrollbar py-2 px-1">
            {bestExperiences.map((exp, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-[400px] w-64 md:w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="h-60 w-full object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{exp.tag}</p>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold">{exp.rating}</p>
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mb-1" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-black">
                    {exp.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 " />
                    <div className="text-sm ">{exp.location}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 text-sm">
                      from-{" "}
                      <span className="text-red-300 line-through">
                        {exp.orgPrice}
                      </span>
                    </p>
                    <div className="font-semibold">{exp.price}</div>
                  </div>
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
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-sm font-medium hover:bg-gray-100 text-black flex-shrink-0 ${
                  selectedCategory === cat.name
                    ? "border-black "
                    : "border-gray-300"
                }`}
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
