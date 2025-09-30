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
