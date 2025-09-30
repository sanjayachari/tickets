import Link from "next/link";
// import { formatSecondToDaysNights } from "@/src/utils";
// import Breadcrumbs from "@/components/common/Breadcrumbs";
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
      <Breadcrumbs />
      <div className="flex w-full flex-col items-center justify-between gap-y-1.5 md:flex-row md:space-y-0">
        <div className="container-snap flex w-full gap-2 overflow-x-scroll">
          <button className="rounded-full border p-1 px-3 text-sm font-semibold tracking-wide whitespace-nowrap">
            {formatSecondToDaysNights(tourDuration)}
          </button>
          {featureList.map((item: string, idx: number) => (
            <button key={idx} className="rounded-full border p-1 px-3 text-sm">
              {item}
            </button>
          ))}
        </div>
        {tourRating ? (
          <Link
            href={"#reviews"}
            className="hidden w-full flex-row items-center space-x-3 whitespace-nowrap text-end align-middle md:flex md:w-fit md:flex-col md:space-x-0"
          >
            <div className="flex items-center space-x-2 align-middle">
              <p>⭐ {tourRating} / 5</p>{" "}
              <span className="text-gray-300">|</span>
              <p className="underline">{totalRatingCount} Reviews</p>
            </div>
            <p className="leading-none">(based on user ratings)</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
