export const getBrowserApiLink = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "/api-proxy";
  }
  return process.env.NEXT_PUBLIC_API_LINK || "";
};
