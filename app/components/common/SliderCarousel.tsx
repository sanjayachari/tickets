// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";

interface PageProps {
  children: React.ReactNode;
  position?: "top" | "side";
}

export default function SliderCarousel({ children, position }: PageProps) {
  const slideContainerRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;
      const currentScroll = slideContainerRef.current.scrollLeft;

      slideContainerRef.current.scrollTo({
        left: currentScroll + cardWidth,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (slideContainerRef.current) {
      const cardWidth =
        slideContainerRef.current.querySelector(".snap-start")?.clientWidth ??
        0;
      const currentScroll = slideContainerRef.current.scrollLeft;

      slideContainerRef.current.scrollTo({
        left: currentScroll - cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex w-full">
      {position === "side" ? (
        <>
          <ChevronLeftIcon
            onClick={prevSlide}
            className="absolute -left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
          />
          <ChevronRightIcon
            onClick={nextSlide}
            className="absolute -right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
          />
        </>
      ) : (
        <>
          <ArrowLeftIcon
            onClick={prevSlide}
            className="absolute -top-4 right-12 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
          />
          <ArrowRightIcon
            onClick={nextSlide}
            className="absolute -top-4 right-0 z-10 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-[0px_0px_7px_rgba(0,0,0,0.25)]"
          />
        </>
      )}

      <div
        ref={slideContainerRef}
        className="container-snap relative mt-4 flex w-full snap-x snap-mandatory items-start gap-4 overflow-x-scroll"
      >
        {children}
      </div>
    </div>
  );
}
