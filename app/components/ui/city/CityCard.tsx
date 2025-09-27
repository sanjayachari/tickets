"use client";

import Image from "next/image";

interface TicketCardProps {
  imageUrl: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  oldPrice: number;
  newPrice: number;
  discount: number;
  view?: "list" | "grid"; // new prop to toggle layout
}

export default function TicketCard({
  imageUrl,
  title,
  description,
  rating,
  reviews,
  oldPrice,
  newPrice,
  discount,
  view = "list",
}: TicketCardProps) {
  const isGrid = view === "grid";

  return (
    <div
      className={`w-full mx-auto border border-gray-300 border-opacity-10 rounded-2xl shadow-sm overflow-hidden p-2 md:p-3
        flex flex-col ${!isGrid ? "md:flex-row md:gap-4" : ""}`}
    >
      {/* Image */}
      <div className={`relative w-full ${!isGrid ? "md:w-1/2" : ""} h-48 md:h-auto`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover rounded-t-2xl ${!isGrid ? "md:rounded-l-2xl md:rounded-tr-none" : "rounded-2xl"}`}
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-between p-2 md:p-4 ${!isGrid ? "md:w-1/2" : ""}`}>
        <div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Ticket</p>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

          <button className="mt-2 inline-block bg-red-600 text-white text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded">
            Limited time Price
          </button>

          <p className="mt-1 text-xs sm:text-sm text-green-600 flex items-center gap-1">
            <span className="text-sm">✔</span> Free cancelation
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 border-t pt-2 gap-2 sm:gap-0">
          {/* Rating */}
          <div>
            <p className="text-green-700 font-semibold text-sm">Excellent</p>
            <p className="text-xs text-gray-500">{reviews} Reviews</p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <div className="bg-green-900 text-white text-[10px] sm:text-xs font-semibold px-1 py-0.5 rounded-md">
              {rating.toFixed(1)}/5
            </div>
            <div className="text-left sm:text-right mt-1">
              <span className="bg-yellow-200 text-yellow-800 text-[10px] px-1 py-0.5 rounded">
                {discount}% off
              </span>
              <p className="text-xs sm:text-sm text-gray-400 line-through">
                ₹{oldPrice.toLocaleString("en-IN")} per night
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-800">
                ₹{newPrice.toLocaleString("en-IN")}{" "}
                <span className="text-xs sm:text-sm font-normal text-gray-600">
                  per night
                </span>
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">+ taxes & fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
