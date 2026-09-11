import axios, { AxiosResponse } from "axios";
import { REQUEST_METHODS } from "@/types/general";
import { getAdminKey } from "@/functions/getKey";
import { getBrowserApiLink } from "@/functions/getBrowserApiLink";

export const handleRequest = (
  method: REQUEST_METHODS,
  url: string,
  data: any,
): Promise<AxiosResponse> => {
  const options = {
    method: method,
    url: getBrowserApiLink() + url,
    // url: `https://${process.env.URL}/api${url}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAdminKey(),
    },
    data: data,
  };

  return axios.request(options);
};
