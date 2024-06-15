import React from "react";
import styles from "./ContactsMap.module.css";
import { Map, Placemark } from "@pbe/react-yandex-maps";

const ContactsMap = () => {
  const placemarkPosition = [57.147764, 43.803196];

  return (
    <Map
      defaultState={{
        center: placemarkPosition,
        zoom: 15,
      }}
      className={styles.ContactsMap}
      query={{ apikey: "f1423869-80d1-4c88-8150-8643fdf24b7b" }}
    >
      <Placemark
        geometry={placemarkPosition}
        properties={{
          iconCaption: "Кирпичный завод Ковернино",
        }}
      />
    </Map>
  );
};

export default ContactsMap;
