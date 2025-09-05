"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sara Mohamed",
    location: "Jakatar",
    rating: 5,
    text: "I’ve been using the hotel booking system for several years now, and it’s become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",
    image: "/home/testimonial1.png",
  },
  {
    name: "Atend John",
    location: "California",
    rating: 5,
    text: "I had a last-minute business trip, and the hotel booking system came to the rescue. I was able to find a hotel in no time and even got a great deal on the room. The confirmation process was straightforward, and I received all the necessary information promptly.",
    image: "/home/testimonial2.png",
  },
  {
    name: "Aisha Khan",
    location: "Dubai",
    rating: 4,
    text: "Great service with a wide selection of hotels. Booking was smooth and I loved the flexible cancellation policies. Customer support was very responsive.",
    image: "/home/testimonial3.png",
  },
];

const HomeAbout = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-50 rounded-3xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <div className="flex -space-x-2">
                <Image
                  src="/home/testimonial1.png"
                  alt="user1"
                  width={28}
                  height={28}
                  className="rounded-full border"
                />
                <Image
                  src="/home/testimonial2.png"
                  alt="user2"
                  width={28}
                  height={28}
                  className="rounded-full border"
                />
                <Image
                  src="/home/testimonial3.png"
                  alt="user3"
                  width={28}
                  height={28}
                  className="rounded-full border"
                />
              </div>
              <span className="text-sm font-medium">Testimonials</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 ubuntu-bold">
              What our clients are saying about us?
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Discover how you can offset your adventure’s carbon emissions and
              support the sustainable initiatives practiced by our operators
              worldwide.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative md:w-1/2 w-full max-w-full">
            {/* Arrow Image Outside Left */}
            <img
              src={"/home/arrow.png"}
              className="hidden md:block absolute -left-16 top-1/2 -translate-y-1/2 w-24 md:w-36 h-24 md:h-36 object-contain"
            />

            {/* Testimonial Content */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="w-full md:w-2/3 flex-shrink-0 bg-white rounded-2xl mr-6 p-6 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-sm md:text-base">
                          {t.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-500">
                          {t.location}
                        </p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm md:text-base">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base font-write">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
