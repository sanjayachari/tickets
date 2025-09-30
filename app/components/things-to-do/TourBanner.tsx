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

      <div className="wrapper relative bg-white max-md:z-10 max-md:-mt-2.5 max-md:overflow-hidden max-md:rounded-t-xl md:block">
        {/* breadcrumb and highlight section */}
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

        {/* trip name and reviews */}
        <h1 className="text-2xl font-bold text-secondary sm:text-2xl md:text-3xl">
          {tourData.tour_Name}
        </h1>

        {tourData.tour_Rating ? (
          <Link href={"#reviews"} className="mt-1 block md:hidden">
            <div className="flex items-center justify-between">
              <span>⭐ {tourData.tour_Rating} / 5</span>
              <span className="border-b border-black">
                {tourData?.tour_Review_Count} Reviews
              </span>
            </div>
          </Link>
        ) : null}
        {/* <p
          className="mt-0.5 md:hidden"
          dangerouslySetInnerHTML={{ __html: tourData.tour_Info }}
        />

        {/* images section */}
        <div className="hidden md:block">
          <div className="flex h-[240px] w-full gap-2.5 md:my-2 md:h-[400px]">
            <div className="relative h-full w-full overflow-hidden md:w-[70%] md:rounded-l-lg">
              {tourImageList[0] ? (
                <Image
                  src={tourImageList[0].image_Url}
                  alt={"main image of trip"}
                  title={"main image of trip"}
                  priority
                  width={800}
                  height={600}
                  quality={10}
                  className="GA_4_TTD_BANNER_TRIGGER w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                  onClick={() => setIsCollegeOpen(true)}
                />
              ) : (
                <FallbackImage />
              )}
            </div>

            <div className="hidden h-full w-[40%] gap-2.5 overflow-hidden md:relative md:flex lg:w-[60%]">
              <div className="flex h-full w-full flex-col space-y-2.5">
                <div className="h-full overflow-hidden md:relative md:rounded-tr-lg lg:rounded-none">
                  {tourImageList[1] ? (
                    <Image
                      src={tourImageList[1].image_Url}
                      alt={"trip image 2"}
                      title={"trip image 2"}
                      quality={10}
                      width={400}
                      height={100}
                      priority
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                      onClick={() => setIsCollegeOpen(true)}
                    />
                  ) : (
                    <FallbackImage />
                  )}
                </div>
                <div className="h-full overflow-hidden md:relative md:rounded-br-lg lg:rounded-none">
                  {tourImageList[2] ? (
                    <>
                      <Image
                        src={tourImageList[2].image_Url}
                        alt={"trip image 2"}
                        title={"trip image 2"}
                        quality={10}
                        width={400}
                        height={100}
                        priority
                        unoptimized
                        className="GA_4_TTD_BANNER_TRIGGER h-full w-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                        onClick={() => setIsCollegeOpen(true)}
                      />
                      {tourImageList.length - 3 > 0 && (
                        <div
                          onClick={() => setIsCollegeOpen(true)}
                          className="absolute bottom-4 right-4 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black/50 p-2 px-4 text-white lg:hidden"
                        >
                          <Image
                            src={"/icons/things-to-do/gallary.svg"}
                            alt={"trip image 4"}
                            title={"trip image 4"}
                            quality={10}
                            width={400}
                            height={100}
                            className="relative h-[15px] w-[15px] object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                          />
                          {tourImageList.length - 3}+
                        </div>
                      )}
                    </>
                  ) : (
                    <FallbackImage />
                  )}
                </div>
              </div>
              <div className="hidden h-full w-full flex-col space-y-2.5 lg:flex">
                <div className="h-full overflow-hidden md:relative md:rounded-tr-lg">
                  {tourImageList[3] ? (
                    <Image
                      src={tourImageList[3].image_Url}
                      alt={"trip image 2"}
                      title={"trip image 2"}
                      quality={10}
                      width={400}
                      height={100}
                      priority
                      className="GA_4_TTD_BANNER_TRIGGER h-full w-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                      onClick={() => setIsCollegeOpen(true)}
                    />
                  ) : (
                    <FallbackImage />
                  )}
                </div>
                <div className="h-full overflow-hidden md:relative md:rounded-br-lg">
                  {tourImageList[4] ? (
                    <>
                      <Image
                        src={tourImageList[4].image_Url}
                        alt={"trip image 2"}
                        title={"trip image 2"}
                        quality={10}
                        width={400}
                        height={100}
                        priority
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                        onClick={() => setIsCollegeOpen(true)}
                      />
                      {tourImageList.length - 5 > 0 && (
                        <div
                          onClick={() => setIsCollegeOpen(true)}
                          className="absolute bottom-4 right-4 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black/50 p-2 px-4 text-white"
                        >
                          <Image
                            src={"/icons/things-to-do/gallary.svg"}
                            alt={"trip image 4"}
                            title={"trip image 4"}
                            quality={10}
                            width={400}
                            height={100}
                            className="GA_4_TTD_BANNER_TRIGGER relative h-[15px] w-[15px] object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                          />
                          {tourImageList.length - 5}+
                        </div>
                      )}
                    </>
                  ) : (
                    <FallbackImage />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
