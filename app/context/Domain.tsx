/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1️⃣ Define the shape of your domain context
type DomainContextType = {
  currentDomain: string;
  setCurrentDomain: (domain: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  domainData: any; // ✅ store domain data
  setDomainData: (data: any) => void;
};

// 2️⃣ Create the context
const DomainContext = createContext<DomainContextType>({
  currentDomain: '',
  setCurrentDomain: () => {},
  isLoading: true,
  setIsLoading: () => {},
  domainData: null,
  setDomainData: () => {},
});

// 3️⃣ Define props for DomainProvider
type DomainProviderProps = {
  children: ReactNode;
  initialDomain?: string;
};

// 4️⃣ DomainProvider component
export const DomainProvider = ({
  children,
  initialDomain = ''
}: DomainProviderProps) => {
  const [currentDomain, setCurrentDomain] = useState<string>(initialDomain);
  const [isLoading, setIsLoading] = useState<boolean>(!initialDomain);
  const [domainData, setDomainData] = useState<any>(null); // ✅ new state

  // ✅ Update currentDomain & isLoading when initialDomain changes
  useEffect(() => {
    if (initialDomain) {
      setCurrentDomain(initialDomain);
      setIsLoading(false);
    }
  }, [initialDomain]);

  return (
    <DomainContext.Provider
      value={{
        currentDomain,
        setCurrentDomain,
        isLoading,
        setIsLoading,
        domainData,
        setDomainData, // ✅ expose setter
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};

// 5️⃣ Hook to use context
export const useDomain = (): DomainContextType => useContext(DomainContext);
