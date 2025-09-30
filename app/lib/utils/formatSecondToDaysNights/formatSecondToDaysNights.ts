export const formatSecondToDaysNights = (seconds: number): string => {
  if (
    seconds === undefined ||
    seconds === null ||
    isNaN(seconds) ||
    seconds <= 0
  ) {
    return "";
  }

  const secondsInADay = 86400;
  const secondsInAnHour = 3600;

  // If less than 1 day — show Hours
  if (seconds < secondsInADay) {
    const hours = Math.ceil(seconds / secondsInAnHour);
    return `${hours} Hour${hours > 1 ? "s" : ""}`;
  }

  const fullDays = Math.floor(seconds / secondsInADay);
  const remainingSeconds = seconds % secondsInADay;
  const remainingHours = Math.floor(remainingSeconds / secondsInAnHour);

  if (fullDays === 1) {
    return remainingHours > 0
      ? `1 Day ${remainingHours} Hour${remainingHours !== 1 ? "s" : ""}`
      : `1 Day`;
  }

  // For 2 days or more — use D/N format
  const totalDays = fullDays;
  const nights = totalDays - 1;
  return `${totalDays}D / ${nights}N`;
};
