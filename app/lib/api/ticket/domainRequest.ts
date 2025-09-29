import apiClient from "../../helper/apiClient";
import { DomainData } from "@/app/classes/DomainData";
import { DomainErrorResponse, DomainParams, DomainResponse } from "./requestParams";

interface DomainRequestInterface {
  fetchDomainData: (
    params: DomainParams
  ) => Promise<DomainResponse<DomainData> | DomainErrorResponse>;
}

// ✅ fixed implementation
async function fetchDomainData(
  params: DomainParams
): Promise<DomainResponse<DomainData> | DomainErrorResponse> {
  try {
    const res = await apiClient.get(`/domain/${params.domain}`);
    return res.data as DomainResponse<DomainData>;
  } catch (error: any) {
    console.error("API Error:", error.message);

    // Return a typed error response
    return {
      status: false,
      message: "Failed to fetch domain data",
      params,
      data: null,
      error: error.message,
      status_code: error.response?.status || 500,
      time_stamp: new Date().toISOString(),
    };
  }
}

export const DomainRequests: DomainRequestInterface = {
  fetchDomainData,
};
