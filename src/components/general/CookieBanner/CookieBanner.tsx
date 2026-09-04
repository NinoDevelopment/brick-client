"use client";

import Link from "next/link";
import { LINK_PRIVACY } from "@/constants/links";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import styles from "./CookieBanner.module.css";

const CookieBanner = () => {
  const { bannerOpen, accept, decline } = useCookieConsent();

  if (!bannerOpen) {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label="Согласие на cookies">
      <p className={styles.text}>
        Мы используем технические cookies для работы сайта и аналитические
        cookies Яндекс.Метрики и Яндекс.Карт — только с вашего согласия.
        Подробнее в{" "}
        <Link href={LINK_PRIVACY}>Политике обработки персональных данных</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={`${styles.button} ${styles.accept}`} onClick={accept}>
          Принять
        </button>
        <button type="button" className={`${styles.button} ${styles.decline}`} onClick={decline}>
          Отклонить
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
