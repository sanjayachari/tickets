import React from "react";

// Data Objects
const topAttractions = [
  { title: "Burj Khalifa", price: "from INR 21,999",     image: "/burj.jpeg", },
  { title: "Dubai Frame", price: "from INR 21,999", image: "/burj.jpeg", },
  { title: "Burj Al Arab", price: "from INR 21,999", image: "/burj.jpeg", },
  { title: "Atlantis", price: "from INR 21,999", image: "/burj.jpeg", },
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
  "All",
  "Landmarks",
  "Museums",
  "Theme Park",
  "Zoo",
  "Monument",
  "Water park",
];

const landmarks = [
  { title: "Burj Khalifa", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg" },
  { title: "Museum of the Future", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg", },
  { title: "Dubai Frame", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg", },
];

const museums = [
  { title: "Dubai Museum", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg", },
  { title: "Museum of Illusions", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg", },
  { title: "Etihad Museum", offer: "6% off (38K+ reviews)",     image: "/burj.jpeg" },
];

const DelhiExperiences: React.FC = () => {
  return (
   <div className=" bg-white">
     <div className="w-full max-w-[1440px] mx-auto">
      {/* Top Attractions */}
      <section className="py-10 px-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            Top Attraction in <span className="text-yellow-600">Dubai</span>
          </h2>
          <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
            See all <span>›</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topAttractions.map((item, i) => (
            <div key={i} className="relative h-64 rounded-xl overflow-hidden shadow">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Experiences */}
      <section className="py-10 px-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Best experiences in Dubai</h2>
          <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
            See all <span>›</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {bestExperiences.map((exp, i) => (
            <div key={i} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={exp.image} alt={exp.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-500">{exp.tag}</p>
                <h3 className="font-semibold text-lg text-black">{exp.title}</h3>
                <p className="text-yellow-500 text-sm">★ {exp.rating}</p>
                <p className="text-gray-700 text-sm">from: {exp.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Dubai */}
      <section className="py-10 px-20">
        <h2 className="text-2xl font-bold mb-6 text-black">Explore Dubai</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="px-4 py-2 rounded-full border text-sm font-medium hover:bg-gray-100 text-black"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Landmarks */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-black">Landmarks in Dubai</h3>
            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
              See all <span>›</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {landmarks.map((item, i) => (
              <div key={i} className="relative h-56 rounded-xl overflow-hidden shadow">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-green-400 text-sm">{item.offer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Museums */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-black">Museums in Dubai</h3>
            <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
              See all <span>›</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {museums.map((item, i) => (
              <div key={i} className="relative h-56 rounded-xl overflow-hidden shadow">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-green-400 text-sm">{item.offer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
   </div>
  );
};

export default DelhiExperiences;
