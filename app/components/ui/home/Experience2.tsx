import Image from "next/image";
import React from "react";
import CategorySection from "./CategorySection";

// Data Objects
const topAttractions = [
  { title: "Burj Khalifa", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Dubai Frame", price: "from INR 21,999", image: "/burj.jpeg" },
  { title: "Burj Al Arab", price: "from INR 21,999", image: "/burj.jpeg" },
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
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of the Future",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Museum of the Future",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  { title: "Dubai Frame", offer: "6% (38K+ reviews)", image: "/burj.jpeg" },
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
    title: "Dubai Museum",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
  {
    title: "Etihad Museum",
    offer: "6% (38K+ reviews)",
    image: "/burj.jpeg",
  },
];

const Experiences2: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Explore Dubai */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
          {/* Landmarks */}
          <div className="mb-10">
            <CategorySection
              title="Monument in Dubai"
              items={landmarks}
              onSeeAll={() => console.log("See all landmarks clicked")}
            />
          </div>

          {/* Museums */}
          <CategorySection
            title="Water Park in Dubai"
            items={museums}
            onSeeAll={() => console.log("See all museums clicked")}
          />
        </div>
      </section>
    </div>
  );
};

export default Experiences2;
