import axios, { AxiosResponse } from "axios";
import { REQUEST_METHODS } from "@/types/general";
import { getBrowserApiLink } from "@/functions/getBrowserApiLink";

export const handleRequest = (
  method: REQUEST_METHODS,
  url: string,
  data: unknown,
  authKey?: string,
): Promise<AxiosResponse> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authKey) {
    headers.Authorization = authKey;
  }

  return axios.request({
    method,
    url: getBrowserApiLink() + url,
    headers,
    data,
    withCredentials: true,
  });
};
