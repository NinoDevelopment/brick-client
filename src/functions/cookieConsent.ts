export const COOKIE_CONSENT_KEY = "kzk_cookie_consent_v1";
export const COOKIE_CONSENT_VERSION = "1";
export const COOKIE_CONSENT_EVENT = "kzk-cookie-consent";
export const COOKIE_BANNER_OPEN_EVENT = "kzk-cookie-banner-open";

export type CookieConsentDecision = {
  version: string;
  analytics: boolean;
  decidedAt: string;
};

const isBrowser = () => typeof window !== "undefined";

export const readCookieConsent = (): CookieConsentDecision | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CookieConsentDecision;
    if (
      parsed.version !== COOKIE_CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const writeCookieConsent = (analytics: boolean): CookieConsentDecision => {
  const decision: CookieConsentDecision = {
    version: COOKIE_CONSENT_VERSION,
    analytics,
    decidedAt: new Date().toISOString(),
  };

  if (isBrowser()) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(decision));
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_EVENT, { detail: decision }),
    );
  }

  return decision;
};

export const openCookieBanner = () => {
  if (isBrowser()) {
    window.dispatchEvent(new Event(COOKIE_BANNER_OPEN_EVENT));
  }
};
