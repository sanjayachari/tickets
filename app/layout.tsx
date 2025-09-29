import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import {  getDomainData } from "./lib/api";
import { DomainProvider } from "./context/Domain";
import { DomainData } from "./classes/DomainData";

type RootLayoutProps = { children: ReactNode };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamic SEO metadata
export async function generateMetadata(): Promise<Metadata> {
  const currentHeaders = await headers(); // ✅ await headers()
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";

  const domainData: DomainData | null = await getDomainData(host);

  const title = domainData?.domain_Meta_Data?.title || "Staybook Tickets";
  const description = domainData?.domain_Meta_Data?.description || "Book tickets for attractions with Staybook";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${host}`,
      images: [
        {
          url: domainData?.domain_Meta_Data?.image_url || `https://${host}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

// Root layout
export default async function RootLayout({ children }: RootLayoutProps) {
  const currentHeaders = await headers(); // ✅ await headers()
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";

  const domainData: DomainData | null = await getDomainData(host);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DomainProvider initialDomain={host} initialData={domainData}>
          {children}
        </DomainProvider>
      </body>
    </html>
  );
}
