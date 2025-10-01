import { useEffect, useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/solid";
// import { priceCurrencyConvertor } from "@/src/utils";
// import { TourBookingDetails } from "@/lib/classModels/bookings/tourBookingDetails";
import { ChevronDownIcon } from "lucide-react";
import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
import { TourBookingDetails } from "@/app/classes/bookings/tourBookingDetails";

// Define the props interface
interface Props {
  tourBookingInfo: TourBookingDetails;
  selectedOption?: string;
}

// PriceDetails Component
export default function PriceAccordian({
  tourBookingInfo,
  selectedOption,
}: Props) {
  const [showPrice, setShowPrice] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowPrice(true);
      }
    };

    // Set initial state
    handleResize();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border">
      <div
        onClick={() => setShowPrice(!showPrice)}
        className="flex cursor-pointer items-center justify-between p-4 py-2.5"
      >
        <span className="font-semibold tracking-wide">
          Price Details{" "}
          <span className="text-sm">
            (
            {tourBookingInfo.tour_Currency_Code === "INR"
              ? "₹"
              : tourBookingInfo.tour_Currency_Symbol}
            {selectedOption === "partialPayment"
              ? priceCurrencyConvertor(
                  tourBookingInfo.total_Price / 2,
                  tourBookingInfo.tour_Currency_Value,
                )?.toLocaleString("en-IN")
              : priceCurrencyConvertor(
                  tourBookingInfo.total_Price,
                  tourBookingInfo.tour_Currency_Value,
                )?.toLocaleString("en-IN")}
            )
          </span>
        </span>
        <button type="button" aria-label="Toggle price details">
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${showPrice ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {showPrice && (
        <>
          <div className="h-full w-full space-y-2 border-t p-4">
            <div className="flex items-center justify-between">
              <span>Plan Price</span>
              <span>
                {tourBookingInfo.tour_Currency_Code === "INR"
                  ? "₹"
                  : tourBookingInfo.tour_Currency_Symbol}
                {selectedOption === "partialPayment"
                  ? priceCurrencyConvertor(
                      Math.ceil(tourBookingInfo.total_Price * 0.95) / 2,
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")
                  : priceCurrencyConvertor(
                      Math.ceil(tourBookingInfo.total_Price * 0.95),
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes & Fees</span>
              <span>
                {tourBookingInfo.tour_Currency_Code === "INR"
                  ? "₹"
                  : tourBookingInfo.tour_Currency_Symbol}

                {selectedOption === "partialPayment"
                  ? priceCurrencyConvertor(
                      Math.ceil(tourBookingInfo.total_Price * 0.05) / 2,
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")
                  : priceCurrencyConvertor(
                      Math.ceil(tourBookingInfo.total_Price * 0.05),
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between font-semibold text-secondary">
              <span>Total Price</span>
              <span>
                {tourBookingInfo.tour_Currency_Code === "INR"
                  ? "₹"
                  : tourBookingInfo.tour_Currency_Symbol}
                {selectedOption === "partialPayment"
                  ? priceCurrencyConvertor(
                      tourBookingInfo.total_Price / 2,
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")
                  : priceCurrencyConvertor(
                      tourBookingInfo.total_Price,
                      tourBookingInfo.tour_Currency_Value,
                    )?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
