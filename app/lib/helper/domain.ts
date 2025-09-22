// ✅ 1. Get the domain where app is running
export const currentDomain = window.location.origin;

// ✅ 2. Define your allowed domain(s)
const allowedDomains = [
  "https://staybook.in",
  "https://www.staybook.in",
  "http://localhost:3000",
  "https://delhitickets.com"
];

// ✅ 3. Check if current domain is allowed
if (!allowedDomains.includes(currentDomain)) {
  throw new Error("Unauthorized domain: API access blocked");
}
