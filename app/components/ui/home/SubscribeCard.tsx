import React from "react";
import Image from "next/image";

const SubscribeCard = () => {
  return (
    <div className="relative py-32">
      {/* Card */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-full max-w-[1440px] px-4 md:px-20">
          <div className="rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-lg w-full">
            {/* Left Section */}
            <div className="flex-1 p-6 md:p-12 flex flex-col justify-center gap-6 bg-[#E9F3FF]">
              <span className="bg-[#FFF500] text-black text-sm font-semibold px-4 py-2 rounded-full w-fit">
                Join for Latest offers
              </span>

              <h2 className="text-2xl md:text-3xl font-bold leading-snug text-black">
                Subscribe to see secret deals <br />
                prices drop the moment you sign up!
              </h2>

              {/* Responsive Input & Button */}
              <div className="relative  w-full max-w-md">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-4 py-3 text-gray-700 bg-white rounded-full  outline-none w-full"
                />
                <button className="absolute right-0 top-0 bg-black text-white px-6 py-3 rounded-full  w-auto">
                  Subscribe
                </button>
              </div>

              <p className="text-gray-500 text-sm">No ads.</p>
            </div>

            {/* Right Section */}
            <div className="flex-1 relative h-64 md:h-auto w-full">
              <Image
                src="/home/subscribe.png"
                alt="Resort Pool"
                fill
                className="object-cover rounded-tr-3xl md:rounded-tr-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="relative overflow-hidden">
    //   {/* Background Split */}
    //   <div className="absolute inset-0">
    //     <div className="h-1/2 bg-white"></div>
    //     <div className="h-1/2 bg-gray-900"></div>
    //   </div>

    //   <div className="px-2 sm:px-20 pt-8 relative grid grid-cols-1 md:grid-cols-2">
    //     <div className="flex flex-col justify-center rounded-2xl bg-blue-50 p-8 md:rounded-l-2xl md:rounded-r-none">
    //       <span className="mb-4 w-fit rounded-full bg-yellow-300 px-4 py-1 text-sm text-black">
    //         Join for Latest offers
    //       </span>
    //       <h2 className="mb-4 text-xl font-bold md:text-3xl">
    //         Subscribe to see secret deals prices drop the moment you sign up!
    //       </h2>
    //       <div className="relative">
    //         <div className="h-96 overflow-hidden rounded-r-2xl md:hidden">
    //           <Image
    //             src="/home/subscribe.png"
    //             alt="Resort pool"
    //             height={100}
    //             width={200}
    //             className="object-fit h-full w-full"
    //           />
    //         </div>

    //         <div className="absolute bottom-4 left-3 flex w-11/12 items-center justify-between overflow-hidden rounded-full bg-white md:static">
    //           <input
    //             type="email"
    //             placeholder="Your Email"
    //             className="pl-4 w-4/6 md:w-1/2 lg:w-4/6 pr-1 text-sm outline-none  md:flex-1 lg:px-4"
    //           />
    //           <button className="w-2/6 md:w-1/2 lg:w-2/6 ml-0  rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 lg:px-6">
    //             Subscribe
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="hidden h-96 -ml-6 overflow-hidden rounded-r-3xl md:block">
    //       <Image
    //         src="/home/subscribe.png"
    //         alt="Resort pool"
    //         height={800}
    //         width={800}
    //         className="object-fit h-full w-full"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default SubscribeCard;
