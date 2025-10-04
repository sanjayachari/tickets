// public/workers/tourInfo.worker.js
self.onmessage = async (event) => {
  try {
    const response = await fetch("/api/workers/tourWorker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event.data), // e.g. { tourSlugName, searchedDate }
    });
    const data = await response.json();
    self.postMessage(data);
  } catch (error) {
    console.error("Error fetching tour data:", error);
    self.postMessage({ error: "Failed to fetch tour data" });
  }
};
