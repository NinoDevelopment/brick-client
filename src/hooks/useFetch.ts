import { useEffect, useState } from "react";
import axios from "axios";
import { REQUEST_METHODS } from "@/types/general";
import { getBrowserApiLink } from "@/functions/getBrowserApiLink";

const getCache = new Map<string, { data: unknown; at: number }>();
const GET_TTL_MS = 5 * 60 * 1000;

const cacheKey = (method: string, url: string) => `${method}:${url}`;

const isFreshCache = (at: number) => Date.now() - at < GET_TTL_MS;

const getFetchPollInterval = (interval?: number | false): number | null => {
  if (typeof interval !== "number" || !Number.isFinite(interval) || interval <= 0) {
    return null;
  }
  return interval;
};

const isFetchAbortError = (err: unknown): boolean => {
  if (axios.isCancel(err)) return true;
  return axios.isAxiosError(err) && err.code === "ERR_CANCELED";
};

export const useFetch = <T>(
  url: string,
  method?: string,
  body?: object,
  interval?: number | false,
  enabled: boolean = true,
) => {
  const requestMethod = method || REQUEST_METHODS.GET;
  const requestUrl = getBrowserApiLink() + url;
  const isGet = requestMethod === REQUEST_METHODS.GET;
  const key = cacheKey(requestMethod, requestUrl);
  const bodyKey = JSON.stringify(body ?? null);
  const cachedInitial = enabled && isGet ? getCache.get(key) : undefined;

  const [data, setData] = useState<T | null>(
    cachedInitial ? (cachedInitial.data as T) : null,
  );
  const [load, setLoad] = useState<boolean>(Boolean(enabled && !cachedInitial));
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!enabled) {
      setLoad(false);
      return;
    }

    let cancelled = false;
    let inFlight: AbortController | null = null;
    const cached = isGet ? getCache.get(key) : undefined;
    const fresh = Boolean(cached && isFreshCache(cached.at));
    const pollMs = getFetchPollInterval(interval);

    if (isGet) {
      setData(cached ? (cached.data as T) : null);
    }

    const fetchNow = (silent = false) => {
      inFlight?.abort();
      const controller = new AbortController();
      inFlight = controller;

      if (!silent) {
        setLoad(true);
      }
      setError(null);

      axios
        .request({
          method: requestMethod,
          url: requestUrl,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(bodyKey) ?? {},
          withCredentials: true,
          signal: controller.signal,
        })
        .then((res) => {
          if (cancelled) return;
          setData(res.data);
          if (isGet) {
            getCache.set(key, { data: res.data, at: Date.now() });
          } else {
            getCache.clear();
          }
        })
        .catch((err: unknown) => {
          if (cancelled || isFetchAbortError(err)) return;
          setError(err instanceof Error ? err.message : "Ошибка запроса");
        })
        .finally(() => {
          if (!cancelled) setLoad(false);
        });
    };

    const stopPolling =
      pollMs === null
        ? undefined
        : (() => {
            const id = setInterval(() => fetchNow(true), pollMs);
            return () => clearInterval(id);
          })();

    if (!fresh) {
      fetchNow(Boolean(cached));
    } else {
      setLoad(false);
    }

    return () => {
      cancelled = true;
      inFlight?.abort();
      stopPolling?.();
    };
  }, [requestUrl, requestMethod, bodyKey, interval, enabled, isGet, key]);

  return { data, error, load };
};
