/**
 * Core date manipulation function that adds or subtracts days from a given date.
 *
 * This internal function handles the common logic for date arithmetic operations.
 * It creates a new Date object by adding the specified number of days (positive or negative)
 * to the input date, handling month and year boundaries automatically.
 *
 * @param startDate - The base date to manipulate
 * @param numberOfDays - Number of days to add (positive) or subtract (negative)
 * @param preserveTime - Whether to preserve the original time component
 * @returns A new Date object with the specified number of days added/subtracted
 * @throws Will throw an error if inputs are invalid
 */
export const manipulateDateByDays = (
  startDate: string | number | Date,
  numberOfDays: number,
  preserveTime: boolean = true,
): Date => {
  // Input validation
  if (
    numberOfDays === null ||
    numberOfDays === undefined ||
    !Number.isFinite(numberOfDays)
  ) {
    return new Date();
  }

  // Create date object from input
  let baseDate: Date;
  try {
    baseDate = new Date(startDate);
  } catch (error) {
    return new Date();
  }

  // Validate the created date
  if (isNaN(baseDate.getTime())) {
    return new Date();
  }

  // Create a new date object (immutable operation)
  const result = new Date(baseDate.getTime());

  // Reset time to midnight if preserveTime is false
  if (!preserveTime) {
    result.setHours(0, 0, 0, 0);
  }

  // Add the specified number of days
  result.setDate(result.getDate() + numberOfDays);

  // Validate the result
  if (isNaN(result.getTime())) {
    return new Date();
  }

  return result;
};
