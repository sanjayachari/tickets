"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1️⃣ Define the shape of your domain context
type DomainContextType = {
  currentDomain: string;
  setCurrentDomain: (domain: string) => void;
};

// 2️⃣ Create the context
const DomainContext = createContext<DomainContextType>({
  currentDomain: '',
  setCurrentDomain: () => {},
});

// 3️⃣ Define props for DomainProvider
type DomainProviderProps = {
  children: ReactNode;
  initialDomain?: string; // ✅ Add this
};

// 4️⃣ DomainProvider component
export const DomainProvider = ({ children, initialDomain = 'delhitickets.com' }: DomainProviderProps) => {
  const [currentDomain, setCurrentDomain] = useState<string>(initialDomain);

  return (
    <DomainContext.Provider value={{ currentDomain, setCurrentDomain }}>
      {children}
    </DomainContext.Provider>
  );
};

// 5️⃣ Hook to use context
export const useDomain = (): DomainContextType => useContext(DomainContext);
