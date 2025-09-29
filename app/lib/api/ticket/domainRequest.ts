/* eslint-disable @typescript-eslint/no-explicit-any */

import apiClient from "../../helper/apiClient";
import { DomainData } from "@/app/classes/DomainData";
import { DomainErrorResponse, DomainParams, DomainResponse } from "./requestParams";

interface DomainRequestInterface {
  fetchDomainData: (
    params: DomainParams
  ) => Promise<DomainResponse<DomainData> | DomainErrorResponse>;


 fetchCategoryData: (
    params: DomainParams
  ) => Promise<DomainResponse<any> | DomainErrorResponse>; // you can replace `any` with a proper Category type later
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

// ✅ new function for category
async function fetchCategoryData(
  params: DomainParams
): Promise<DomainResponse<any> | DomainErrorResponse> {
  try {
    const res = await apiClient.get(
      `/domain/${params.domain}/category/`
    );
    return res.data as DomainResponse<any>;
  } catch (error: any) {
    console.error("API Error:", error.message);

    return {
      status: false,
      message: "Failed to fetch category data",
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
  fetchCategoryData
};
