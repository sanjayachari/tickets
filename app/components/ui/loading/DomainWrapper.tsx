"use client";

import { DomainProvider } from "@/app/context/Domain";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  host: string | null;
  children: ReactNode;
};

export default function DomainWrapper({ host, children }: Props) {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    if (host) {
      setDomain(host);
    }
  }, [host]);

  if (!domain) {
    // ✅ Stylish loader until the domain is ready
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-yellow-400 animate-spin"></div>

          {/* Inner Pulse Circle */}
          <div className="absolute w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    );
  }

  return <DomainProvider initialDomain={domain}>{children}</DomainProvider>;
}
