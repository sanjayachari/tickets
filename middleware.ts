// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "default.com";
  const response = NextResponse.next();
  response.headers.set("x-current-domain", host);
  return response;
}

export const config = {
  matcher: "/:path*",
};
