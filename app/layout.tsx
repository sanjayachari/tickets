import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainData } from "./lib/api";
import { DomainProvider } from "./context/Domain";
import { DomainData } from "./classes/DomainData";
import ReduxProvider from "./lib/redux/ReduxProvider";
import DynamicPoiPage from "./components/ui/dynamicPoi/DynamicPoi";

type RootLayoutProps = { children: ReactNode };

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";

  const resolvedHost = host.includes("localhost") || host.includes("127.0.0.1")
    ? "delhitickets.com"
    : host;

  const domainData: DomainData | null = await getDomainData(resolvedHost);

  const title = domainData?.domain_Meta_Data?.title || "Staybook Tickets";
  const description = domainData?.domain_Meta_Data?.description || "Book tickets for attractions with Staybook";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${resolvedHost}`,
      images: [
        {
          url: domainData?.domain_Meta_Data?.image_url || `https://${resolvedHost}/favicons/${resolvedHost}.ico`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    icons: {
      icon: domainData?.domain_Meta_Data?.favicon_url || `https://${resolvedHost}/favicons/${resolvedHost}.ico`,
    },
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";

  const resolvedHost = host.includes("localhost") || host.includes("127.0.0.1")
    ? "delhitickets.com"
    : host;

  const domainData = await getDomainData(resolvedHost);

  // Check if it’s a subdomain
  const isSubdomain = host.split(".").length > 2; // e.g., red-fort-delhi.agratickets.com

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href={domainData?.domain_Meta_Data?.favicon_url ?? `/favicons/${resolvedHost}.ico`}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <DomainProvider initialDomain={resolvedHost} initialData={domainData}>
            {isSubdomain ? (
              // ✅ Render alternate page for subdomains
              <DynamicPoiPage />
            ) : (
              // ✅ Render normal UI for root domain
              children
            )}
          </DomainProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

