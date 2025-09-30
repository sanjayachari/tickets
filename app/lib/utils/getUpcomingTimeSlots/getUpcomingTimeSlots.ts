import { parse, isAfter, format } from "date-fns";

export const getUpcomingTimeSlots = (time24: string) => {
  const now = new Date();
  const timeToday = parse(time24, "HH:mm", new Date());

  if (isAfter(timeToday, now)) {
    return format(timeToday, "hh:mm a"); // return in 12-hour format
  }

  return null; // or return "" if you prefer
};
