import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import DomainWrapper from "./components/ui/loading/DomainWrapper";

type RootLayoutProps = { children: ReactNode };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamic metadata
export async function generateMetadata(): Promise<Metadata> {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || "";

  let title = "Staybook Tickets";
  let description = "Book tickets for attractions with Staybook";

  // Example domain-specific metadata
  if (host.includes("delhitickets.com")) {
    title = "Delhi Tickets";
    description = "Book entry tickets and tours in Delhi";
  } else if (host.includes("agratickets.com")) {
    title = "Agra Tickets";
    description = "Skip-the-line entry to Taj Mahal and Agra Fort";
  }

  console.log('___host' , host)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://${host}`,
      images: [
        {
          url: `https://${host}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DomainWrapper host={host}>{children}</DomainWrapper>
      </body>
    </html>
  );
}
