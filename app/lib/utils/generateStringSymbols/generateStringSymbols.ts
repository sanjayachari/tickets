/**
 * Generates a string by repeating a symbol or character a specified number of times.
 *
 * This function creates a string by concatenating a given symbol or character
 * multiple times. It's particularly useful for creating visual elements like
 * star ratings, progress indicators, dividers, or any repetitive string patterns
 * commonly used in user interfaces and data visualization.
 *
 * The function supports:
 * - HTML entities (like &#9733; for stars)
 * - Unicode characters and emojis
 * - Regular text characters and strings
 * - Custom separators between symbols
 * - Flexible formatting options
 *
 * The function is particularly useful for:
 * - Creating star rating displays (★★★★☆)
 * - Generating progress bars or indicators
 * - Building visual dividers and separators
 * - Creating loading animations with dots
 * - Displaying review ratings and scores
 * - Building ASCII art or text-based graphics
 *
 * @param num - The number of times to repeat the symbol (must be non-negative)
 * @param symbol - The symbol, character, or string to repeat (defaults to "&#9733;" - HTML star entity)
 * @param options - Configuration options for symbol generation
 * @param options.separator - String to insert between each symbol (defaults to "")
 * @param options.prefix - String to add at the beginning (defaults to "")
 * @param options.suffix - String to add at the end (defaults to "")
 * @param options.maxLength - Maximum length of the resulting string (truncates if exceeded)
 * @returns Generated string with repeated symbols, or empty string if num is 0 or negative
 *
 * @example
 * ```typescript
 * // Basic star rating (HTML entities)
 * generateStringSymbols(5); // "&#9733;&#9733;&#9733;&#9733;&#9733;"
 * generateStringSymbols(3, "&#9733;"); // "&#9733;&#9733;&#9733;"
 *
 * // Unicode star rating
 * generateStringSymbols(4, "★"); // "★★★★"
 * generateStringSymbols(5, "⭐"); // "⭐⭐⭐⭐⭐"
 *
 * // Mixed rating with empty stars
 * const filledStars = generateStringSymbols(3, "★");
 * const emptyStars = generateStringSymbols(2, "☆");
 * const rating = filledStars + emptyStars; // "★★★☆☆"
 *
 * // Progress indicators
 * generateStringSymbols(7, "█"); // "███████" (progress bar)
 * generateStringSymbols(3, "●"); // "●●●" (dots)
 * generateStringSymbols(5, "▓"); // "▓▓▓▓▓" (blocks)
 *
 * // With separators
 * generateStringSymbols(5, "★", { separator: " " }); // "★ ★ ★ ★ ★"
 * generateStringSymbols(3, "⭐", { separator: " | " }); // "⭐ | ⭐ | ⭐"
 *
 * // With prefix and suffix
 * generateStringSymbols(4, "★", { 
 *   prefix: "Rating: ", 
 *   suffix: " (4/5)" 
 * }); // "Rating: ★★★★ (4/5)"
 *
 * // Loading animation dots
 * generateStringSymbols(3, ".", { separator: " " }); // ". . ."
 * generateStringSymbols(4, "•"); // "••••"
 *
 * // Text dividers
 * generateStringSymbols(20, "-"); // "--------------------"
 * generateStringSymbols(10, "=", { separator: " " }); // "= = = = = = = = = ="
 *
 * // Hotel/booking rating display
 * const hotelRating = 4;
 * const maxRating = 5;
 * const stars = generateStringSymbols(hotelRating, "⭐") + 
 *               generateStringSymbols(maxRating - hotelRating, "☆");
 * // Result: "⭐⭐⭐⭐☆"
 *
 * // Review score visualization
 * const score = 8;
 * const maxScore = 10;
 * generateStringSymbols(score, "█", { 
 *   suffix: generateStringSymbols(maxScore - score, "░"),
 *   prefix: "Score: "
 * }); // "Score: ████████░░"
 *
 * // With length limit
 * generateStringSymbols(100, "★", { maxLength: 10 }); // "★★★★★★★★★★" (truncated)
 *
 * // Edge cases
 * generateStringSymbols(0, "★"); // ""
 * generateStringSymbols(-5, "★"); // ""
 * generateStringSymbols(3, ""); // ""
 * ```
 *
 * @throws Never throws errors - handles invalid inputs gracefully
 *
 * @note
 * - Function handles negative numbers by returning empty string
 * - Empty symbols result in empty string regardless of count
 * - Large numbers are handled efficiently but consider performance for very large values
 * - HTML entities are preserved as-is in the output string
 * - Unicode characters and emojis are fully supported
 * - Separators are not added before the first or after the last symbol
 */
export const generateStringSymbols = (
  num: number,
  symbol: string = "&#9733;",
  options: {
    separator?: string;
    prefix?: string;
    suffix?: string;
    maxLength?: number;
  } = {},
): string => {
  const {
    separator = "",
    prefix = "",
    suffix = "",
    maxLength,
  } = options;

  // Input validation
  if (!Number.isFinite(num) || num <= 0) {
    return "";
  }

  if (!symbol || typeof symbol !== "string") {
    return "";
  }

  // Convert to integer and ensure non-negative
  const count = Math.max(0, Math.floor(num));

  // Generate symbols efficiently
  let result = "";
  
  if (separator) {
    // Use array join for better performance with separators
    const symbolArray = new Array(count).fill(symbol);
    result = symbolArray.join(separator);
  } else {
    // Use repeat for better performance without separators
    result = symbol.repeat(count);
  }

  // Add prefix and suffix
  const finalResult = prefix + result + suffix;

  // Apply length limit if specified
  if (maxLength && typeof maxLength === "number" && maxLength > 0) {
    return finalResult.slice(0, maxLength);
  }

  return finalResult;
};
