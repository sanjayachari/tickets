import React from "react";
import CategorySection from "./CategorySection";

const landmarks = [
  { title: "Burj Khalifa", offer: "6% off (38K+)", image: "/burj.jpeg" },
  {
    title: "Museum of the Future",
    offer: "6% off (38K+)",
    image: "/main1.png",
  },
  { title: "Dubai Frame", offer: "6% off (38K+)", image: "/burj.jpeg" },
];

const museums = [
  { title: "Dubai Museum", offer: "6% off (38K+)", image: "/burj.jpeg" },
  { title: "Museum of Illusions", offer: "6% off (38K+)", image: "/main1.png" },
  { title: "Etihad Museum", offer: "6% off (38K+)", image: "/burj.jpeg" },
];

const Experiences1: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Explore Dubai */}
      <section className="py-10">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20">
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

export default Experiences1;
