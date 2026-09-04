"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { FACTORY_COORDS, YANDEX_MAPS_API_KEY } from "@/constants/operator";
import { SHOPS_ADDRESSES } from "@/constants/general";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { openCookieBanner } from "@/functions/cookieConsent";
import styles from "./ContactsMap.module.css";

const MAPS_URL = `https://yandex.ru/maps/?ll=${FACTORY_COORDS.lon},${FACTORY_COORDS.lat}&z=15&pt=${FACTORY_COORDS.lon},${FACTORY_COORDS.lat},pm2rdm`;

const ContactsMap = () => {
  const { analytics, hydrated } = useCookieConsent();
  const pickup = SHOPS_ADDRESSES[0];
  const placemarkPosition = [FACTORY_COORDS.lat, FACTORY_COORDS.lon];

  if (!hydrated || !analytics) {
    return (
      <div className={styles.placeholder}>
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
    <YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "ru_RU" }}>
      <Map
        defaultState={{
          center: placemarkPosition,
          zoom: 15,
        }}
        className={styles.ContactsMap}
      >
        <Placemark
          geometry={placemarkPosition}
          properties={{
            iconCaption: "Кирпичный завод Ковернино",
          }}
        />
      </Map>
    </YMaps>
  );
};

export default ContactsMap;
