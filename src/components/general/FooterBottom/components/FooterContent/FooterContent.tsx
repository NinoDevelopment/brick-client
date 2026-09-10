import React from "react";
import styles from "./FooterContent.module.css";
import Link from "next/link";
import { CONTACTS } from "@/constants/general";
import { SITE_NAME } from "@/constants/seo";
import {
  LINK_CONSENT,
  LINK_DELIVERY,
  LINK_DELIVERY_CITY,
  LINK_PRIVACY,
  LINK_REQUISITES,
} from "@/constants/links";
import { DELIVERY_CITIES } from "@/constants/deliveryCities";
import ContactsMap from "@/components/contacts-page/ContactsMap/ContactsMap";
import CookieSettingsButton from "@/components/general/CookieSettingsButton/CookieSettingsButton";

const FooterContent = () => {
  return (
    <footer className={styles.FooterContent}>
      <div className={styles.top}>
        <h4>
          Есть вопросы? <br />
          <span>Напишите</span> или позвоните
        </h4>
        <div className={styles.right}>
          <div className={styles.block}>
            <p>По телефону</p>
            <div className={styles.links}>
              <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
            </div>
          </div>

          <div className={styles.block}>
            <p>В мессенджерах</p>
            <div className={styles.links}>
              <a
                href={`https://wa.me/${CONTACTS.phone.valueWS}`}
                target={"_blank"}
                rel={"noreferrer"}
              >
                WhatsApp
              </a>
              <span>|</span>
              <a
                href={`https://t.me/${CONTACTS.tg.nick}`}
                target={"_blank"}
                rel={"noreferrer"}
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cities}>
        <p className={styles.citiesTitle}>
          Доставка кирпича по области —{" "}
          <Link href={LINK_DELIVERY}>все условия</Link>
        </p>
        <ul className={styles.citiesList}>
          {DELIVERY_CITIES.map((city) => (
            <li key={city.slug}>
              <Link href={LINK_DELIVERY_CITY(city.slug)}>
                Кирпич в {city.namePrepositional}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <div className={styles.left}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {SITE_NAME}
          </p>

          <h5>
            <Link href={LINK_REQUISITES}>Реквизиты</Link> <br />
            <Link href={LINK_PRIVACY}>Политика обработки персональных данных</Link>
            <br />
            <Link href={LINK_CONSENT}>Согласие на обработку ПДн</Link>
            <br />
            <CookieSettingsButton />
          </h5>
        </div>

        <div className={styles.mapContainer}>
          <ContactsMap />
        </div>
      </div>
    </footer>
  );
};

export default FooterContent;
