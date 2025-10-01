// import { TourPackageInfo } from "@/lib/classModels/tourAndTravels/TourPackageInfo";
import { useEffect, useRef, useState } from "react";
// import ImageSlider from "@/components/things-to-do/ImageSlider";
// import TourHeadBanner from "./TourHeadBanner";
import Image from "next/image";
// import FallbackImage from "@/components/common/FallbackImage";
import Link from "next/link";
import { TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";
import ImageSlider from "../common/ImageSlider";
import TourHeadBanner from "./TourHeadBanner";
import FallbackImage from "../common/FallbackImage";
import Breadcrumbs from "../common/Breadcrumbs";

interface Props {
  tourData: TourPackageInfo;
  setIsCollegeOpen: any;
  tourImageList: any;
}

export default function TourBanner({
  tourData,
  setIsCollegeOpen,
  tourImageList,
}: Props) {
  const nearbySliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoscrolling, setIsAutoscrolling] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (nearbySliderRef.current) {
        const scrollPosition = nearbySliderRef.current.scrollLeft;
        const slideWidth = nearbySliderRef.current.children[0].clientWidth;
        const newIndex = Math.floor(scrollPosition / slideWidth);
        setCurrentIndex(newIndex);
      }
    };

    nearbySliderRef.current?.addEventListener("scroll", handleScroll);

    const intervalId = setInterval(() => {
      if (nearbySliderRef.current && isAutoscrolling) {
        const slideWidth = nearbySliderRef.current.children[0].clientWidth;
        const nextIndex = currentIndex + 1;
        if (nextIndex >= nearbySliderRef.current.children.length) {
          setIsAutoscrolling(false);
        } else {
          nearbySliderRef.current.scrollBy({
            left: slideWidth,
            behavior: "smooth",
          });
          setCurrentIndex(nextIndex);
        }
      }
    }, 3000);

    return () => {
      nearbySliderRef.current?.removeEventListener("scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, [nearbySliderRef, setCurrentIndex, currentIndex, isAutoscrolling]);

  return (
    <header>
      <div className="relative z-10 w-full md:hidden">
        <div
          ref={nearbySliderRef}
          className="flex w-full snap-x snap-mandatory overflow-scroll scroll-smooth"
        >
          {(tourImageList.length
            ? tourImageList.slice(0, 7)
            : Array.from({ length: 1 })
          ).map((item: any, idx: number) => (
            <div
              key={idx}
              className="GA_4_TTD_BANNER_TRIGGER w-full flex-shrink-0 snap-start"
            >
              <ImageSlider
                data={item}
                imageHeight="h-[320px]"
                setIsCollegeOpen={setIsCollegeOpen}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 p-4">
          {(tourImageList.length
            ? tourImageList.slice(0, 7)
            : Array.from({ length: 1 })
          ).map((_ : any , idx: number) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex ? "bg-secondary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      

 <div className="mx-auto max-w-[1200px] pt-4 px-4 md:px-10 xl:px-0 relative max-md:z-10 max-md:-mt-2.5 max-md:overflow-hidden max-md:rounded-t-xl md:block space-y-1">
  <Breadcrumbs />

  {/* trip name */}
  <h1 className="text-2xl font-bold text-gray-700 sm:text-2xl md:text-3xl tracking-tighter">
    {tourData.tour_Name}
  </h1>

  {/* highlight & rating section */}
  <TourHeadBanner
    featureList={
      tourData.tour_Type
        ? [tourData.tour_Type]
        : ["SightSeeing", "Culture", "Food"]
    }
    tourRating={tourData.tour_Rating}
    totalRatingCount={tourData?.tour_Review_Count}
    tourDuration={tourData.tour_Duration}
  />
</div>

    </header>
  );
}
