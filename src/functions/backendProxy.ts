export const getApiBaseUrl = (): string =>
  (process.env.NEXT_PUBLIC_API_LINK || "https://kzk.ooo/api").replace(/\/$/, "");

export const buildBackendProxyUrl = (segments: string[], search = ""): string => {
  if (segments.some((segment) => !segment || segment === ".." || segment.includes("/"))) {
    throw new Error("invalid proxy path");
  }
  return `${getApiBaseUrl()}/${segments.join("/")}${search}`;
};
