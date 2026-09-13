"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { FACTORY_COORDS, YANDEX_MAPS_API_KEY } from "@/constants/operator";
import styles from "./ContactsMap.module.css";

const placemarkPosition = [FACTORY_COORDS.lat, FACTORY_COORDS.lon];

const ContactsMapInner = () => (
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

export default ContactsMapInner;
