/**
 * Converts a UTC date/time to Indian Standard Time (IST) and formats it as a readable string.
 *
 * This function takes a UTC date input (either as a string or Date object) and converts it
 * to IST (UTC+5:30), then formats it into a human-readable string. It's particularly useful
 * for displaying dates and times in Indian timezone for booking systems, user interfaces,
 * and reports that need to show local Indian time.
 *
 * @param utcDateStr - The UTC date to convert. Can be:
 *   - string: ISO date string (e.g., "2024-01-15T10:30:00Z") or any date-parseable string
 *   - Date: JavaScript Date object (assumed to be in UTC)
 * @param withTime - Whether to include time in the formatted output (defaults to false)
 *   - true: Returns date with time (e.g., "Jan 15, 2024, 4:00 pm")
 *   - false: Returns date only (e.g., "Jan 15, 2024")
 *
 * @returns Formatted date string in IST timezone:
 *   - Without time: "Jan 15, 2024"
 *   - With time: "Jan 15, 2024, 4:00 pm"
 *   - Returns empty string if conversion fails
 *
 * @example
 * ```typescript
 * // Convert UTC string to IST date only
 * formatUTCToIST("2024-01-15T10:30:00Z");
 * // Returns: "Jan 15, 2024"
 *
 * // Convert UTC string to IST with time
 * formatUTCToIST("2024-01-15T10:30:00Z", true);
 * // Returns: "Jan 15, 2024, 4:00 pm"
 *
 * // Convert Date object to IST
 * const utcDate = new Date("2024-01-15T10:30:00Z");
 * formatUTCToIST(utcDate, true);
 * // Returns: "Jan 15, 2024, 4:00 pm"
 *
 * // Booking system usage
 * const bookingTime = "2024-01-15T18:30:00Z";
 * const displayTime = formatUTCToIST(bookingTime, true);
 * console.log(`Booking time: ${displayTime}`); // "Booking time: Jan 16, 2024, 12:00 am"
 *
 * // Event scheduling
 * const eventDate = new Date("2024-12-25T06:30:00Z");
 * const eventDisplay = formatUTCToIST(eventDate);
 * console.log(`Event date: ${eventDisplay}`); // "Event date: Dec 25, 2024"
 * ```
 *
 * @note
 * - IST is UTC+5:30 (5 hours and 30 minutes ahead of UTC)
 * - The function manually calculates IST offset to ensure consistent behavior across environments
 * - Time format uses 12-hour format with lowercase am/pm
 * - Month names are abbreviated (Jan, Feb, Mar, etc.)
 * - Error handling returns empty string for invalid inputs
 * - The function assumes input dates are in UTC timezone
 *
 * @throws Does not throw errors - returns empty string on failure and logs error to console
 */

export const formatUTCToIST = (
  utcDateStr: string | Date,
  withTime: boolean = false,
): string => {
  try {
    const utcDate = new Date(utcDateStr);

    // IST offset: UTC + 5 hours 30 minutes
    const istOffset = 5.5 * 60; // in minutes
    const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

    const baseOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const options: Intl.DateTimeFormatOptions = withTime
      ? { ...baseOptions, ...timeOptions }
      : baseOptions;

    const formatted = istDate.toLocaleString("en-US", options);

    // Lowercase AM/PM if time is included
    return withTime
      ? formatted.replace("AM", "am").replace("PM", "pm")
      : formatted;
  } catch (error) {
    console.error("Error in formatDateToCustomString", error);
    return "";
  }
};
