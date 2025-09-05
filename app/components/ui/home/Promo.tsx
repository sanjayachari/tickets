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
      setCurrent((prev) => (prev + 2) % promoImages.length); // jump 2 at a time
    }, 3000);

    return () => clearInterval(interval);
  }, [promoImages.length]);

  // Scroll horizontally inside container (no page scroll!)
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
            className="relative w-1/2 h-[250px] rounded-xl overflow-hidden shadow-md flex-shrink-0 snap-start"
          >
            <Image
              src={img}
              alt={`Promo ${i + 1}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
