/**
 * Converts various timestamp formats to a Date object in Indian Standard Time (IST).
 *
 * This function handles multiple input types commonly encountered when working with
 * databases (especially Firestore) and APIs. It automatically converts the input
 * to IST (UTC+5:30) timezone, making it suitable for Indian booking systems and
 * applications that need to display times in IST.
 *
 * Supported input formats:
 * - ISO date strings (e.g., "2024-01-15T10:30:00Z")
 * - Firestore Timestamp objects with seconds and nanoseconds
 * - Unix timestamps (numbers)
 * - Date objects (returns copy in IST)
 *
 * @param input - The timestamp to convert. Can be:
 *   - string: ISO date string or date-parseable string
 *   - FirestoreTimestamp: Object with seconds and nanoseconds properties
 *   - number: Unix timestamp in milliseconds
 *   - Date: Existing Date object
 *   - null/undefined: Returns current date in IST
 * @param targetTimezone - Target timezone offset in minutes from UTC (defaults to IST: 330 minutes)
 * @returns A Date object adjusted to the specified timezone (IST by default)
 *
 * @example
 * ```typescript
 * // String input (ISO format)
 * const isoString = "2024-01-15T10:30:00Z";
 * formatTimestampToDate(isoString); // Returns Date in IST (15:00:00 IST)
 *
 * // Firestore Timestamp object
 * const firestoreTimestamp = {
 *   seconds: 1705320600,
 *   nanoseconds: 500000000
 * };
 * formatTimestampToDate(firestoreTimestamp); // Returns Date in IST
 *
 * // Unix timestamp (milliseconds)
 * const unixTimestamp = 1705320600000;
 * formatTimestampToDate(unixTimestamp); // Returns Date in IST
 *
 * // Date object
 * const utcDate = new Date("2024-01-15T10:30:00Z");
 * formatTimestampToDate(utcDate); // Returns copy in IST
 *
 * // Current time in IST
 * formatTimestampToDate(null); // Returns current date/time in IST
 *
 * // Custom timezone (e.g., EST: UTC-5 = -300 minutes)
 * formatTimestampToDate("2024-01-15T10:30:00Z", -300); // Returns Date in EST
 *
 * // Booking system usage
 * const bookingTimestamp = await getBookingFromFirestore();
 * const istBookingTime = formatTimestampToDate(bookingTimestamp.createdAt);
 * console.log(`Booking created at: ${istBookingTime.toLocaleString()}`);
 * ```
 *
 * @throws Will throw an error if the input cannot be converted to a valid date
 * @throws Will throw an error if Firestore timestamp object is malformed
 *
 * @note
 * - IST is UTC+5:30 (330 minutes ahead of UTC)
 * - The function modifies the UTC time to represent IST, not just display formatting
 * - For Firestore timestamps, nanoseconds are converted to milliseconds with precision loss
 * - Input validation ensures robust error handling for malformed data
 */
export const formatTimestampToDate = (
  input: string | FirestoreTimestamp | number | Date | null | undefined,
  targetTimezone: number = 330, // IST offset in minutes (5 hours 30 minutes)
): Date => {
  let date: Date;

  try {
    // Handle null/undefined - return current time in target timezone
    if (input === null || input === undefined) {
      date = new Date();
    }
    // Handle string input (ISO strings, date strings)
    else if (typeof input === "string") {
      if (!input.trim()) {
        throw new Error("Empty date string provided");
      }
      date = new Date(input);
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${input}`);
      }
    }
    // Handle number input (Unix timestamp in milliseconds)
    else if (typeof input === "number") {
      if (!Number.isFinite(input) || input < 0) {
        throw new Error(`Invalid timestamp number: ${input}`);
      }
      date = new Date(input);
    }
    // Handle Date object input
    else if (input instanceof Date) {
      if (isNaN(input.getTime())) {
        throw new Error("Invalid Date object provided");
      }
      date = new Date(input.getTime()); // Create a copy
    }
    // Handle Firestore Timestamp object
    else if (input && typeof input === "object" && "seconds" in input) {
      const timestamp = input as FirestoreTimestamp;

      if (
        typeof timestamp.seconds !== "number" ||
        !Number.isFinite(timestamp.seconds)
      ) {
        throw new Error(
          "Invalid Firestore timestamp: seconds must be a finite number",
        );
        return new Date();
      }

      const nanoseconds = timestamp.nanoseconds || 0;
      if (typeof nanoseconds !== "number" || !Number.isFinite(nanoseconds)) {
        console.error(
          "Invalid Firestore timestamp: nanoseconds must be a finite number",
        );
        return new Date();
      }

      const milliseconds = timestamp.seconds * 1000 + nanoseconds / 1e6;
      date = new Date(milliseconds);
    }
    // Handle unexpected input types
    else {
      console.error(`Unsupported input type: ${typeof input}`);
      return new Date();
    }

    // Validate the resulting date
    if (isNaN(date.getTime())) {
      console.error("Failed to create valid date from input");
      return new Date();
    }

    return date;
  } catch (error) {
    console.error(
      `formatTimestampToDate error: ${error instanceof Error ? error.message : String(error)}`,
    );
    return new Date();
  }
};

/**
 * Type definition for Firestore Timestamp objects
 */
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds?: number;
}
