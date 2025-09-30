import Image from "next/image";
// import { TourImageDetails } from "@/lib/classModels/tourAndTravels/TourPackageInfo";
// import { ActivityImage } from "@/lib/classModels/activities/activityImage";
import { ChevronLeftIcon } from "lucide-react";
import FallbackImage from "../common/FallbackImage";
import { TourImageDetails } from "@/app/classes/tourAndTravels/TourPackageInfo";
import { ActivityImage } from "@/app/classes/activities/activityImage";

interface Props {
  imageList: TourImageDetails[] | ActivityImage[];
  onClose: () => void;
  setIsGalleryOpen?: (isOpen: boolean) => void;
  setImageIndex?: (index: number) => void;
}

export default function College({
  imageList,
  onClose,
  setIsGalleryOpen,
  setImageIndex,
}: Props) {
  return (
    <div className="container-snap fixed inset-0 z-50 overflow-y-scroll bg-light">
      {/* Header */}
      <div className="fixed inset-x-0 z-10 bg-white shadow-md">
        <div className="wrapper py-2">
          <div
            onClick={onClose}
            className="flex w-fit cursor-pointer items-center gap-2 rounded p-2 px-4 font-semibold tracking-wide hover:bg-primary"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            <span className="text-gray-600">Back</span>
          </div>
        </div>
      </div>

      {/* Dynamic Grid Inspired by Instagram Reels Search */}
      <div className="wrapper grid grid-cols-1 gap-4 pt-20 sm:grid-cols-2 lg:grid-cols-3">
        {imageList?.map((el, index) => {
          const image =
            "image_Url" in el
              ? el.image_Url
              : "url" in el
                ? el.url
                : "/images/placeholder.svg";

          return (
            <div
              key={index}
              className="group relative h-[240px] w-full overflow-hidden rounded-lg"
            >
              {image ? (
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={480}
                  height={270}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onClick={() => {
                    setIsGalleryOpen && setIsGalleryOpen(true);
                    setImageIndex && setImageIndex(index);
                  }}
                />
              ) : (
                <FallbackImage />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
