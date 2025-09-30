
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const PopularHotels = () => {
  return (
    <div
      className={`relative min-w-[320px] cursor-pointer overflow-hidden rounded-xl border-2 p-3 ${shimmer}`}
    >
      <div className="absolute -left-[5px] -top-[5px] z-10 h-24 w-24 overflow-hidden before:absolute before:right-0 before:top-0 before:-z-10 before:border-[3px] before:border-secondary/50 after:absolute after:bottom-0 after:left-0 after:-z-10 after:border-[3px] after:border-secondary/50">
        <div className="absolute -left-[42px] top-6 h-6 w-[160px] -rotate-45 bg-gray-300"></div>
      </div>

      <div className="flex items-stretch gap-2.5">
        <div className="max-w-48 relative aspect-[4/3] w-[40%] overflow-hidden rounded-md bg-gray-300"></div>
        <div className="w-[60%]">
          <div className="mb-2 h-4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 rounded bg-gray-300"></div>
          <div className="mt-0.5 flex space-x-1 py-0.5">
            {[...Array(3)].map((_, idx: number) => (
              <div
                key={`star-${idx}`}
                className="h-5 w-5 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 hidden items-start justify-between md:flex">
        <div className="h-6 w-24 rounded-full bg-gray-300"></div>
        <div className="text-right">
          <div className="mb-1 h-6 w-24 rounded bg-gray-300"></div>
          <div className="h-4 w-16 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

const Hotel = () => {
  return (
    <div
      className={`relative mt-2 flex h-[260px] min-w-[230px] max-w-[235px] cursor-pointer snap-start flex-col justify-between overflow-hidden rounded-xl border-2 p-2 text-sm lg:text-base ${shimmer}`}
    >
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-lg bg-gray-300"></div>

      <div className="mt-2 h-6 w-3/4 rounded bg-gray-300"></div>

      <div className="mt-2 flex space-x-1">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="h-5 w-5 rounded-full bg-gray-300"></div>
        ))}
      </div>

      <div className="mt-2 h-6 w-1/2 rounded bg-gray-300"></div>
    </div>
  );
};

export const NearbyHotelsSkeleton = () => {
  return (
    <div className={`relative overflow-hidden ${shimmer}`}>
      {/* <div className="flex items-center justify-between">
        <div className="mb-2 h-8 w-40 rounded bg-gray-300"></div>
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 p-1"></div>
          <div className="h-9 w-9 rounded-full bg-gray-300 p-1"></div>
        </div>
      </div> */}

      <div className="flex w-full">
        <div className="container-snap  flex w-full items-end gap-5 overflow-x-scroll px-1">
          {[...Array(5)].map((_, index) => (
            <Hotel key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PropertiesSkeleton = () => {
  return <div className={`${shimmer} relative h-5 w-48 rounded bg-gray-300`} />;
};

export const FilterSkeleton = () => {
  return (
    <div className={`${shimmer} relative flex items-center gap-1.5`}>
      <div className="h-5 w-5 rounded border-2 bg-gray-300" />
      <div className="h-5 w-36 rounded bg-gray-300" />
    </div>
  );
};

export const PriceSkeleton = () => {
  return (
    <div className={`${shimmer} relative space-y-3 overflow-hidden`}>
      <div className="h-4 w-28 rounded bg-gray-300" />
      <div className="h-7 w-40 rounded bg-gray-300" />
    </div>
  );
};

export const PriceSkeleton2 = () => {
  return (
    <div className={`${shimmer} relative gap-1.5 space-y-2 overflow-hidden`}>
      <div className="h-6 w-36 rounded bg-gray-300" />
    </div>
  );
};

export const FiltersSkeleton = () => {
  return (
    <div className="space-y-2">
      <FilterSkeleton />
      <FilterSkeleton />
      <FilterSkeleton />
      <FilterSkeleton />
      <FilterSkeleton />
    </div>
  );
};
