import Link from "next/link";
import { formatSecondToDaysNights } from "@/app/lib/utils/formatSecondToDaysNights/formatSecondToDaysNights";
import Breadcrumbs from "../common/Breadcrumbs";

interface Props {
  featureList: string[];
  tourRating: number;
  totalRatingCount: number;
  tourDuration: number;
}

export default function TourHeadBanner({
  featureList,
  tourRating,
  totalRatingCount,
  tourDuration,
}: Props) {
  return (
    <div className="flex w-full flex-col md:space-y-2">
      <div className="flex w-full items-center justify-between gap-y-1.5 flex-row md:space-y-0">
        {/* Scrollable button row */}

          {/* Rating + Reviews */}
          {tourRating ? (
            <Link
              href="#reviews"
              className="rounded-full border border-gray-200 p-1 px-3 mr-2 text-sm font-semibold tracking-wide whitespace-nowrap flex items-center space-x-2"
            >
              <span>⭐ {tourRating} / 5</span>
              <span className="text-gray-300">|</span>
              <span>{totalRatingCount} Reviews</span>
            </Link>
          ) : null}


        <div className="container-snap flex w-full gap-2 overflow-x-scroll">
          {/* Duration */}
          <button className="rounded-full border border-gray-200 p-1 px-3 text-sm font-semibold tracking-wide whitespace-nowrap">
            {formatSecondToDaysNights(tourDuration)}
          </button>

          {/* Features */}
          {featureList.map((item: string, idx: number) => (
            <button
              key={idx}
              className="rounded-full border border-gray-200 p-1 px-3 text-sm whitespace-nowrap"
            >
              {item}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
