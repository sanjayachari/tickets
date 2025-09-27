"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";
import TicketCard from "./CityCard";

const images = ["/city/city1.png", "/city/city1.png", "/city/city1.png"];

const tickets = [
  {
    imageUrl: "/city/city1.png",
    title: "Humayun Tomb Guided Tour",
    description:
      "Explore the beautiful Humayun Tomb with a professional guide, including historical insights and photography stops.",
    rating: 4.7,
    reviews: 128,
    oldPrice: 1200,
    newPrice: 950,
    discount: 21,
  },
  {
    imageUrl: "/city/city1.png",
    title: "Qutub Minar Skip-the-Line Ticket",
    description:
      "Skip the long queues at Qutub Minar and enjoy a guided tour with audio commentary.",
    rating: 4.5,
    reviews: 200,
    oldPrice: 1000,
    newPrice: 800,
    discount: 20,
  },
  {
    imageUrl: "/city/city1.png",
    title: "Red Fort Entry Ticket",
    description:
      "Experience the historic Red Fort with priority entry and optional guide services.",
    rating: 4.6,
    reviews: 150,
    oldPrice: 900,
    newPrice: 700,
    discount: 22,
  },
  {
    imageUrl: "/city/city1.png",
    title: "Lotus Temple Guided Tour",
    description:
      "Visit the Lotus Temple with a guided experience and learn about its architecture and history.",
    rating: 4.8,
    reviews: 95,
    oldPrice: 800,
    newPrice: 650,
    discount: 18,
  },
];

const City = () => {
  const [current, setCurrent] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-3">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        {/* Left text */}
        <div className="flex flex-col justify-center p-2 md:p-4">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 leading-tight">
            Humayun Tomb Tickets & Tours
          </h1>
          <p className="text-sm sm:text-base text-gray-700 leading-5 md:leading-6 line-clamp-4">
            DelhiTicket by Staybook is an authorized and trusted partner,
            offering curated tours and tickets for this attraction. Please note,
            this is not the venue’s official website. Enjoy a smooth booking
            experience with Staybook.
          </p>
        </div>

        {/* Right slider */}
        <div className="h-[200px] sm:h-[250px] md:h-[300px] relative flex items-center justify-center bg-gray-100 overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full h-full"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="min-w-full h-full relative">
                <Image
                  src={img}
                  alt={`Gallery Image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
          >
            <ChevronLeft className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
          >
            <ChevronRight className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 flex space-x-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${
                  idx === current ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-6 gap-4">
        {/* Left side: results */}
        <div className="text-black font-medium text-sm sm:text-base">
          Humayun Tomb: 33+ results
        </div>

        {/* Right side: toggle (only visible on md+) */}
        <div className="hidden md:flex gap-2 border border-black rounded-full px-3 py-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded-full ${
              viewMode === "grid" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-full ${
              viewMode === "list" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            <List className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Tickets Section */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {tickets.map((ticket, idx) => (
          <TicketCard
            key={idx}
            imageUrl={ticket.imageUrl}
            title={ticket.title}
            description={ticket.description}
            rating={ticket.rating}
            reviews={ticket.reviews}
            oldPrice={ticket.oldPrice}
            newPrice={ticket.newPrice}
            discount={ticket.discount}
            view={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default City;
