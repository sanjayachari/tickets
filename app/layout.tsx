import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DomainProvider } from "./context/Domain";
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

export const metadata: Metadata = {
  title: "Delhi tickets",
  description: "Delhi tickets booking",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || null; // don't fallback yet
  console.log("host", host);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children in a client component that handles loading */}
        <DomainWrapper host={host}>{children}</DomainWrapper>
      </body>
    </html>
  );
}
