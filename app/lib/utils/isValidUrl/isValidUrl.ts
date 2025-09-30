/**
 * Validates whether a given string is a valid URL.
 *
 * This function performs comprehensive URL validation by:
 * 1. Checking if the input exists and is a non-empty string
 * 2. Using the native URL constructor to validate the URL format
 * 3. Handling any parsing errors gracefully
 *
 * The validation uses the browser's built-in URL parsing which follows
 * the WHATWG URL Standard, ensuring robust URL validation.
 *
 * @param url - The string to validate as a URL (optional)
 * @returns True if the string is a valid URL, false otherwise
 *
 * @example
 * ```typescript
 * // Valid URLs
 * isValidUrl("https://www.example.com"); // returns true
 * isValidUrl("http://localhost:3000"); // returns true
 * isValidUrl("ftp://files.example.com"); // returns true
 * isValidUrl("mailto:user@example.com"); // returns true
 *
 * // Invalid URLs
 * isValidUrl("not-a-url"); // returns false
 * isValidUrl(""); // returns false
 * isValidUrl("   "); // returns false
 * isValidUrl(undefined); // returns false
 * isValidUrl("www.example.com"); // returns false (missing protocol)
 * isValidUrl("https://"); // returns false (incomplete URL)
 * ```
 */

export const isValidUrl = (url?: string): Boolean => {
  if (!url || typeof url !== "string" || url.trim() === "") return false;
  try {
    new URL(url); // will throw if invalid
    return true;
  } catch {
    return false;
  }
};
