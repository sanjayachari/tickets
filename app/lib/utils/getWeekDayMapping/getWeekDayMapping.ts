
/**
 * Converts a Date object to its corresponding abbreviated weekday name.
 * 
 * This function takes a Date object and returns the abbreviated name of the
 * weekday (Sun, Mon, Tues, etc.) based on JavaScript's getDay() method which
 * returns 0 for Sunday, 1 for Monday, and so on up to 6 for Saturday.
 * 
 * The function uses a predefined mapping to convert numeric day values to
 * their corresponding abbreviated weekday strings that match the WeekDay type.
 * 
 * @param dt - The Date object to get the weekday name from
 * @returns The abbreviated weekday name as a WeekDay type (e.g., "Sun", "Mon", "Tues")
 * 
 * @example
 * ```typescript
 * // For a Sunday date
 * const sunday = new Date('2024-01-07'); // Sunday
 * getWeekDayMapping(sunday); // returns "Sun"
 * 
 * // For a Monday date
 * const monday = new Date('2024-01-08'); // Monday
 * getWeekDayMapping(monday); // returns "Mon"
 * 
 * // For a Wednesday date
 * const wednesday = new Date('2024-01-10'); // Wednesday
 * getWeekDayMapping(wednesday); // returns "Weds"
 * 
 * // For current date
 * const today = new Date();
 * getWeekDayMapping(today); // returns current day abbreviation
 * ```
 */

import { WeekDay } from "@/app/classes/tourAndTravels/TourPlanInformation";

export const getWeekDayMapping = (dt: Date): WeekDay => {
  const weekDays : any = {
    0: "Sun",
    1: "Mon",
    2: "Tues",
    3: "Weds",
    4: "Thur",
    5: "Fri",
    6: "Sat",
  };
  const dayVal = dt.getDay();
  return weekDays[dayVal];
};
