import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { priceCurrencyConvertor } from "@/src/utils";
// import { PriceSkeleton2 } from "@/components/skeleton/skeletons";

// import {
//   selectPlansList,
//   selectTourBookingInfo,
// } from "@/lib/redux/tourBookingSlice";

import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
import { selectPlansList, selectTourBookingInfo } from "@/app/lib/redux/tourBookingSlice";
import { PriceSkeleton2 } from "../skeleton/Skeletons";

interface Props {
  lowestPrice: null | number;
  scrollToSelection: any;
  availabilityRef: any;
  createTourBooking: () => void;
}

export default function TourBottomBar({
  lowestPrice,
  scrollToSelection,
  availabilityRef,
  createTourBooking,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const selectedTourPlansList = useSelector(selectPlansList);
  const tourBookingInfo = useSelector(selectTourBookingInfo);
  // get the total price of all selected plans
  const totalPlanPrices = selectedTourPlansList.reduce(
    (accumulator : any , currentPlan : any ) => {
      return accumulator + currentPlan.total_Plan_Price;
    },
    0,
  );

  useEffect(() => {
    if (selectedTourPlansList.length > 0) {
      setIsVisible(true);
      return;
    }

    if (!availabilityRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0 },
    );

    const target = availabilityRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [selectedTourPlansList.length, availabilityRef]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="wrapper flex items-center justify-between py-2">
        <div>
          <div className="flex gap-2 text-xl">
            {selectedTourPlansList.length <= 0 && "From"}
            <div className="font-bold">
              {selectedTourPlansList.length > 0 ? (
                <span>
                  {tourBookingInfo.tour_Currency_Symbol}{" "}
                  {priceCurrencyConvertor(
                    totalPlanPrices,
                    tourBookingInfo.tour_Currency_Value,
                  )?.toLocaleString("en-IN")}
                </span>
              ) : lowestPrice === null ? (
                <PriceSkeleton2 />
              ) : (
                <span>
                  {tourBookingInfo.tour_Currency_Symbol}{" "}
                  {priceCurrencyConvertor(
                    lowestPrice,
                    tourBookingInfo.tour_Currency_Value,
                  )?.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>
          <div className="opacity-50">Includes all Taxes</div>
        </div>

        {selectedTourPlansList.length > 0 ? (
          <button
            className="GA_4_TTD_BOOKING_TRIGGER flex h-full cursor-pointer items-center justify-center rounded-full bg-secondary px-5 py-3 text-center font-semibold tracking-wide text-white"
            onClick={() => createTourBooking()}
          >
            Book Now
          </button>
        ) : (
          <button
            className="GA_4_TTD_CHECK_AVAIALABILITY_TRIGGER flex h-full cursor-pointer items-center justify-center rounded-full bg-secondary px-5 py-3 text-sm text-center font-semibold tracking-wide text-white"
            onClick={scrollToSelection}
          >
            Check Availability
          </button>
        )}
      </div>
    </div>
  );
}

