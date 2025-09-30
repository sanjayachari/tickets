/**
 * Calculates the difference in days between two dates, ignoring time components.
 *
 * This function computes the number of full days between a start date and an end date
 * by normalizing both dates to midnight (removing time components) and calculating
 * the difference. The result is floored to return only complete days.
 *
 * The function is particularly useful for:
 * - Hotel booking duration calculations
 * - Tour package day counting
 * - Date range validations
 * - Calendar applications
 *
 * @param startDate - The starting date for the calculation
 * @param endDate - The ending date for the calculation
 * @returns The number of full days between the dates (can be negative if endDate is before startDate)
 *
 * @example
 * ```typescript
 * // Basic usage - 3 days difference
 * const start = new Date('2024-01-15');
 * const end = new Date('2024-01-18');
 * getDateDifference(start, end); // returns 3
 *
 * // Same date - 0 days difference
 * const today = new Date('2024-01-15');
 * const sameDay = new Date('2024-01-15');
 * getDateDifference(today, sameDay); // returns 0
 *
 * // Different times, same date - 0 days difference
 * const morning = new Date('2024-01-15T09:00:00');
 * const evening = new Date('2024-01-15T21:00:00');
 * getDateDifference(morning, evening); // returns 0
 *
 * // End date before start date - negative result
 * const later = new Date('2024-01-18');
 * const earlier = new Date('2024-01-15');
 * getDateDifference(later, earlier); // returns -3
 *
 * // Hotel booking example (check-in to check-out)
 * const checkIn = new Date('2024-01-15');
 * const checkOut = new Date('2024-01-17');
 * getDateDifference(checkIn, checkOut); // returns 2 (2 nights stay)
 *
 * // Cross-month calculation
 * const endOfMonth = new Date('2024-01-31');
 * const startOfNextMonth = new Date('2024-02-02');
 * getDateDifference(endOfMonth, startOfNextMonth); // returns 2
 * ```
 */
export function getDateDifference(startDate: Date, endDate: Date): number {
  // Handle null/undefined inputs
  if (!startDate || !endDate) {
    throw new Error("Both startDate and endDate must be provided");
  }

  // Handle invalid dates
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Normalize dates to midnight to ignore time components
  const normalizedStartDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const normalizedEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  // Calculate time difference in milliseconds
  const timeDifferenceMs =
    normalizedEndDate.getTime() - normalizedStartDate.getTime();

  // Convert to days (1000ms * 60s * 60min * 24h = 86400000ms per day)
  const dayDifference = timeDifferenceMs / (1000 * 60 * 60 * 24);

  return Math.floor(dayDifference);
}
