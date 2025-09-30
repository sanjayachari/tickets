import { useEffect, useState } from "react";
// import { TourPlanInformation } from "@/lib/classModels/tourAndTravels/TourPlanInformation";
import { TourPlansInfo } from "./TourPlansInfo";
import { useSelector } from "react-redux";
// import {
//   selectSearchedDate,
//   selectTourBookingCardLoading,
// } from "@/lib/redux/tourBookingSlice";

// import { TourPlanCardSkeleton2 } from "@/components/skeleton/ThingsToDoSkeleton";
import { useSearchParams } from "next/navigation";
// import { TourPackageInfo } from "@/lib/classModels/tourAndTravels/TourPackageInfo";
import { TourPlanInformation } from "@/app/classes/tourAndTravels/TourPlanInformation";
import { selectSearchedDate, selectTourBookingCardLoading } from "@/app/lib/redux/tourBookingSlice";
import { TourPlanCardSkeleton2 } from "../../skeleton/ThingsToDoSkeleton";
import { TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";

interface TourPlansListProps {
  tourData: TourPackageInfo;
  tourPlansList: TourPlanInformation[];
  planRef: any;
  createTourBooking: () => void;
  slotModel: boolean;
  selectedSlot: string | null;
  setSlotModel: any;
}

export const TourPlansList = ({
  tourData,
  tourPlansList,
  planRef,
  createTourBooking,
  slotModel,
  setSlotModel,
  selectedSlot,
}: TourPlansListProps) => {
 
  const searchParams = useSearchParams();
  const planId = searchParams.get("pid"); // ✅ safely get ?pid=...

  
  const searchedDate = useSelector(selectSearchedDate);
  const isLoading = useSelector(selectTourBookingCardLoading);
  const [activeIdx, setActiveIdx] = useState(0);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [flag, setFlag] = useState(true);
  const [isAllPlans, setIsAllPlans] = useState(false);
  const isActivity = tourData.tour_Type === "Activity";
  const isTicket = tourData.tour_Type === "Ticket-Only";
  const isTour = !(isActivity || isTicket);

  const shouldForceSoldOut = (tourData: TourPackageInfo) => {
    const now = new Date();
    const searched = new Date(searchedDate);

    const isFriday = searched.getDay() === 5;
    const isTajMahal =
      tourData.tour_Point_Of_Interest_Slug_List?.includes("taj-mahal-agra");

    const isToday =
      now.getFullYear() === searched.getFullYear() &&
      now.getMonth() === searched.getMonth() &&
      now.getDate() === searched.getDate();

    const isAfter459PM =
      now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 59);

    if ((isFriday && isTajMahal) || (isToday && isAfter459PM)) {
      return true;
    }

    return false;
  };

  const availablePlansList = () => {
    let plans = tourPlansList.filter( (planInfo) => planInfo.tourPlan_Inventory_Count > 0 || isAllPlans);
    if (shouldForceSoldOut(tourData)) {
      return [];
    }
    return plans;
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  const filteredPlans = availablePlansList();

  useEffect(() => {
    console.log('planId' , planId)
    if (planId) {
      const foundIndex = tourPlansList.findIndex(
        (plan) => plan.tourPlan_Id === planId,
      );
      if (foundIndex !== -1) {
        setActiveIdx(foundIndex);
      }
    } else {
      setActiveIdx(0);
    }

    setTimeout(() => {
      setFlag(false);
    }, 100);
  }, [planId, tourPlansList]);

console.log('tourPlansList___' , tourPlansList.length)
  console.log('_____edPlans____' , filteredPlans.length > 0 )
  console.log(':::::' , isLoading , flag , skeletonLoading)
  return (
    <div className="mb-2 flex w-full flex-col lg:mt-2">
      <h2 className="mb-1 text-lg font-semibold text-secondary sm:text-xl md:text-2xl">
        Our Plans
      </h2>
      {/* {tourPlansList.length > 1 && !isTour && (
        <div className="sticky top-16 my-2 w-full space-x-2 bg-white py-2 md:top-0">
          <button
            className={`rounded-full px-4 py-1 font-medium text-white hover:shadow-md ${isAllPlans ? "bg-primary" : "bg-secondary hover:bg-gray-500"}`}
            onClick={() => setIsAllPlans(true)}
          >
            All Plans
          </button>
          <button
            className={`rounded-full px-4 py-1 font-medium text-white hover:shadow-md ${!isAllPlans ? "bg-primary" : "bg-secondary hover:bg-gray-500"}`}
            onClick={() => setIsAllPlans(false)}
          >
            Available Plans
          </button>
        </div>
      )} */}
      <div ref={planRef} className="flex flex-col space-y-3">
        {isLoading || flag || skeletonLoading ? (
          [...Array(tourPlansList.length)].map((_, item) => (
            <TourPlanCardSkeleton2 key={item} isActive={activeIdx === item} />
          ))
        ) : filteredPlans.length > 0 ? (
          filteredPlans.map(
            (tourDetails: TourPlanInformation, index: number) => (
              <TourPlansInfo
                key={index}
                tourData={tourData}
                tourPlanInfo={tourDetails}
                tourIdx={index}
                activeIdx={activeIdx}
                setActiveIdx={setActiveIdx}
                createTourBooking={createTourBooking}
                setSlotModel={setSlotModel}
                selectedSlot={selectedSlot}
              />
            ),
          )
        ) : (
          <div className="mb-2 rounded-lg border-[1px] border-gray-200 bg-gray-100 p-4">
            <p className="text-2xl font-bold tracking-wide text-red-700">
              Sold Out
            </p>
            <p className="text-lg font-bold tracking-wide text-red-700">
              Please choose another date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
