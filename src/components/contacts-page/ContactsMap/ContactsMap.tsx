"use client";

import dynamic from "next/dynamic";
import { FACTORY_COORDS } from "@/constants/operator";
import { SHOPS_ADDRESSES } from "@/constants/general";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { openCookieBanner } from "@/functions/cookieConsent";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import styles from "./ContactsMap.module.css";

const MAPS_URL = `https://yandex.ru/maps/?ll=${FACTORY_COORDS.lon},${FACTORY_COORDS.lat}&z=15&pt=${FACTORY_COORDS.lon},${FACTORY_COORDS.lat},pm2rdm`;

const ContactsMapInner = dynamic(() => import("./ContactsMapInner"), {
  ssr: false,
});

const ContactsMap = () => {
  const { analytics, hydrated } = useCookieConsent();
  const { ref, inView } = useInViewOnce();
  const pickup = SHOPS_ADDRESSES[0];

  if (!hydrated || !analytics) {
    return (
      <div ref={ref} className={styles.placeholder}>
        <p className={styles.address}>
          {pickup.city}, {pickup.address}
        </p>
        <a href={MAPS_URL} target="_blank" rel="noreferrer">
          Открыть в Яндекс.Картах
        </a>
        {hydrated && !analytics && (
          <button type="button" onClick={openCookieBanner}>
            Показать карту на сайте
          </button>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={styles.ContactsMap}>
      {inView ? <ContactsMapInner /> : null}
    </div>
  );
};

export default ContactsMap;
