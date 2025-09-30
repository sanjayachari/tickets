/**
 * Generates a default start date based on the current time of day.
 *
 * This function implements smart date selection logic for booking systems:
 * - If current time is before 12:00 PM (noon), returns today's date at midnight
 * - If current time is 12:00 PM or later, returns tomorrow's date at midnight
 *
 * This logic is commonly used in hotel and tour booking systems to prevent
 * same-day bookings after a certain cutoff time, ensuring adequate preparation
 * time for service providers.
 *
 * The returned date is always normalized to midnight (00:00:00.000) to ensure
 * consistent date-only comparisons and avoid time-related booking conflicts.
 *
 * @returns A Date object representing the appropriate default start date at midnight
 *
 * @example
 * ```typescript
 * // Before noon (e.g., 10:30 AM)
 * // Current date: 2024-01-15 10:30:00
 * getDefaultStartDate(); // returns 2024-01-15 00:00:00.000
 *
 * // After noon (e.g., 2:30 PM)
 * // Current date: 2024-01-15 14:30:00
 * getDefaultStartDate(); // returns 2024-01-16 00:00:00.000
 *
 * // Exactly at noon
 * // Current date: 2024-01-15 12:00:00
 * getDefaultStartDate(); // returns 2024-01-16 00:00:00.000
 *
 * // Usage in booking form initialization
 * const defaultCheckIn = getDefaultStartDate();
 * const defaultCheckOut = new Date(defaultCheckIn);
 * defaultCheckOut.setDate(defaultCheckOut.getDate() + 1); // Next day
 *
 * // Usage with date picker
 * const minDate = getDefaultStartDate();
 * // Set date picker minimum date to prevent past bookings
 * ```
 */
export const getDefaultStartDate = (): Date => {
  const now = new Date();
  const hour = now.getHours();

  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  return hour >= 12
    ? new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        baseDate.getDate() + 1,
      )
    : baseDate;
};
