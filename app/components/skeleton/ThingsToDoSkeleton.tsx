const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const CityTourListSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded border-2 bg-gray-100 p-4`}
    >
      {/* Skeleton Title */}
      <div className="h-6 w-1/2 rounded bg-gray-400"></div>

      {/* Skeleton List */}
      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="h-5 w-full rounded bg-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export const TripCardSkeleton = () => {
  return (
    <div
      className={`${shimmer} group relative flex min-w-[250px] min-h-[200px] snap-start flex-col space-y-4 overflow-hidden rounded-2xl border bg-gray-100 p-3`}
    >
      {/* Image Placeholder */}
      <div className="relative grid h-[120px] w-full place-items-center overflow-hidden rounded bg-gray-300">
        <svg
          className="aspect-square w-[4vw] text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>

      {/* Content Placeholder */}
      <div className="space-y-2">
        {/* Title */}
        <div className="h-6 w-3/4 rounded bg-gray-400"></div>

        {/* Duration */}
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 rounded bg-gray-400"></div>
          <div className="h-5 w-1/3 rounded bg-gray-300"></div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1">
          <div className="h-6 w-1/4 rounded bg-gray-400"></div>
          <div className="h-4 w-12 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export const TourPlanCardSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full overflow-hidden rounded-lg border-2 bg-gray-100 p-4 shadow-lg`}
    >
      <div>
        {/* Skeleton Title */}
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>

        {/* Skeleton Info */}
        <div className="mt-2 h-2 w-full rounded bg-gray-300"></div>
        <div className="mt-1 h-2 w-5/6 rounded bg-gray-300"></div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {/* Skeleton Price */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 rounded bg-gray-400"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>

        {/* Skeleton Button */}
        <div className="h-8 w-20 rounded-2xl bg-gray-400"></div>
      </div>
    </div>
  );
};

export const TourPlanCardSkeleton2 = ({ isActive = false }) => {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden rounded-lg border border-secondary bg-gray-100`}
    >
      <div className="flex w-full p-5 py-8">
        <div className="flex w-full flex-col">
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex w-full">
                <div className="mr-2 h-5 w-5 rounded-full border-2 border-secondary bg-gray-300" />
                <div className="h-6 w-1/3 rounded bg-gray-300" />
              </div>
              {isActive && (
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full rounded bg-gray-300" />
                  <div className="h-4 w-3/4 rounded bg-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`h-[1px] w-full bg-gray-400 ${isActive ? "" : "md:hidden"}`}
      />

      {isActive && (
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center justify-between space-y-2 p-5 md:flex-row md:space-x-2 md:space-y-0">
            <div className="flex w-full flex-col space-y-1">
              <div className="h-4 w-3/4 rounded bg-gray-300" />
              <div className="h-5 w-1/2 rounded bg-gray-300" />
            </div>
            <div className="h-10 w-full rounded-lg bg-gray-300 md:w-24" />
          </div>
        </div>
      )}
    </div>
  );
};

export const TourCardSkeleton = () => {
  return (
    <div
      className={`${shimmer} relative w-full min-w-[320px] snap-start overflow-hidden rounded-lg border-2 bg-gray-200`}
    >
      {/* Image Placeholder */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="h-full w-full bg-gray-300" />
      </div>

      {/* Content Placeholder */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(4)].map((_, idx) => (
              <div
                key={`star-${idx}`}
                className="h-4 w-4 rounded-full bg-gray-400"
              />
            ))}
          </div>
          <div className="h-4 w-12 rounded-full bg-gray-400" />
        </div>

        {/* Tour Name */}
        <div className="mb-2 h-12">
          <div className="h-5 w-3/4 rounded-full bg-gray-500" />
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded-full bg-gray-400" />
          <div className="h-8 w-24 rounded bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export const TourBannerSkeleton = () => {
  return (
    <header>
      {/* Mobile Slider Section */}
      <div className="relative z-10 w-full md:hidden">
        <div
          className={`${shimmer} flex w-full snap-x snap-mandatory overflow-scroll scroll-smooth`}
        >
          {/* Skeleton for 7 image slides */}
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className="w-full flex-shrink-0 snap-start">
              <div className="h-[320px] w-full rounded bg-gray-300" />
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 p-4">
          {[...Array(7)].map((_, idx) => (
            <span key={idx} className="h-2 w-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="wrapper relative bg-white max-md:z-10 max-md:-mt-2.5 max-md:overflow-hidden max-md:rounded-t-xl md:block">
        {/* TourHeadBanner Skeleton */}
        <div
          className={`${shimmer} mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between`}
        >
          {/* Feature List */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-6 w-20 rounded bg-gray-300" />
            ))}
          </div>
          {/* Rating */}
          <div className="h-6 w-24 rounded bg-gray-300" />
        </div>

        {/* Title and Info */}
        <div className="mt-4">
          <div className="h-8 w-3/4 rounded bg-gray-300 md:h-10" />{" "}
          {/* Tour Name */}
          <div className="mt-2 h-4 w-full rounded bg-gray-300 md:hidden" />{" "}
          {/* Tour Info (mobile only) */}
        </div>

        {/* Desktop Image Section */}
        <div className="hidden md:block">
          <div
            className={`${shimmer} flex h-[240px] w-full gap-2.5 md:my-2 md:h-[400px]`}
          >
            {/* Main Image (70%) */}
            <div className="h-full w-full overflow-hidden bg-gray-300 md:w-[70%] md:rounded-l-lg" />

            {/* Right Column (40% on md, 60% on lg) */}
            <div className="hidden h-full w-[40%] gap-2.5 md:flex lg:w-[60%]">
              {/* First Column (2 images) */}
              <div className="flex h-full w-full flex-col space-y-2.5">
                <div className="h-full bg-gray-300 md:rounded-tr-lg lg:rounded-none" />
                <div className="h-full bg-gray-300 md:rounded-br-lg lg:rounded-none" />
              </div>
              {/* Second Column (2 images, lg only) */}
              <div className="hidden h-full w-full flex-col space-y-2.5 lg:flex">
                <div className="h-full bg-gray-300 md:rounded-tr-lg" />
                <div className="h-full bg-gray-300 md:rounded-br-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
