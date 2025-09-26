import React from "react";

const FlexBanner = () => {
  return (
    <div className="bg-[#FDF8E6]">
      <div className="py-6 max-w-[1440px] mx-auto px-4 md:px-20 flex flex-col items-center justify-center">
        <h4 className="text-3xl font-bold text-[#005250]">
          Maintain flexibility
        </h4>
        <h4 className="text-3xl font-bold text-[#005250]">in your approach</h4>
        <p className="text-center mt-4">
          Book your activities now and pay later to secure your <br /> spot
          without being committed.
        </p>
      </div>
    </div>
  );
};

export default FlexBanner;
