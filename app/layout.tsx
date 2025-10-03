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

  const parts = host.split(".");
  const isSubdomain = parts.length > 2;
  const subDomain = isSubdomain ? parts[0] : null;
  const rootDomain = parts.slice(-2).join("."); // e.g., agratickets.com

  // Fetch domain data
  let domainData: DomainData | null = null;
  if (isSubdomain && subDomain) {
    domainData = await getDomainData(`${subDomain}.${rootDomain}`);
  } else {
    domainData = await getDomainData(rootDomain);
  }

  const title = domainData?.domain_Meta_Data?.title || "Staybook Tickets";
  const description = domainData?.domain_Meta_Data?.description || "Book tickets for attractions with Staybook";
  const favicon = domainData?.domain_Meta_Data?.favicon_url || `https://${isSubdomain ? `${subDomain}.${rootDomain}` : rootDomain}/favicons/${isSubdomain ? `${subDomain}.${rootDomain}` : rootDomain}.ico`;
  const ogImage = domainData?.domain_Meta_Data?.image_url || favicon;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${host}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    icons: {
      icon: favicon,
    },
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";

  const parts = host.split(".");
  const isSubdomain = parts.length > 2;
  const subDomain = isSubdomain ? parts[0] : null;
  const rootDomain = parts.slice(-2).join(".");

  // Fetch domain data dynamically for subdomain or root domain
  const domainData: DomainData | null = await getDomainData(isSubdomain && subDomain ? `${subDomain}.${rootDomain}` : rootDomain);

  // Build favicon URL dynamically
  const faviconUrl =
    domainData?.domain_Meta_Data?.favicon_url ||
    `https://${isSubdomain ? `${subDomain}.${rootDomain}` : rootDomain}/favicons/${isSubdomain ? `${subDomain}.${rootDomain}` : rootDomain}.ico`;

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href={faviconUrl} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <DomainProvider initialDomain={rootDomain} initialData={domainData}>
            {isSubdomain && subDomain ? (
              <DynamicPoiPage subDomain={subDomain} />
            ) : (
              children
            )}
          </DomainProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
