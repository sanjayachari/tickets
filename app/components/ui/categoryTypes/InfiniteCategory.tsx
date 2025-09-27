import React from 'react'

const bestExperiences = [
  {
    title: "Museum of Illusions",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main5.png",
  },
  {
    title: "Embarking in a 3-Day Adventure",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main6.png",
  },
  {
    title: "Explore Red Fort Skip the ticket",
    tag: "Ticket",
    rating: "4.5",
    price: "₹4,500/Per",
    image: "/main7.png",
  },
  {
    title: "Timezone Pacific Mall Garden",
    tag: "Ticket",
    rating: "4.5",
    price: "₹10,800/Per",
    image: "/main8.png",
  },
];

const InfiniteCategory = () => {
  return (
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
        </div>  )
}

export default InfiniteCategory