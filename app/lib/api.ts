// lib/api.ts
export type DomainMeta = {
  title: string;
  description: string;
  keywords?: string;
  canonical_url?: string;
  image_url?: string;
};

export type DomainDataType = {
  name: string;
  domain_name: string;
  info?: string;
  description?: string;
  image_url?: string;
  meta_data?: DomainMeta;
};

// Example: fetch domain data from your API or database
export async function getDomainData(domain: string): Promise<DomainDataType | null> {
  // Replace with real API or DB call
  const mockDomains: Record<string, DomainDataType> = {
    "delhitickets.com": {
      name: "Delhi Tickets",
      domain_name: "delhitickets.com",
      description: "Book entry tickets and tours in Delhi",
      meta_data: {
        title: "Delhi Tickets",
        description: "Book entry tickets and tours in Delhi",
        image_url: "https://delhitickets.com/og-image.jpg",
      },
    },
    "agratickets.com": {
      name: "Agra Tickets",
      domain_name: "agratickets.com",
      description: "Skip-the-line entry to Taj Mahal and Agra Fort",
      meta_data: {
        title: "Agra Tickets",
        description: "Skip-the-line entry to Taj Mahal and Agra Fort",
        image_url: "https://agratickets.com/og-image.jpg",
      },
    },
  };
  return mockDomains[domain] || null;
}
