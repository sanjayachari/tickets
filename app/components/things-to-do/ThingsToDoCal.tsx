import { selectTourType } from "@/app/lib/redux/tourBookingSlice";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  parse,
  startOfMonth,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface CalendarProps {
  checkInDate: Date;
  isDateSelected?: boolean;
  setSelectedCheckInDay: (date: Date) => void;
  setOpenAdultAge?: (open: boolean) => void;
  setFormattedDate?: (formatted: string) => void;
  setPopCalendar?: (open: boolean) => void;
  setVisibleStartDate?: any;
  type?: string;
  setTimeModel?: (open: boolean) => void;
}

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

function utcToIst(date: Date): Date {
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffset);
  istDate.setHours(0, 0, 0, 0);
  return istDate;
}

function classNames(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ThingsToDoCalendar({
  checkInDate,
  isDateSelected,
  setSelectedCheckInDay,
  setOpenAdultAge,
  setFormattedDate,
  setPopCalendar,
  setVisibleStartDate,
  type,
  setTimeModel,
}: CalendarProps) {
  const tourType = useSelector(selectTourType);
  const today = utcToIst(new Date());
  const maxFutureMonth = addMonths(today, 24);

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  useEffect(() => {
    if (checkInDate) {
      setCurrentMonth(format(checkInDate, "MMM-yyyy"));
    }
  }, [checkInDate]);

  const handleDateSelection = (day: Date) => {
    const formatted = day.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setCurrentMonth(format(day, "MMM-yyyy"));
    setFormattedDate?.(formatted);
    setSelectedCheckInDay(day);
    setOpenAdultAge?.(true);
    setPopCalendar?.(false);
    setTimeModel?.(true);
    setVisibleStartDate?.(day);
  };

  const isDateBeforeToday = (day: Date): boolean => {
    const now = new Date();
    const currentHour = now.getHours();

    // Normalize both dates to midnight
    const normalizedDay = new Date(day);
    normalizedDay.setHours(0, 0, 0, 0);

    // const normalizedToday = new Date(today);
    const normalizedToday = new Date();
    normalizedToday.setHours(0, 0, 0, 0);

    if (type === "activity") {
      // Disable only days strictly before today (local midnight comparison)
      return normalizedDay < normalizedToday;
    }

    // Past days are always disabled
    if (normalizedDay < normalizedToday) return true;

    // If today and current time is past 12 and not Ticket-Only → disable
    const isToday = normalizedDay.getTime() === normalizedToday.getTime();

    if (isToday && tourType !== "Ticket-Only" && currentHour >= 12) {
      return true;
    }

    return false;
  };

  const previousMonth = () => {
    const prev = addMonths(firstDayCurrentMonth, -1);
    if (prev >= startOfMonth(today)) {
      setCurrentMonth(format(prev, "MMM-yyyy"));
    }
  };

  const nextMonthView = () => {
    const next = addMonths(firstDayCurrentMonth, 1);
    if (next <= maxFutureMonth) {
      setCurrentMonth(format(next, "MMM-yyyy"));
    }
  };

  return (
    <div className="mx-auto w-fit space-y-3 divide-y-2">
      <div className="relative mx-auto w-full rounded-lg bg-white p-4">
        {/* Header Nav */}
        <div className="absolute inset-x-0 flex justify-between px-4">
          <button
            onClick={previousMonth}
            disabled={firstDayCurrentMonth <= startOfMonth(today)}
            className={classNames(
              "group rounded-full p-1.5 hover:bg-gray-200 active:scale-95",
              firstDayCurrentMonth <= startOfMonth(today)
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-500",
            )}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <button
            onClick={nextMonthView}
            disabled={firstDayCurrentMonth >= startOfMonth(maxFutureMonth)}
            className={classNames(
              "group rounded-full p-1.5 hover:bg-gray-200 active:scale-95",
              firstDayCurrentMonth >= startOfMonth(maxFutureMonth)
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-500",
            )}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Month Title */}
        <strong className="block py-1 pb-2 text-center font-semibold text-gray-900">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </strong>

        {/* Days of week */}
        <div className="mb-1 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-sm">
          {daysInMonth.map((day, idx) => {
            const disabled = isDateBeforeToday(day);
            const isSelected =
              checkInDate &&
              day.getFullYear() === checkInDate.getFullYear() &&
              day.getMonth() === checkInDate.getMonth() &&
              day.getDate() === checkInDate.getDate();

            return (
              <div
                key={day.toString()}
                className={classNames(
                  idx === 0 && colStartClasses[getDay(day)],
                )}
              >
                <button
                  onClick={() => handleDateSelection(day)}
                  disabled={disabled}
                  className={classNames(
                    "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full transition",
                    disabled
                      ? "cursor-not-allowed text-gray-300"
                      : "text-gray-900 hover:bg-gray-100",
                    isSelected && "bg-black font-semibold text-white",
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
