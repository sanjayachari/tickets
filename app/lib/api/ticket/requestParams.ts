export interface DomainParams {
  domain: string;
}

export interface DomainResponse<T> {
  status: true;
  message: string;
  params?: any;
  data: T;
  error: null;
  status_code: number;
  time_stamp: string;
}

export interface DomainErrorResponse {
  status: false;
  message: string;
  params?: any;
  data: null;
  error: string;
  status_code: number;
  time_stamp: string;
}
