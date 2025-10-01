// import { parseAndFormatDate, formatSecondToDaysNights } from "@/src/utils";
import { formatSecondToDaysNights } from "@/app/lib/utils/formatSecondToDaysNights/formatSecondToDaysNights";
import { parseAndFormatDate } from "@/app/lib/utils/parseAndFormatDate/parseAndFormatDate";
import { ChevronDownIcon } from "lucide-react";
// import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  tourBookingInfo: any;
  isOpenByDefault?: boolean;
}

export default function TourDetailAccordian({
  tourBookingInfo,
  isOpenByDefault = false,
}: Props) {
  const [showTourDetails, setShowTourDetails] = useState(false);
  const [showFullInfo, setShowFullInfo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowTourDetails(true);
      }
    };
    // Set initial state
    handleResize();
  }, []);

  const formattedDate = parseAndFormatDate(tourBookingInfo.tour_Start_Date);

  // Content to be shown (either always visible or toggled)
  const tourDetailsContent = (
    <div className="h-full w-full border-t p-4">
      <div className="overflow-hidden rounded">
        <div>
          <div className="flex gap-4">
            <div className="relative aspect-square h-[160px] w-full overflow-hidden rounded-md shadow-sm">
              <Image
                src={tourBookingInfo.tour_Image_Url}
                title="title of image"
                alt="alt of image"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <p className="line-clamp-4 text-lg font-semibold">
                <Link
                  href={`/things-to-do/${tourBookingInfo.tour_Slug_Name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tourBookingInfo.tour_Name}
                </Link>
              </p>
              <div className="flex items-center justify-between">
                <button className="rounded-full border p-1 px-3 text-sm font-semibold tracking-wide">
                  {formatSecondToDaysNights(tourBookingInfo.tour_Duration)}
                </button>
                {tourBookingInfo.tour_Rating > 0 && (
                  <span className="text-sm">
                    ⭐ {tourBookingInfo.tour_Rating} / 5
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-2 mt-2">
            <p
              className={`text-sm sm:text-base ${showFullInfo ? "line-clamp-none" : "line-clamp-3"}`}
              dangerouslySetInnerHTML={{ __html: tourBookingInfo.tour_Info }}
            />
            {!showFullInfo &&
              tourBookingInfo.tour_Info &&
              tourBookingInfo.tour_Info.split(/\s+/).length > 42 && (
                <span
                  onClick={() => setShowFullInfo(!showFullInfo)}
                  className="cursor-pointer text-sm font-semibold tracking-wide text-blue-500"
                >
                  {showFullInfo ? "Read Less" : "Read More"}
                </span>
              )}
          </div>
        </div>

        <div className="space-y-2 border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Start Date</span>
            <span>{formattedDate}</span>
          </div>
          {tourBookingInfo.total_Adult_Count > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Adults</span>
              <span>
                {tourBookingInfo.total_Adult_Count ||
                  tourBookingInfo.total_Adults_Count}{" "}
                Adults
              </span>
            </div>
          )}
          {tourBookingInfo.total_Child_Count > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Child</span>
              <span>{tourBookingInfo.total_Child_Count} child</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border">
      {isOpenByDefault ? (
        // If isOpenByDefault is true, show content without accordion
        <>
          <div className="flex items-center justify-between p-4 py-2.5">
            <span className="font-semibold tracking-wide">Tour Details</span>
          </div>
          {tourDetailsContent}
        </>
      ) : (
        // Otherwise, use accordion logic
        <>
          <div
            onClick={() => setShowTourDetails(!showTourDetails)}
            className="flex cursor-pointer items-center justify-between p-4 py-2.5"
          >
            <span className="font-semibold tracking-wide">Tour Details</span>
            <button>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${showTourDetails ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {showTourDetails && tourDetailsContent}
        </>
      )}
    </div>
  );
}
