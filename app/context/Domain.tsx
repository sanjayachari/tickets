"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DomainData } from "../classes/DomainData";

type DomainContextType = {
  currentDomain: string;
  setCurrentDomain: (domain: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  domainData: DomainData | null;
  setDomainData: (data: DomainData | null) => void;
};

const DomainContext = createContext<DomainContextType>({
  currentDomain: "",
  setCurrentDomain: () => {},
  isLoading: true,
  setIsLoading: () => {},
  domainData: null,
  setDomainData: () => {},
});

type DomainProviderProps = {
  children: ReactNode;
  initialDomain?: string;
  initialData?: DomainData | null;
};

export const DomainProvider = ({
  children,
  initialDomain = "",
  initialData = null,
}: DomainProviderProps) => {
  const [currentDomain, setCurrentDomain] = useState<string>(initialDomain);
  const [isLoading, setIsLoading] = useState<boolean>(!initialDomain);
  const [domainData, setDomainData] = useState<DomainData | null>(initialData);

  useEffect(() => {
    if (initialDomain) {
      setCurrentDomain(initialDomain);
      setDomainData(initialData);
      setIsLoading(false);
    }
  }, [initialDomain, initialData]);

  return (
    <DomainContext.Provider
      value={{
        currentDomain,
        setCurrentDomain,
        isLoading,
        setIsLoading,
        domainData,
        setDomainData,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};

export const useDomain = (): DomainContextType => useContext(DomainContext);
