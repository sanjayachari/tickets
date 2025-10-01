// import { CityTourListSkeleton } from "@/components/skeleton/ThingsToDoSkeleton";
// import { getListOfTourIdsWithSameCity } from "@/lib/firebase/thingsToDoHandler";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CityTourListSkeleton } from "../skeleton/ThingsToDoSkeleton";
import { getListOfTourIdsWithSameCity } from "@/app/lib/firebase/thingsToDoHandler";

interface Props {
  data: string[];
}

export default function TourBacklinks({ data }: Props) {
  const [cityTourLists, setCityTourLists] = useState<Record<string, any[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!data.length) return;

    const fetchTourLists = async () => {
      setIsLoading(true); // Start loading

      const cityLists: Record<string, any[]> = {};
      await Promise.all(
        data.map(async (city) => {
          const similarList = await getListOfTourIdsWithSameCity(city);
          cityLists[city] = similarList ?? [];
        }),
      );

      setCityTourLists(cityLists);
      setIsLoading(false); // Stop loading only after fetching
    };

    fetchTourLists();
  }, [data]);

  return (
    <section className="wrapper space-y-5 border-t border-gray-200">
      {isLoading ? (
        <CityTourListSkeleton />
      ) : (
        data.map((city, idx) => (
          <div key={`${city}-name-${idx}`} className="rounded-xl border border-gray-200 p-3 sm:p-5">
            <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
              Things to do in {city}
            </h2>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 lg:grid-cols-2">
              {cityTourLists[city]?.map(
                (
                  item: { tourSlugName: string; tourName: string },
                  linkIdx: number,
                ) => (
                  <h3 key={`link-${linkIdx}`}>
                    <Link
                      target="_blank"
                      href={`/things-to-do/${item.tourSlugName}`}
                      className="flex items-center text-sm text-blue-800 hover:underline"
                    >
                      {item.tourName}
                    </Link>
                  </h3>
                ),
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
