import React from "react";
import styles from "./PhoneEmailLinks.module.css";
import { CONTACTS } from "@/constants/general";

const PhoneEmailLinks = () => {
  return (
     <div className={styles.PhoneEmailLinks}>
        <div className={styles.block} itemScope itemType="http://schema.org/ContactPoint">
           <h3>Позвонить</h3>
           <a href={`tel:${CONTACTS.phone.value}`} itemProp="telephone">
              {CONTACTS.phone.title}
           </a>
        </div>

        <div className={styles.block} itemScope itemType="http://schema.org/ContactPoint">
           <h3>Написать</h3>
           <a href={`mailto:${CONTACTS.email.value}`} itemProp="email">
              {CONTACTS.email.title}
           </a>
        </div>
     </div>
  );
};

export default PhoneEmailLinks;
