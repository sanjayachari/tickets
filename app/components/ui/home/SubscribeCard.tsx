import React from "react";
import Image from "next/image";

const SubscribeCard = () => {
  return (
    <div className="relative py-20 md:py-32">
      {/* Card Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="relative w-full">
          <div className="rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-lg w-full">
            {/* Left Section */}
            <div className="flex-1 p-6 md:p-12 flex flex-col justify-center gap-6 bg-[#E9F3FF]">
              <span className="bg-[#FFF500] text-black text-xs md:text-sm font-semibold px-4 md:px-6 py-2 rounded-full w-fit">
                Join for Latest offer’s
              </span>

              <h2 className="text-xl md:text-3xl font-bold leading-snug text-black">
                Subscribe to see secret deals
                <br />
                prices drop the moment you sign up!
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2 sm:gap-0 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-4 py-3 outline-none text-gray-700 rounded-full sm:rounded-l-full sm:rounded-r-none w-full"
                />
                <button className="bg-black text-white px-6 py-3 font-semibold rounded-full sm:rounded-r-full sm:rounded-l-none w-full sm:w-auto">
                  Subscribe
                </button>
              </div>

              <p className="text-gray-500 text-xs md:text-sm">No ads.</p>
            </div>

            {/* Right Section */}
            <div className="flex-1 relative h-64 md:h-auto w-full">
              <Image
                src="/home/subscribe.png"
                alt="Resort Pool"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeCard;
