/**
 * Converts a Date object to a formatted date string in various formats.
 *
 * This function takes a Date object and converts it to a string representation
 * in the specified format. It supports multiple date formats commonly used in
 * booking systems, APIs, and user interfaces. The function handles proper
 * zero-padding for months and days to ensure consistent formatting.
 *
 * The function is particularly useful for:
 * - Converting dates for API requests and responses
 * - Formatting dates for database storage
 * - Creating consistent date displays in booking forms
 * - Generating date strings for URL parameters
 * - Converting dates for external service integrations
 *
 * @param fullDate - The Date object to convert to string format
 * @param dateFormat - The desired output format (defaults to "YYYY-MM-DD")
 *   Available formats:
 *   - "YYYY-MM-DD": ISO format (2024-01-15)
 *   - "YYYY-DD-MM": Year-Day-Month (2024-15-01)
 *   - "DD-MM-YYYY": European format (15-01-2024)
 *   - "DD-YYYY-MM": Day-Year-Month (15-2024-01)
 *   - "MM-DD-YYYY": US format (01-15-2024)
 *   - "MM-YYYY-DD": Month-Year-Day (01-2024-15)
 * @param options - Additional formatting options
 * @param options.separator - Custom separator character (defaults to "-")
 * @param options.padZeros - Whether to pad single digits with zeros (defaults to true)
 * @returns Formatted date string in the specified format
 *
 * @example
 * ```typescript
 * const date = new Date('2024-01-15T10:30:00');
 *
 * // Basic usage with different formats
 * formatDateToString(date); // "2024-01-15" (default YYYY-MM-DD)
 * formatDateToString(date, "DD-MM-YYYY"); // "15-01-2024"
 * formatDateToString(date, "MM-DD-YYYY"); // "01-15-2024"
 * formatDateToString(date, "YYYY-DD-MM"); // "2024-15-01"
 *
 * // Custom separator
 * formatDateToString(date, "DD-MM-YYYY", { separator: "/" }); // "15/01/2024"
 * formatDateToString(date, "MM-DD-YYYY", { separator: "." }); // "01.15.2024"
 *
 * // Without zero padding
 * const earlyDate = new Date('2024-01-05');
 * formatDateToString(earlyDate, "DD-MM-YYYY", { padZeros: false }); // "5-1-2024"
 *
 * // Booking system examples
 * const checkIn = new Date('2024-03-20');
 * const apiFormat = formatDateToString(checkIn); // "2024-03-20" for API
 * const displayFormat = formatDateToString(checkIn, "DD-MM-YYYY"); // "20-03-2024" for UI
 *
 * // URL parameter formatting
 * const selectedDate = new Date('2024-12-25');
 * const urlParam = formatDateToString(selectedDate, "YYYY-MM-DD"); // "2024-12-25"
 *
 * // Database storage format
 * const bookingDate = new Date();
 * const dbFormat = formatDateToString(bookingDate); // ISO format for database
 *
 * // Different separators for different regions
 * formatDateToString(date, "DD-MM-YYYY", { separator: "/" }); // European: "15/01/2024"
 * formatDateToString(date, "MM-DD-YYYY", { separator: "/" }); // US: "01/15/2024"
 * ```
 *
 * @throws Will throw an error if the input date is invalid
 * @throws Will throw an error if the date format is not supported
 *
 * @note
 * - All date components are zero-padded by default (01, 02, etc.)
 * - The function preserves the date components regardless of timezone
 * - Invalid dates will throw an error to prevent silent failures
 * - Custom separators allow for flexible formatting (-, /, ., etc.)
 */
export const formatDateToString = (
  fullDate: Date,
  dateFormat: string = "YYYY-MM-DD",
  options: {
    separator?: string;
    padZeros?: boolean;
  } = {},
): string => {
  const { separator = "-", padZeros = true } = options;

  // Input validation with fallback support
  if (!fullDate || !(fullDate instanceof Date)) {
    throw new Error("Input must be a valid Date object");
  }

  // Check for invalid dates
  if (isNaN(fullDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  if (!dateFormat || typeof dateFormat !== "string") {
    throw new Error("Date format must be a non-empty string");
  }

  // Extract date components
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1; // JavaScript months are 0-indexed
  const day = fullDate.getDate();

  // Format components with optional zero-padding
  const yearStr = year.toString();
  const monthStr = padZeros
    ? month.toString().padStart(2, "0")
    : month.toString();
  const dayStr = padZeros ? day.toString().padStart(2, "0") : day.toString();

  // Normalize format for comparison
  const normalizedFormat = dateFormat.toUpperCase().trim();

  // Format mapping with proper logic
  const formatMap: Record<string, string> = {
    "YYYY-MM-DD": `${yearStr}${separator}${monthStr}${separator}${dayStr}`,
    "YYYY-DD-MM": `${yearStr}${separator}${dayStr}${separator}${monthStr}`,
    "DD-MM-YYYY": `${dayStr}${separator}${monthStr}${separator}${yearStr}`,
    "DD-YYYY-MM": `${dayStr}${separator}${yearStr}${separator}${monthStr}`,
    "MM-DD-YYYY": `${monthStr}${separator}${dayStr}${separator}${yearStr}`,
    "MM-YYYY-DD": `${monthStr}${separator}${yearStr}${separator}${dayStr}`,
  };

  // Check if format is supported
  if (!formatMap[normalizedFormat]) {
    throw new Error(
      `Unsupported date format: ${dateFormat}. Supported formats: ${Object.keys(formatMap).join(", ")}`,
    );
  }

  return formatMap[normalizedFormat];
};

