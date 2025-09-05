"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Promo = () => {
  const promoImages = [
    "/home/promo1.png",
    "/home/promo2.png",
    "/home/promo3.png",
    "/home/promo4.png",
    "/home/promo1.png",
    "/home/promo2.png",
    "/home/promo3.png",
    "/home/promo4.png",
  ];

  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promoImages.length]);

  // Scroll horizontally
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[current] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }, [current]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-2">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory space-x-4"
      >
        {promoImages.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-xl overflow-hidden shadow-md snap-start"
          >
            <Image
              src={img}
              alt={`Promo ${i + 1}`}
              width={600}        // width for aspect ratio
              height={400}       // height for aspect ratio
              className="object-contain w-full h-full rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
