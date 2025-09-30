// app/api/workers/tourWorker/route.ts
import { getDataOfTourReviews, getTourImageObjectList, getTourPlansInvPriceList } from "@/app/lib/firebase/thingsToDoHandler";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tourSlugName } = body;

    if (!tourSlugName ) {
      return new Response(
        JSON.stringify({ error: "Missing tourSlugName or searchedDate" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const [reviewsList, ImagesList, tourPlansList] = await Promise.all([
      getDataOfTourReviews(tourSlugName),
      getTourImageObjectList(tourSlugName, 24),
      getTourPlansInvPriceList(tourSlugName, new Date()),
    ]);

    return new Response(
      JSON.stringify({ reviewsList, ImagesList, tourPlansList }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in tourWorker API:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch tour data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
