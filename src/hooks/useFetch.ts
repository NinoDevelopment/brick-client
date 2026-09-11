import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { REQUEST_METHODS } from "@/types/general";
import { getAdminKey } from "@/functions/getKey";
import { getBrowserApiLink } from "@/functions/getBrowserApiLink";

const getCache = new Map<string, { data: unknown; at: number }>();
const GET_TTL_MS = 5 * 60 * 1000;

const cacheKey = (method: string, url: string) => `${method}:${url}`;

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
  const cachedInitial =
    enabled && isGet ? getCache.get(key) : undefined;

  const [data, setData] = useState<T | null>(
    cachedInitial ? (cachedInitial.data as T) : null,
  );
  const [load, setLoad] = useState<boolean>(
    Boolean(enabled && !cachedInitial),
  );
  const [error, setError] = useState<null | string>(null);
  const prevUrlRef = useRef<string | null>(null);

  const options = {
    method: requestMethod,
    url: requestUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAdminKey(),
    },
    data: body || {},
  };

  const handleFetch = (silent = false) => {
    if (!silent) {
      setLoad(true);
    }
    setError(null);
    axios
      .request(options)
      .then((res) => {
        setData(res.data);
        if (isGet) {
          getCache.set(key, { data: res.data, at: Date.now() });
        } else {
          getCache.clear();
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const cached = isGet ? getCache.get(key) : undefined;
    const fresh = Boolean(
      cached && Date.now() - cached.at < GET_TTL_MS,
    );

    if (prevUrlRef.current !== options.url) {
      prevUrlRef.current = options.url;
      setData(cached ? (cached.data as T) : null);
    } else if (cached) {
      setData(cached.data as T);
    }

    if (interval) {
      const handleInterval = setInterval(() => {
        handleFetch();
      }, 1000);
      return () => clearInterval(handleInterval);
    }

    if (fresh) {
      setLoad(false);
      return;
    }

    handleFetch(Boolean(cached));
  }, [JSON.stringify(options), interval, enabled]);

  return { data, error, load };
};
