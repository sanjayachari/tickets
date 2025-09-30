import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { isToday } from "date-fns";
import { useEffect, useState } from "react";
// import { XCircleIcon } from "@heroicons/react/solid";
// import {
//   convertTo12HourFormat,
//   containsAnySubstring,
//   priceCurrencyConvertor,
// } from "@/src/utils";
// import { TourPlanInformation } from "@/lib/classModels/tourAndTravels/TourPlanInformation";

// import {
//   addTour,
//   removeSamePlanType,
//   selectCurrencySymbol,
//   selectSearchedAdultCount,
//   selectSearchedChildCount,
//   selectPlansList,
//   selectTourPlanMapping,
//   selectTourStartDate,
//   selectCurrencyValue,
//   selectTourBookingInfo,
//   setTourBookingCardLoading,
//   selectSearchedDate,
// } from "@/lib/redux/tourBookingSlice";


// import {
//   LocationInfo,
//   TourPackageInfo,
// } from "@/lib/classModels/tourAndTravels/TourPackageInfo";

// import { PlanDetails } from "@/lib/classModels/bookings/planDetails";

import { XCircleIcon } from "lucide-react";
import { convertTo12HourFormat } from "@/app/lib/utils/convertTo12HourFormat/convertTo12HourFormat";
import { containsAnySubstring } from "@/app/lib/utils/containsAnySubstring/containsAnySubstring";
import { TourPlanInformation } from "@/app/classes/tourAndTravels/TourPlanInformation";
import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
import { addTour, removeSamePlanType, selectCurrencySymbol, selectCurrencyValue, selectPlansList, selectSearchedAdultCount, selectSearchedChildCount, selectSearchedDate, selectTourBookingInfo, selectTourPlanMapping, selectTourStartDate, setTourBookingCardLoading } from "@/app/lib/redux/tourBookingSlice";
import { LocationInfo, TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";
import { PlanDetails } from "@/app/classes/bookings/planDetails";

interface TourPlansInfoProps {
  tourPlanInfo: TourPlanInformation;
  tourData: TourPackageInfo;
  tourIdx: number;
  activeIdx: number;
  setActiveIdx: Function;
  createTourBooking: () => void;
  selectedSlot: string | null;
  setSlotModel: any;
}

export const TourPlansInfo = ({
  tourPlanInfo,
  tourData,
  tourIdx,
  activeIdx,
  setActiveIdx,
  createTourBooking,
  selectedSlot,
  setSlotModel,
}: TourPlansInfoProps) => {

  console.log('RENDERED')

  const dispatch = useDispatch();
  const isActive = tourIdx === activeIdx;
  const isActivity = tourData.tour_Type === "Activity";
  const isTicket = tourData.tour_Type === "Ticket-Only";
  const isTour = !(isActivity || isTicket);
  const isPlanAvailable = tourPlanInfo.tourPlan_Inventory_Count > 0;
  const [selectedPickupTime, setSelectedPickupTime] = useState("");
  const [selectedDropoffTime, setSelectedDropoffTime] = useState("");
  const tourStartDate = useSelector(selectTourStartDate);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const currencyValue = useSelector(selectCurrencyValue);
  const tourPlanMap = useSelector(selectTourPlanMapping);
  const searchedAdultCount = useSelector(selectSearchedAdultCount);
  const searchedChildCount = useSelector(selectSearchedChildCount);
  // const childCount = isTour ? searchedChildCount : 0;
  const selectedTourPlansList = useSelector(selectPlansList);
  const tourBookingInfo = useSelector(selectTourBookingInfo);
  const searchedDate = useSelector(selectSearchedDate);
  const isChildPlan = containsAnySubstring(tourPlanInfo.tourPlan_Title);
  console.log('tourPlanMap' , tourPlanMap)
  useEffect(() => {
    setSelectedPickupTime(selectedSlot ?? "");
  }, [selectedSlot]);

  const adultCount = isTour ? searchedAdultCount : 1;
  const childCount = isTour ? searchedChildCount : 0;

  const adultPrice =
    tourPlanInfo.tourPlan_Adult_Price_Date_Map[adultCount] ?? 0;
  const perAdultPrice = Math.ceil(Number((adultPrice / adultCount).toFixed(2)));
  const childPrice = tourPlanInfo.tourPlan_Child_Price_Map[childCount] ?? 0;
  const perChildPrice = Math.ceil(Number((childPrice / childCount).toFixed(2)));
  const totalPrice = Math.ceil(Number((adultPrice + childPrice).toFixed(2)));
  const planSelected = tourPlanMap[tourPlanInfo.tourPlan_Id] ? true : false;
  const availablePlanData = tourPlanMap[tourPlanInfo.tourPlan_Id];
  const guestType = isChildPlan ? "Child" : "Adult";

  const activatePlan = () => {
    if (activeIdx !== tourIdx) {
      setActiveIdx(tourIdx);
    }
  };
  const selectTourTiming = (isPickup: boolean = true, time: string) => {
    if (isPickup) {
      setSelectedPickupTime(time);
    } else {
      setSelectedDropoffTime(time);
    }
  };

  const maxPlanCount = Object.keys(
    tourPlanInfo.tourPlan_Adult_Price_Date_Map,
  ).length;
  const addTourPlan = () => {
    if (!selectedSlot && isTicket) {
      toast.error("Please select visiting time");
      setSlotModel(true);
      //scroll to time slot selector
      document.getElementById("time-slot-selector")?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
    if (
      tourPlanMap[tourPlanInfo.tourPlan_Id] &&
      tourPlanMap[tourPlanInfo.tourPlan_Id]["plan_Count"] >= maxPlanCount
    ) {
      toast.warning("Maximum number of tour selected");
      return;
    }

    // if (tourData.tour_Type === "Ticket-Only" && !selectedPickupTime) {
    //   toast.error("Please select visiting time");
    //   return;
    // }

    dispatch(
      addTour({
        planInfo: tourPlanInfo,
        startDate: tourStartDate,
        adultCount: isChildPlan ? 0 : adultCount,
        childCount: isChildPlan ? 1 : childCount,
        pickUp: new LocationInfo(
          tourPlanInfo.tourPlan_Pickup_Included,
          selectedPickupTime,
        ),
        dropOff: new LocationInfo(
          tourPlanInfo.tourPlan_Dropoff_Included,
          selectedDropoffTime,
        ),
      }),
    );
  };

  const removeTourPlanTypeHandler = () => {
    const indices: number[] = selectedTourPlansList
      .map((tourPlan: PlanDetails, index: number) =>
        tourPlan.plan_Id === tourPlanInfo.tourPlan_Id ? index : -1,
      )
      .filter((index : any ) => index !== -1);

    if (indices.length === 0) {
      return;
    }

    dispatch(removeSamePlanType({ planIdx: indices[indices.length - 1] }));
  };

  function getAvailableTimes(
    times: string[],
  ): { time: string; isDisabled: boolean; sortValue: number }[] {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return times
      .map((timeStr) => {
        const toMinutes = (timeStr: string) => {
          if (timeStr === "00:00") return 12 * 60; // Treat 00:00 as 720 minutes (12:00 PM)
          const [hour, minute] = timeStr.split(":").map(Number);
          return hour * 60 + minute;
        };

        const timeMinutes = toMinutes(timeStr);
        const isDisabled = isToday(searchedDate)
          ? timeMinutes < currentMinutes
          : false;

        return {
          time: timeStr,
          isDisabled,
          sortValue: timeMinutes,
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue);
  }

  const availablePickupTimings = getAvailableTimes(
    tourPlanInfo.tourPlan_Pickup_Timing_List,
  );

  useEffect(() => {
    if (planSelected && !(isActivity || isTicket)) {
      dispatch(setTourBookingCardLoading(true));
      setTimeout(() => {
        createTourBooking();
        dispatch(setTourBookingCardLoading(false));
      }, 300);
    }
  }, [planSelected]);

  console.log('availablePlanD__ata' , availablePlanData)
  console.log('isA' , isActive)

  return (
    <div
      className={`flex w-full flex-col rounded-lg border-secondary ${isActive ? "border-2" : "cursor-pointer border hover:shadow-md"}`}
    >
      <div className="flex w-full p-3 sm:p-5" onClick={activatePlan}>
        <div className="flex w-full flex-col">
          <div className="flex items-center">
            <div className="flex w-full">
              <div
                className={`mr-2 h-5 w-5 flex-shrink-0 rounded-full border-2 border-secondary ${isActive ? "bg-primary" : ""}`}
              />
              <h3 className="text-lg font-semibold leading-none">
                {tourPlanInfo.tourPlan_Title}
              </h3>
            </div>

            {!isActive && (
              <div className="ml-2 hidden flex-col items-end md:flex">
                {totalPrice > 0 && isPlanAvailable ? (
                  <div className="flex flex-col items-end">
                    <p className="flex whitespace-nowrap text-right text-sm font-semibold">{`${currencySymbol} ${priceCurrencyConvertor(totalPrice, currencyValue)?.toLocaleString("en-IN")}`}</p>
                    <p className="flex items-end whitespace-nowrap text-right text-xs">
                      <span className="">{`${adultCount} ${guestType} x ${currencySymbol}${priceCurrencyConvertor(perAdultPrice, currencyValue)?.toLocaleString("en-IN")}`}</span>
                      {childCount > 0 && (
                        <span className="">{`, ${childCount} Child x ${currencySymbol}${priceCurrencyConvertor(perChildPrice, currencyValue)?.toLocaleString("en-IN")}`}</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    {!isPlanAvailable ? (
                      <XCircleIcon className="size-7 fill-red-500" />
                    ) : (
                      <p className="text-center text-sm text-red-500">{`Max ${Object.keys(tourPlanInfo.tourPlan_Adult_Price_Date_Map).length} participants`}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {isActive && (
            <div className="mt-3 flex flex-col space-y-2">
              <p
                className="text-md text-justify"
                dangerouslySetInnerHTML={{
                  __html: tourPlanInfo.tourPlan_Description,
                }}
              />

              {isPlanAvailable && isTour && (
                <>
                  {/* Pickup Timing Section */}
                  <div className="flex w-full flex-col space-y-1">
                    <p className="align-middle">
                      {tourPlanInfo.tourPlan_Pickup_Included ? (
                        <span className="mr-2 font-semibold tracking-wide text-secondary">
                          Pickup Included
                        </span>
                      ) : (
                        <span className="mr-2 font-medium text-gray-500">
                          Pickup Not Included
                        </span>
                      )}
                    </p>
                    {tourPlanInfo.tourPlan_Pickup_Timing_List.length > 0 && (
                      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                        {tourPlanInfo.tourPlan_Pickup_Timing_List.map(
                          (pTime: string, pIdx: number) => (
                            <button
                              key={pIdx}
                              className={`whitespace-nowrap rounded-md px-3 py-2 ${selectedPickupTime === pTime ? "bg-secondary text-white" : "border-[1px] border-secondary"} `}
                              onClick={() => selectTourTiming(true, pTime)}
                            >
                              {convertTo12HourFormat(pTime)}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* Dropoff Timing Section */}
                  <div className="flex w-full flex-col space-y-1">
                    <p className="align-middle">
                      {tourPlanInfo.tourPlan_Dropoff_Included ? (
                        <span className="mr-2 font-semibold tracking-wide text-secondary">
                          Drop Included
                        </span>
                      ) : (
                        <span className="mr-2 font-medium text-gray-500">
                          Drop Not Included
                        </span>
                      )}
                    </p>
                    {tourPlanInfo.tourPlan_Dropoff_Timing_List.length > 0 && (
                      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                        {tourPlanInfo.tourPlan_Dropoff_Timing_List.map(
                          (dTime: string, pIdx: number) => (
                            <button
                              key={pIdx}
                              className={`whitespace-nowrap rounded-md px-3 py-2 ${selectedDropoffTime === dTime ? "bg-secondary text-white" : "border-[1px] border-secondary"} `}
                              onClick={() => selectTourTiming(false, dTime)}
                            >
                              {convertTo12HourFormat(dTime)}
                            </button>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={`h-[1px] w-full bg-gray-400 ${isActive ? "" : "md:hidden"}`}
      />

      {isActive && (
        <div className="flex w-full flex-col border-2 border-black">
          {totalPrice > 0 && isPlanAvailable ? (
            <div
              className={`flex flex-col items-center justify-between space-y-2 rounded-b-md px-3 py-3 align-middle sm:px-5 md:flex-row md:space-x-2 md:space-y-0`}
            >
              {isTour ? (
                <>
                  <div className="flex w-full flex-row justify-between whitespace-nowrap md:flex-col">
                    <div className="flex">
                      <p className="flex text-center align-middle text-sm">
                        {`${adultCount} ${adultCount > 1 ? guestType + "s" : guestType} x ${currencySymbol}${priceCurrencyConvertor(perAdultPrice, currencyValue)?.toLocaleString("en-IN")}`}
                      </p>
                      {childCount > 0 && (
                        <p className="ml-2 flex text-center align-middle">
                          {`+ ${childCount} ${childCount > 1 ? "Children" : "Child"} x ${currencySymbol}${priceCurrencyConvertor(perChildPrice, currencyValue)?.toLocaleString("en-IN")}`}
                        </p>
                      )}
                    </div>
                    <p className="flex text-center align-middle">
                      <span className="mr-1 text-lg">Total:</span>
                      <span className="text-lg font-semibold">
                        {`${currencySymbol} ${priceCurrencyConvertor(totalPrice, currencyValue)?.toLocaleString("en-IN")}`}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={addTourPlan}
                    className="GA_4_TTD_ADD_PLANS flex w-full justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2 font-semibold text-white hover:shadow-md md:w-fit"
                  >
                    Book Now
                  </button>
                </>
              ) : (
                <>
                  <div className="flex w-full flex-row justify-between whitespace-nowrap md:flex-col">
                    <div className="flex">
                      <p className="text-sm">{`${availablePlanData?.plan_Child_Count ? availablePlanData?.plan_Child_Count : (availablePlanData?.plan_Adult_Count ?? 1)} x ${currencySymbol}${priceCurrencyConvertor(perAdultPrice, currencyValue)?.toLocaleString("en-IN")}`}</p>
                      {availablePlanData?.plan_Child_Count > 0 && (
                        <p className="ml-2 flex text-center align-middle">
                          {`${availablePlanData?.plan_Child_Count} ${availablePlanData?.plan_Child_Count > 1 ? "Children" : "Child"} x ${currencySymbol}${priceCurrencyConvertor(perChildPrice ?? perAdultPrice, currencyValue)?.toLocaleString("en-IN")}`}
                        </p>
                      )}
                    </div>

                    {totalPrice * availablePlanData?.plan_Adult_Count +
                      totalPrice * availablePlanData?.plan_Child_Count >
                      0 && (
                      <p className="flex text-center align-middle">
                        <span className="mr-1 text-lg">Total:</span>
                        <span className="text-lg font-semibold">
                          {`${currencySymbol} ${priceCurrencyConvertor(totalPrice * availablePlanData?.plan_Adult_Count + totalPrice * availablePlanData?.plan_Child_Count, currencyValue)?.toLocaleString("en-IN")}`}
                        </span>
                      </p>
                    )}
                  </div>

                  {availablePlanData?.plan_Count > 0 ? (
                    <div className="flex h-11 items-center rounded-full border bg-secondary p-2">
                      <button
                        onClick={removeTourPlanTypeHandler}
                        className="h-9 w-9 rounded-full bg-secondary text-xl text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>

                      <span className="min-w-[40px] text-center text-xl font-semibold text-white">
                        {availablePlanData?.plan_Count}
                      </span>

                      <button
                        onClick={addTourPlan}
                        disabled={maxPlanCount <= availablePlanData?.plan_Count}
                        className="h-9 w-9 rounded-full bg-secondary text-xl text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={addTourPlan}
                      className="GA_4_TTD_ADD_PLANS h-11 w-full whitespace-nowrap rounded-full bg-primary px-5 py-2 font-semibold text-white hover:shadow-md md:w-fit"
                    >
                      Add Plan
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="flex space-x-2 rounded-b-md bg-gray-200 p-3 py-3 font-medium text-red-500 sm:px-5">
              {!isPlanAvailable
                ? `Inventory not available for selected date.`
                : `Please select ${Object.keys(tourPlanInfo.tourPlan_Adult_Price_Date_Map).length} participants or fewer for this activity.`}
            </div>
          )}
        </div>
      )}
      {!isActive &&
        (totalPrice > 0 && isPlanAvailable ? (
          <div className="flex w-full justify-between rounded-b-lg p-3 sm:p-5 md:hidden">
            <>
              <p className="flex whitespace-nowrap text-right text-base font-semibold">{`${currencySymbol} ${priceCurrencyConvertor(totalPrice, currencyValue)}`}</p>
              <p className="flex items-end whitespace-nowrap text-right text-sm">
                <span className="">{`${adultCount} ${guestType} x ${currencySymbol}${priceCurrencyConvertor(perAdultPrice, currencyValue)}`}</span>
                {childCount > 0 && (
                  <span className="">{`, ${childCount} Child x ${currencySymbol}${priceCurrencyConvertor(perChildPrice, currencyValue)}`}</span>
                )}
              </p>
            </>
          </div>
        ) : (
          <div
            className={`rounded-b-md bg-gray-200 p-3 text-red-500 sm:p-5 md:hidden`}
          >
            {!isPlanAvailable
              ? `Inventory not available for selected date.`
              : `Please select ${Object.keys(tourPlanInfo.tourPlan_Adult_Price_Date_Map).length} participants or fewer for this activity.`}
          </div>
        ))}

      {planSelected && (
        <div
          className={`flex w-full space-x-2 rounded-b-md border-t bg-gray-100 px-3 py-2 text-sm sm:px-5 ${isTour ? "" : "md:hidden"}`}
        >
          <div className="relative flex w-full items-center align-middle">
            <div className="relative space-x-1">
              <span>Selected:</span>
              <span className="whitespace-nowrap font-semibold">{`${availablePlanData?.plan_Count} ${availablePlanData?.plan_Count > 1 ? "plans" : "plan"}`}</span>
            </div>
            <div className="relative ml-1 space-x-1">
              <span>Includes:</span>
              {availablePlanData?.plan_Adult_Count > 0 && (
                <span className="whitespace-nowrap font-semibold">{`${availablePlanData?.plan_Adult_Count} ${availablePlanData?.plan_Adult_Count > 1 ? "adults" : "adult"}`}</span>
              )}
              {availablePlanData?.plan_Child_Count > 0 && (
                <span className="whitespace-nowrap font-semibold">{`${availablePlanData?.plan_Child_Count} child`}</span>
              )}
            </div>
          </div>
          <button
            className="hidden whitespace-nowrap rounded-full bg-red-100 p-2 px-4 text-xs font-semibold text-red-600"
            onClick={removeTourPlanTypeHandler}
          >
            Remove Plan
          </button>
        </div>
      )}
    </div>
  );
};
