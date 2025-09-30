// app/things-to-do/[slug]/page.tsx
import { notFound } from "next/navigation";
import { TourClientComponent } from "./TourId";
import { TourPackageInfo } from "@/app/classes/tourAndTravels/TourPackageInfo";

interface PageProps {
  params: Promise<{ slug: string }>; // params is now a Promise
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params
  const tourSlug = resolvedParams.slug; // safely access slug

  const res = await fetch(`http://localhost:3000/api/tour/${tourSlug}`,
    { cache: "no-store" } // always fresh, similar to getServerSideProps
  ).then((r) => r.json());

  if (!res.status || !res.data) {
    notFound();
  }

  const tourData: TourPackageInfo = res.data;
  return <TourClientComponent tourData={tourData} tourSlug={tourSlug} />;
}
