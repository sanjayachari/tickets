import type { Metadata } from "next";
import { ReactNode } from "react"; // ✅ import ReactNode
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DomainProvider } from "./context/Domain";
import { headers } from "next/headers";

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
  // ✅ Await headers() because it's async in Next.js 15
  const currentHeaders = await headers();
  const host = currentHeaders.get("x-current-domain") || "delhitickets.com";
  console.log('host' , host)
  return (
    <html lang="en">
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DomainProvider initialDomain={host}>{children}</DomainProvider>
      </body>
    </html>
  );
}
