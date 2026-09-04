"use client";

import { useEffect } from "react";
import { YANDEX_METRIKA_ID } from "@/constants/operator";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const SCRIPT_SRC = "https://mc.yandex.ru/metrika/tag.js";
const SCRIPT_ID = "yandex-metrika";

type YmStub = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

const ensureYmStub = (): YmStub => {
  const current = window.ym as YmStub | undefined;
  if (current) {
    return current;
  }

  const stub: YmStub = (...args: unknown[]) => {
    stub.a = stub.a || [];
    stub.a.push(args);
  };
  stub.l = Date.now();
  window.ym = stub;
  return stub;
};

const loadMetrika = (id: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const ym = ensureYmStub();
  ym(id, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    defer: true,
  });

  if (document.getElementById(SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = SCRIPT_SRC;
  document.head.appendChild(script);
};

const YandexMetrika = () => {
  const { analytics } = useCookieConsent();

  useEffect(() => {
    if (!analytics) {
      return;
    }

    loadMetrika(YANDEX_METRIKA_ID);
  }, [analytics]);

  return null;
};

export default YandexMetrika;
