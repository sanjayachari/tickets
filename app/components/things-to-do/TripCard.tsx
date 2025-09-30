import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// import { ClockIcon } from "@heroicons/react/solid";
// import { priceCurrencyConvertor } from "@/src/utils";
import FallbackImage from "../common/FallbackImage";

// import {
//   selectCurrencySymbol,
//   selectCurrencyValue,
// } from "@/lib/redux/tourBookingSlice";

import { ClockIcon } from "lucide-react";
import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
// import { selectCurrencySymbol, selectCurrencyValue } from "@/app/lib/redux/activityBookingSlice";

type Props = {
  data: any;
  imageHeight?: string;
  headingType?: string;
};

export default function TripCard({ data, imageHeight, headingType }: Props) {
  // const currencySymbol = useSelector(selectCurrencySymbol);
  // const currencyValue = useSelector(selectCurrencyValue);

  function convertSeconds(seconds: number): string {
    if (seconds < 86400) {
      const hours = seconds / 3600;
      const formattedHours =
        hours % 1 === 0 ? hours.toString() : hours.toFixed(2);
      return `${formattedHours} hours`;
    } else {
      const days = seconds / 86400;
      const formattedDays = days % 1 === 0 ? days.toString() : days.toFixed(2);
      return `${formattedDays} days`;
    }
  }

  return (
    <Link
      href={`/things-to-do/${data.tour_Slug_Name}`}
      target="_blank"
      className="group flex w-full min-w-[250px] snap-start flex-col space-y-4 rounded-md border-2 p-3 md:max-w-xs"
    >
      <div className={`relative h-[100px] w-full overflow-hidden rounded`}>
        {data.tour_Image_Url === "" ? (
          <FallbackImage />
        ) : (
          <Image
            src={data.tour_Image_Url}
            alt={"package main image"}
            title={"package main image"}
            width={280}
            height={170}
            className="h-full w-full flex-shrink-0 rounded object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="flex flex-col justify-between space-y-1.5">
        {headingType ? (
          <h3 className="line-clamp-2 w-full text-base font-semibold text-secondary">
            {data.tour_Name}
          </h3>
        ) : (
          <h2 className="line-clamp-2 w-full text-base font-semibold text-secondary">
            {data.tour_Name}
          </h2>
        )}

        <div className="flex w-full gap-1 text-sm font-semibold">
          <ClockIcon className="w-5" />
          <p>{convertSeconds(data.tour_Duration)}</p>
        </div>

        <div className="flex w-full gap-1 text-secondary">
          <span className="my-auto flex gap-2 align-middle text-lg font-bold">
            {/* from {currencySymbol}
            {priceCurrencyConvertor(
              data.tour_Cost_Breakup.base_Price,
              currencyValue,
            )} */}
          </span>
          <span className="my-auto align-middle text-sm text-dark">
            / person
          </span>
        </div>
      </div>
    </Link>
  );
}
