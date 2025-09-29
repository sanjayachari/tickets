// lib/api.ts

export interface DomainMetaData {
  title: string;
  keywords: string;
  image_url: string;
  description: string;
  canonical_url: string;
}

export interface DomainData {
  domain_Id: number;
  domain_Name: string;
  domain_Title: string;
  domain_Info: string;
  domain_Description: string;
  domain_Image_Url: string;
  domain_Meta_Data: DomainMetaData;
  domain_Availability: boolean;
  domain_City: string;
  domain_City_Code: string;
  domain_State: string;
  domain_State_Code: string;
  domain_Country: string;
  domain_Country_Code: string;
  domain_Created_At: string; // ISO timestamp
  domain_Updated_At: string; // ISO timestamp
}

// Example: fetch domain data from your API or database
export async function getDomainData(domain: string): Promise<DomainData | null> {
  // Replace with real API or DB call
  const mockDomains: Record<string, DomainData> = {
    "delhitickets.com": {
      domain_Id: 1,
      domain_Name: "delhitickets.com",
      domain_Title: "Delhi Tickets & Tours",
      domain_Info: "Explore top attractions in Delhi",
      domain_Description: "Book entry tickets and tours in Delhi",
      domain_Image_Url: "https://delhitickets.com/og-image.jpg",
      domain_Meta_Data: {
        title: "Delhi Tickets",
        description: "Book entry tickets and tours in Delhi",
        keywords: "Delhi, tickets, tours, monuments",
        canonical_url: "https://delhitickets.com",
        image_url: "https://delhitickets.com/og-image.jpg",
      },
      domain_Availability: true,
      domain_City: "Delhi",
      domain_City_Code: "DEL",
      domain_State: "Delhi",
      domain_State_Code: "DL",
      domain_Country: "India",
      domain_Country_Code: "IN",
      domain_Created_At: new Date().toISOString(),
      domain_Updated_At: new Date().toISOString(),
    },
    "agratickets.com": {
      domain_Id: 2,
      domain_Name: "agratickets.com",
      domain_Title: "Agra Tickets & Tours",
      domain_Info: "Skip-the-line entry to Taj Mahal and Agra Fort",
      domain_Description: "Book guided tours and tickets for Taj Mahal and Agra Fort",
      domain_Image_Url: "https://agratickets.com/og-image.jpg",
      domain_Meta_Data: {
        title: "Agra Tickets",
        description: "Skip-the-line entry to Taj Mahal and Agra Fort",
        keywords: "Agra, Taj Mahal, Agra Fort, tickets",
        canonical_url: "https://agratickets.com",
        image_url: "https://agratickets.com/og-image.jpg",
      },
      domain_Availability: true,
      domain_City: "Agra",
      domain_City_Code: "AGR",
      domain_State: "Uttar Pradesh",
      domain_State_Code: "UP",
      domain_Country: "India",
      domain_Country_Code: "IN",
      domain_Created_At: new Date().toISOString(),
      domain_Updated_At: new Date().toISOString(),
    },
  };

  return mockDomains[domain] || null;
}
