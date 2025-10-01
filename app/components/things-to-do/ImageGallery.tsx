"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import FallbackImage from "../common/FallbackImage";

interface ImageGalleryProps {
  tourImageList: { image_Url: string }[];
  setIsCollegeOpen: (val: boolean) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  tourImageList,
  setIsCollegeOpen,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Right column height = 400px
  const columnHeight = 400;
  const gap = 8; // gap-2 = 8px
  const itemsVisible = 3;

  // Height of each item including gap
  const itemHeight = (columnHeight - gap * (itemsVisible - 1)) / itemsVisible;

  // Auto-slide every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tourImageList.length);
      setTranslateY((prev) => prev - (itemHeight + gap));
    }, 2500);

    return () => clearInterval(interval);
  }, [tourImageList.length, itemHeight, gap]);

  // Reset loop cleanly
  useEffect(() => {
    if (Math.abs(translateY) >= tourImageList.length * (itemHeight + gap)) {
      setTranslateY(0);
    }
  }, [translateY, itemHeight, gap, tourImageList.length]);

  return (
    <div className="hidden md:flex w-full h-[400px] gap-2.5 my-2">
      {/* Left Big Image */}
      <div className="relative h-full w-[70%] rounded-2xl overflow-hidden">
        {tourImageList[currentIndex] ? (
          <Image
            src={tourImageList[currentIndex].image_Url}
            alt="Main tour image"
            title="Main tour image"
            priority
            width={800}
            height={600}
            className="rounded-2xl w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setIsCollegeOpen(true)}
          />
        ) : (
          <FallbackImage />
        )}

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {tourImageList.map((_, idx) => (
            <span
              key={idx}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                idx === currentIndex
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Column (3 stacked sliding images) */}
      <div className="relative h-full w-[30%] overflow-hidden">
        <div
          ref={containerRef}
          className="absolute top-0 left-0 w-full transition-transform duration-700"
          style={{
            transform: `translateY(${translateY}px)`,
          }}
        >
          <div className="flex flex-col gap-2">
            {tourImageList.concat(tourImageList).map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl"
                style={{ height: `${itemHeight}px` }}
              >
                {img ? (
                  <Image
                    src={img.image_Url}
                    alt={`Side image ${idx + 1}`}
                    title={`Side image ${idx + 1}`}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setIsCollegeOpen(true)}
                  />
                ) : (
                  <FallbackImage />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
