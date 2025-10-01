import { formatDateToString } from "../formatDateToString/formatDateToString";

/**
 * Formats a date for booking emails with robust fallback handling.
 *
 * This function provides the same behavior as the legacy formatDateForBookingMail
 * function but uses the enhanced formatDateToString internally. It includes
 * multiple fallback strategies to ensure a date string is always returned,
 * even with invalid inputs.
 *
 * Fallback strategy:
 * 1. Try to format the input date directly
 * 2. If that fails, try to create a new Date from the input
 * 3. If that fails, use the current date
 *
 * @param checkin_Time - The date to format (can be Date, string, or any value)
 * @returns Date string in DD/MM/YYYY format, never throws errors
 *
 * @example
 * ```typescript
 * // Valid date
 * formatDateForBookingMail(new Date('2024-01-15')); // "15/01/2024"
 *
 * // Date string
 * formatDateForBookingMail('2024-01-15'); // "15/01/2024"
 *
 * // Invalid input - falls back to current date
 * formatDateForBookingMail('invalid'); // "15/01/2024" (current date)
 * formatDateForBookingMail(null); // "15/01/2024" (current date)
 * ```
 */

export const formatDateForBookingMail = (checkin_Time: any): string => {
  try {
    // First attempt: try to format as-is if it's already a Date
    if (checkin_Time instanceof Date) {
      return formatDateToString(checkin_Time, "DD-MM-YYYY", { separator: "/" });
    }

    // Second attempt: try to create a Date from the input
    const dateFromInput = new Date(checkin_Time);
    if (!isNaN(dateFromInput.getTime())) {
      return formatDateToString(dateFromInput, "DD-MM-YYYY", {
        separator: "/",
      });
    }

    // Final fallback: use current date
    return formatDateToString(new Date(), "DD-MM-YYYY", { separator: "/" });
  } catch (error) {
    try {
      // Backup attempt: try creating Date from input again
      const fallbackDate = new Date(checkin_Time);
      if (!isNaN(fallbackDate.getTime())) {
        return formatDateToString(fallbackDate, "DD-MM-YYYY", {
          separator: "/",
        });
      }

      // Ultimate fallback: current date
      return formatDateToString(new Date(), "DD-MM-YYYY", { separator: "/" });
    } catch (finalError) {
      // Absolute final fallback: current date with manual formatting
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear().toString();
      return `${day}/${month}/${year}`;
    }
  }
};
