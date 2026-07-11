export const getAdminKey = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const key = window.localStorage.getItem("key");
  return key || null;
};
