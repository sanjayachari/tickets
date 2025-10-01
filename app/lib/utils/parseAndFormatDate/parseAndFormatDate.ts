import { format } from "date-fns";
import { formatTimestampToDate } from "../formatTimestampToDate/formatTimestampToDate";

export function parseAndFormatDate(
  dateInput: any,
  dateFormat: string = "dd MMM yyyy",
) {
  let date: string;

  if (
    typeof dateInput === "object" &&
    dateInput !== null &&
    "seconds" in dateInput &&
    "nanoseconds" in dateInput
  ) {
    date = format(formatTimestampToDate(dateInput), dateFormat);
  } else if (typeof dateInput === "string" && !isNaN(Date.parse(dateInput))) {
    date = format(new Date(dateInput), dateFormat);
  } else if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
    date = format(dateInput, dateFormat);
  } else {
    console.error("Invalid date format:", dateInput);
    return "Invalid Date";
  }
  return date;
}