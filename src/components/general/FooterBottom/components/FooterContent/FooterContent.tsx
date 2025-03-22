import React from "react";
import styles from "./FooterContent.module.css";
import Link from "next/link";
import { CONTACTS } from "@/constants/general";
import { LINK_PRIVACY, LINK_REQUISITES } from "@/constants/links";
import ContactsMap from "@/components/contacts-page/ContactsMap/ContactsMap";

const FooterContent = () => {
  return (
    <footer className={styles.FooterContent}>
      <div className={styles.top}>
        <h4>
          Свяжитесь с нами, <br />
          задайте интересующие <span>вопросы</span>
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

      <div className={styles.bottom}>
        <div className={styles.left}>
          <h6>
            © КЗК 2022-2025, Все права защищены, <br />
            Powered by leshakuzz
          </h6>

          <h5>
            <Link href={LINK_REQUISITES}>Реквизиты и юр. информация</Link>{" "}
            <br />
            <Link href={LINK_PRIVACY}>Политика конфиденциальности</Link>
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
