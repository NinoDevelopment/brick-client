"use client";

import dynamic from "next/dynamic";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { openCookieBanner } from "@/functions/cookieConsent";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import "./ZonesMap.module.css";

const ZonesMapInner = dynamic(() => import("./ZonesMapInner"), {
  ssr: false,
});

const ZonesMap = () => {
  const { analytics, hydrated } = useCookieConsent();
  const { ref, inView } = useInViewOnce();

  if (!hydrated || !analytics) {
    return (
      <div ref={ref} className="map-container">
        <p>
          Карта зоны доставки загружается после согласия на аналитические
          cookies.
        </p>
        <button type="button" onClick={openCookieBanner}>
          Настройки cookies
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="map-container">
      {inView ? <ZonesMapInner /> : null}
    </div>
  );
};

export default ZonesMap;
