import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { CalendarIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
// import { priceCurrencyConvertor } from "@/src/utils";
// import ThingsToDoCal from "../things-to-do/ThingsToDoCal";

// import {
//   selectSearchedAdultCount,
//   selectSearchedChildCount,
//   updateTourDuration,
//   updateTourSearchInfo,
//   selectTourBookingCardLoading,
//   selectPlansList,
//   setTourBookingCardLoading,
//   selectSearchedDate,
//   selectCurrencySymbol,
//   selectCurrencyValue,
//   selectTourType,
// } from "@/lib/redux/tourBookingSlice";

// import { PlanDetails } from "@/lib/classModels/bookings/planDetails";
// import { TourPlanTile } from "../things-to-do/tour-page/plans/TourPlanTile";
// import { PriceSkeleton } from "../skeleton/skeletons";
// import TimeSlotSelector from "./TimeSlotSelector";
// import { useOutsideClick } from "@/hooks/useOutsideClick";

import { CalendarIcon, MinusIcon, PlusIcon } from "lucide-react";
import { priceCurrencyConvertor } from "@/app/lib/utils/priceCurrencyConvertor/priceCurrencyConvertor";
// import { selectCurrencySymbol, selectCurrencyValue, selectPlansList, selectSearchedAdultCount, selectSearchedChildCount, selectSearchedDate } from "@/app/lib/redux/activityBookingSlice";
import { selectCurrencySymbol, selectCurrencyValue, selectPlansList, selectSearchedAdultCount, selectSearchedChildCount, selectSearchedDate, selectTourBookingCardLoading, selectTourType, setTourBookingCardLoading, updateTourDuration, updateTourSearchInfo } from "@/app/lib/redux/tourBookingSlice";
import { PlanDetails } from "@/app/classes/bookings/planDetails";
import { TourPlanTile } from "../things-to-do/plans/TourPlanTile";
import TimeSlotSelector from "./TimeSlotSelector";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";
import { PriceSkeleton } from "../skeleton/Skeletons";
import ThingsToDoCalendar from "../things-to-do/ThingsToDoCal";
import PromoBanner from "./PromoBanner";

interface Props {
  maxAdultCount: number;
  lowestPrice: null | number;
  setFormattedDate: any;
  selectionRef: any;
  availabilityRef: any;
  scrollToSelection: Function;
  createTourBooking: () => void;
  slotModel: boolean;
  setSlotModel: any;
  setSelectedSlot: any;
}

export default function TourBookingCard({
  maxAdultCount,
  lowestPrice,
  setFormattedDate,
  selectionRef,
  availabilityRef,
  scrollToSelection,
  createTourBooking,
  slotModel,
  setSlotModel,
  setSelectedSlot,
}: Props) {
  const dispatch = useDispatch();
  const tourType = useSelector(selectTourType);
  const searchedDate = useSelector(selectSearchedDate);
  const currencySymbol = useSelector(selectCurrencySymbol);
  const currencyValue = useSelector(selectCurrencyValue);
  const searchedAdultCount = useSelector(selectSearchedAdultCount);
  const searchedChildCount = useSelector(selectSearchedChildCount);
  const bookingCardLoading = useSelector(selectTourBookingCardLoading);
  const plansList = useSelector(selectPlansList);
  // const calendarRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<any>(null);
  const [calendarModel, setCalendarModel] = useState<boolean>(true);
  const [adultCount, setAdultCount] = useState(searchedAdultCount);
  const [childCount, setChildCount] = useState(searchedChildCount);
  const [tourStartDate, setTourStartDate] = useState(searchedDate);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [isTicketOnly, setIsTicketOnly] = useState(false);
  const [isActivity, setIsActivity] = useState(false);
  const [isTour, setIsTour] = useState(false);

  useOutsideClick({
    ref: calendarRef,
    callback: () => setCalendarModel(false),
  });

  useEffect(() => {
    const isTicketOnlyType = tourType === "Ticket-Only";
    const isActivityType = tourType === "Activity";
    const isTourType = !(isTicketOnlyType || isActivityType);

    setIsTicketOnly(isTicketOnlyType);
    setIsActivity(isActivityType);
    setIsTour(isTourType);
  }, [tourType]);

  // Utility function to mock delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const checkSearchAvailability = async (count: number, date?: Date) => {
    if ((isActivity || isTicketOnly) && plansList.length > 0 && !date) {
      return createTourBooking();
    }

    dispatch(setTourBookingCardLoading(true));
    dispatch(
      updateTourSearchInfo({
        searchedDate: date ? date : tourStartDate,
        searchedAdultCount: count,
        searchedChildCount: 0,
      }),
    );

    dispatch(
      updateTourDuration({
        tour_Start_Date: date ? date : tourStartDate,
        tour_Adults_Count: count,
        tour_Children_Count: childCount,
      }),
    );
    await delay(700);
    dispatch(setTourBookingCardLoading(false));
  };

  const adultCountHandler = async (change: number = 1) => {
    scrollToSelection();
    const newCount = adultCount + change;
    const updatedCount =
      newCount >= 1 && newCount <= maxAdultCount ? newCount : adultCount;

    setAdultCount(updatedCount);
    checkSearchAvailability(updatedCount);
  };

  const childCountHandler = (change: number = 1) => {};

  return (
   <div className="flex flex-col gap-2">
    <div className="w-full bg-white md:block hidden"><PromoBanner /></div>
     <div className="flex w-full flex-col space-y-2">
      <div className="w-full space-y-3 rounded-2xl p-4 lg:shadow-lg border border-gray-300 bg-white">
        <div ref={selectionRef}>
          {bookingCardLoading || lowestPrice === null ? (
            <PriceSkeleton />
          ) : (
            <>
              <p className="text-lg font-semibold leading-none">
                From {currencySymbol}{" "}
                {priceCurrencyConvertor(
                  lowestPrice,
                  currencyValue,
                )?.toLocaleString("en-IN")}{" "}
                / Adult*
              </p>
              <small>Lowest Price Gaurantee</small>
            </>
          )}
        </div>

                 <div className="flex w-full items-center">
          {/* Left circle */}
          <div className="absolute -left-[1px] h-[30px] w-[16px] rounded-br-full rounded-tr-full border-b border-r border-t border-gray-300 bg-gray-100" />

          {/* Dashed Line */}
          <div
            className="mx-6 h-[2px] grow opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, black 0, black 4px, transparent 4px, transparent 12px)",
            }}
          />

          {/* Right circle */}
          <div className="absolute -right-[1px] h-[30px] w-[16px] rounded-bl-full rounded-tl-full border-b border-l border-t border-gray-300 bg-gray-100" />
        </div>

        {/* Date Selection */}
        <div ref={calendarRef} className="relative">
          <div
            onClick={() => setCalendarModel(true)}
            className="flex h-10 w-full cursor-pointer items-center justify-between gap-2.5 whitespace-nowrap rounded-lg border p-2 shadow-sm hover:bg-secondary/5"
          >
            <p className="w-24 text-center">
              {format(tourStartDate, "dd MMM yyyy")}
            </p>
            <CalendarIcon className="h-6 min-w-6" />
          </div>

          {calendarModel && (
            <div className="absolute left-0 top-10 z-10 w-fit rounded-lg border border-gray-200 shadow-xl">
              <ThingsToDoCalendar
                checkInDate={tourStartDate}
                setSelectedCheckInDay={(sDate: Date) => {
                  setTourStartDate(sDate);
                  checkSearchAvailability(adultCount, sDate);
                  setSlotModel(true);
                }}
                setFormattedDate={setFormattedDate}
                setPopCalendar={setCalendarModel}
                setTimeModel={setSlotModel}
              />
            </div>
          )}
        </div>

        {/* Ticket Counter */}
        {isTour ? (
          <div className="">
            <div className="flex items-center justify-between rounded-lg border-[1px] border-gray-200 px-2 py-1 shadow-sm">
              <p className="text-foreground">Adult (age 0-99)</p>
              <div className="flex items-center gap-3">
                {/* Decrease Adult Count Button */}
                <button
                  onClick={() => {
                    adultCountHandler(-1);
                  }}
                  disabled={adultCount <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="remove adults"
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>

                {/* Adult Count Input */}
                <input
                  className="h-8 w-12 rounded-md border border-gray-300 text-center text-base text-gray-800"
                  type="number"
                  min="1"
                  max={maxAdultCount}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.startsWith("0") && value.length > 1) {
                      value = value.substring(1);
                    }
                    const numericValue = Math.min(Number(value), maxAdultCount);
                    setAdultCount(numericValue);
                    checkSearchAvailability(numericValue);
                  }}
                  value={String(adultCount)}
                />

                {/* Increase Adult Count Button */}
                <button
                  onClick={() => {
                    adultCountHandler(1);
                  }}
                  disabled={adultCount >= maxAdultCount}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="add adults"
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
            {adultCount >= maxAdultCount && (
              <p className="mt-2 text-center text-sm text-red-600">
                Maximum adult count reached.
              </p>
            )}
          </div>
        ) : (
          <div>
            <TimeSlotSelector
              slots={[
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
              ]}
              onSelect={(slot: string) => {
                setSelectedSlot(slot);
                scrollToSelection();
              }}
              defaultOpen={slotModel}
              setSlotModel={setSlotModel}
            />
          </div>
        )}

        <button
          ref={availabilityRef}
          className={`GA_4_TTD_CHECK_AVAIALABILITY_TRIGGER w-full cursor-pointer rounded-md bg-secondary px-4 py-2 font-semibold text-white shadow ${buttonClicked || plansList.length > 0 ? "hidden" : ""} `}
          onClick={() => {
            setButtonClicked(true);
            if (plansList.length === 0 && !isTour) {
              checkSearchAvailability(adultCount);
            } else {
              checkSearchAvailability(adultCount);
            }
          }}
          disabled={bookingCardLoading}
        >
          {bookingCardLoading ? "Loading..." : "Check Availability"}
        </button>
      </div>

      {plansList.length > 0 && (
        <div className="w-full flex-col space-y-2 rounded-lg p-3 shadow-lg md:flex">
          <h4 className="text-lg font-semibold">Selected Plan(s)</h4>
          <div className="flex flex-col space-y-2">
            {plansList.map((ppInfo: PlanDetails, index: number) => (
              <TourPlanTile key={index} pIndex={index} ppInfo={ppInfo} />
            ))}
          </div>
        </div>
      )}
    </div>
   </div>
  );
}
