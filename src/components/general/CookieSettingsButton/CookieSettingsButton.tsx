"use client";

import { openCookieBanner } from "@/functions/cookieConsent";
import styles from "./CookieSettingsButton.module.css";

const CookieSettingsButton = () => {
  return (
    <button type="button" className={styles.button} onClick={openCookieBanner}>
      Настройки cookies
    </button>
  );
};

export default CookieSettingsButton;
