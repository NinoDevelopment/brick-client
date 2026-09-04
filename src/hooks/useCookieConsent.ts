"use client";

import { useCallback, useEffect, useState } from "react";
import {
  COOKIE_BANNER_OPEN_EVENT,
  COOKIE_CONSENT_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentDecision,
} from "@/functions/cookieConsent";

export const useCookieConsent = () => {
  const [decision, setDecision] = useState<CookieConsentDecision | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const current = readCookieConsent();
    setDecision(current);
    setBannerOpen(!current);
    setHydrated(true);

    const onChange = () => setDecision(readCookieConsent());
    const onOpen = () => setBannerOpen(true);

    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    window.addEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
      window.removeEventListener(COOKIE_BANNER_OPEN_EVENT, onOpen);
    };
  }, []);

  const accept = useCallback(() => {
    setDecision(writeCookieConsent(true));
    setBannerOpen(false);
  }, []);

  const decline = useCallback(() => {
    setDecision(writeCookieConsent(false));
    setBannerOpen(false);
  }, []);

  return {
    hydrated,
    analytics: decision?.analytics === true,
    decided: decision !== null,
    bannerOpen: hydrated && bannerOpen,
    accept,
    decline,
  };
};
