// app/api/tour/[slug]/route.ts
import { NextResponse } from "next/server";
import { getDataOfSinglePackage } from "@/app/lib/firebase/thingsToDoHandler";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> } // 👈 params is a Promise
) {
  const { slug } = await context.params; // 👈 must await
  const res = await getDataOfSinglePackage(slug);

  return NextResponse.json(res);
}
