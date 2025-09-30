import { format, parse } from "date-fns";

/**
 * Converts a 24-hour time format string to 12-hour format with AM/PM.
 * 
 * This function takes a time string in 24-hour format (HH:mm) and converts it
 * to a more user-friendly 12-hour format with AM/PM indicator using date-fns.
 * The function includes error handling and returns an empty string if parsing fails.
 * 
 * @param time24 - Time string in 24-hour format (e.g., "14:30", "09:15", "23:45")
 * @returns Time string in 12-hour format with AM/PM (e.g., "02:30 PM") or empty string on error
 * 
 * @example
 * ```typescript
 * // Morning times
 * convertTo12HourFormat("09:30"); // returns "09:30 AM"
 * convertTo12HourFormat("00:15"); // returns "12:15 AM"
 * 
 * // Afternoon/Evening times
 * convertTo12HourFormat("14:30"); // returns "02:30 PM"
 * convertTo12HourFormat("23:45"); // returns "11:45 PM"
 * convertTo12HourFormat("12:00"); // returns "12:00 PM"
 * 
 * // Error handling
 * convertTo12HourFormat("invalid"); // returns ""
 * convertTo12HourFormat("25:00");   // returns ""
 * ```
 */

export const convertTo12HourFormat = (time24: string) => {
  try {
    // Parse the 24-hour time string to a Date object
    const parsedTime = parse(time24, "HH:mm", new Date());
    // Format the parsed time to 12-hour format with AM/PM
    return format(parsedTime, "hh:mm a");
  } catch (error) {
    console.error("Error in convertTo12HourFormat", error);
    return "";
  }
};
