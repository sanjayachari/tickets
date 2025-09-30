// import SliderCarousel from "@/components/common/SliderCarousel";
// import {
//   getListOfTourDataWithSameCity,
//   getNearybyPackages,
// } from "@/lib/firebase/thingsToDoHandler";
import React, { useEffect, useState } from "react";
// import TripCard from "../TripCard";
// import { TripCardSkeleton } from "@/components/skeleton/ThingsToDoSkeleton";
import SliderCarousel from "../common/SliderCarousel";
import { getListOfTourDataWithSameCity, getNearybyPackages } from "@/app/lib/firebase/thingsToDoHandler";
import TripCard from "./TripCard";
import { TripCardSkeleton } from "../skeleton/ThingsToDoSkeleton";

type Props = {
  tourSlug: string;
  data: any[];
  tourType: string;
};

export default function TourNearbyList({ tourSlug, data, tourType }: Props) {
  const [nearbyList, setNearbyList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!data.length) return;

    const getNearbyPackageList = async () => {
      setIsLoading(true);

      try {
        const res = await getListOfTourDataWithSameCity(data[0]);
        if (res.status) {
          const list = await getNearybyPackages(tourSlug, data[0], tourType);
          setNearbyList([...new Set(list)]);
        }
      } catch (error) {
        console.error("Error fetching nearby packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getNearbyPackageList();
  }, [tourSlug, data]);

  if (isLoading) {
    return (
      <section className="overflow-hidden">
        <h2 className="text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
          Nearby Tours
        </h2>
        <div className="container-snap mt-4 flex gap-4 overflow-x-scroll">
          {[...Array(4)].map((_, idx) => (
            <TripCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (!nearbyList.length) return null;

  return (
    <section className="relative">
      <h2 className="text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
        Nearby Tours
      </h2>
      <SliderCarousel position="top">
        {nearbyList.slice(0, 7).map((item: any, idx: number) => (
          <TripCard
            key={`trip-card-${idx}`}
            data={item}
            imageHeight="min-h-[200px]"
            headingType="h3"
          />
        ))}
      </SliderCarousel>
    </section>
  );
}
