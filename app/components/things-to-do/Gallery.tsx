import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FallbackImage from "../common/FallbackImage";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { TourImageDetails } from "@/app/classes/tourAndTravels/TourPackageInfo";

interface Props {
  imageList: TourImageDetails[];
  imageIndex?: number;
  onClose: () => void;
}

export default function Gallery({ imageList, imageIndex = 0, onClose }: Props) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [leftIcon, setLeftIcon] = useState<boolean>(false);
  const [rightIcon, setRightIcon] = useState<boolean>(true);

  // Handle next slide
  const handleNextImage = () => {
    if (imageRef.current) {
      const imageWidth =
        imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
      const currentScroll = imageRef.current.scrollLeft;
      const maxScroll =
        imageRef.current.scrollWidth - imageRef.current.clientWidth;

      imageRef.current.scrollTo({
        left: currentScroll + imageWidth,
        behavior: "smooth",
      });

      setLeftIcon(true);
      if (currentScroll + imageWidth >= maxScroll) {
        setRightIcon(false);
      }
    }
  };

  // Handle previous slide
  const handlePrevImage = () => {
    if (imageRef.current) {
      const imageWidth =
        imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
      const currentScroll = imageRef.current.scrollLeft;
      imageRef.current.scrollTo({
        left: currentScroll - imageWidth,
        behavior: "smooth",
      });

      setRightIcon(true);
      if (currentScroll - imageWidth <= 0) {
        setLeftIcon(false);
      }
    }
  };

  // Handle scroll from mouse or touchpad
  const handleScroll = () => {
    if (imageRef.current) {
      const currentScroll = imageRef.current.scrollLeft;
      const maxScroll =
        imageRef.current.scrollWidth - imageRef.current.clientWidth;

      setLeftIcon(currentScroll > 0);
      setRightIcon(currentScroll < maxScroll);
    }
  };

  // Scroll to the received image index when the component mounts
  useEffect(() => {
    if (imageRef.current && imageList.length > 0) {
      const imageWidth =
        imageRef.current.querySelector(".snap-center")?.clientWidth ?? 0;
      imageRef.current.scrollTo({
        left: imageWidth * imageIndex,
        behavior: "instant", // Instant scroll to prevent animation delay
      });

      // Update Chevron visibility
      setLeftIcon(imageIndex > 0);
      setRightIcon(imageIndex < imageList.length - 1);

      imageRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [imageList, imageIndex]); // Depend on imageList and imageIndex

  return (
    <div className="container-snap fixed inset-0 z-50 overflow-y-scroll bg-black/95">
      <div className="relative h-full w-full">
        <div className="fixed inset-x-0 top-0 z-10 shadow-sm">
          <div className="wrapper py-2">
            <div
              onClick={onClose}
              className="flex w-fit cursor-pointer items-center gap-0.5 rounded p-1 pr-2 font-semibold tracking-wide text-white hover:bg-primary"
            >
              <ChevronLeftIcon className="h-6 w-6" />
              Close
            </div>
          </div>
        </div>

        <div className="wrapper relative grid h-full w-full place-items-center text-secondary">
          <ChevronLeftIcon
            onClick={handlePrevImage}
            className={`absolute left-5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-light p-1 shadow-lg sm:left-10 sm:h-12 sm:w-12 
                ${leftIcon ? "" : "hidden"}`}
          />
          <div
            ref={imageRef}
            className="container-snap mx-auto flex aspect-square w-full snap-x snap-mandatory overflow-x-scroll sm:aspect-video sm:w-[74%] xl:min-w-[90%]"
          >
            {/* {imageList?.map((el, index) => {
              const image =
                "image_Url" in el
                  ? el.image_Url
                  : "url" in el
                    ? el.url
                    : "/images/placeholder.svg";

              return (
                <div key={index} className="h-full min-w-full snap-center">
                  {image ? (
                    <Image
                      src={image}
                      alt={`image ${index + 1}`}
                      width={480}
                      height={270}
                      unoptimized
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <FallbackImage />
                  )}
                </div>
              );
            })} */}
          </div>
          <ChevronRightIcon
            onClick={handleNextImage}
            className={`absolute right-5 top-1/2 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-light p-1 shadow-lg sm:right-10 sm:h-12 sm:w-12 
                ${rightIcon ? "" : "hidden"}`}
          />
        </div>
      </div>
    </div>
  );
}
