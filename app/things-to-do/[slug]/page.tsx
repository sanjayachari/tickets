// app/things-to-do/[slug]/page.tsx
import { notFound } from "next/navigation";
import { TourClientComponent } from "./TourId";
import { TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ slug: string }>; // params is a Promise
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params
  const tourSlug = resolvedParams.slug; // safely access slug

  // Await headers to get the host
  const headersList = await headers(); 
  const host = headersList.get("host") || "localhost:3000";

  // Use HTTPS in production, HTTP in dev
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const origin = `${protocol}://${host}`;

  // Fetch the API on the same domain
  const res = await fetch(`${origin}/api/tour/${tourSlug}`, {
    cache: "no-store", // always fresh
  }).then((r) => r.json());

  if (!res.status || !res.data) {
    notFound();
  }

  const tourData: TourPackageInfo = res.data;

  return <TourClientComponent tourData={tourData} tourSlug={tourSlug} />;
}
