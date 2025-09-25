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
    // ✅ Show loading until the domain is ready
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  return <DomainProvider initialDomain={domain}>{children}</DomainProvider>;
}
