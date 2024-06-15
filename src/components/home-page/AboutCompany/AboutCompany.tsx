import React from "react";
import styles from "./AboutCompany.module.css";
import { APP_TITLE } from "@/constants/general";

const AboutCompany = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1>О компании</h1>
        <h4>Давайте знакомиться</h4>
      </div>

      <div className={styles.right}>
        <h5>
          Кирпичный завод Ковернино является ведущим поставщиком кирпича в
          Нижегородской области. Мы производим наши кирпичи из
          высококачественной глины собственного карьера, что обеспечивает
          непревзойденное качество и долговечность нашей продукции. Наша
          коллекция кирпичей не только поддерживает архитектурный дизайн по всей
          стране, но также помогает домостроителям и архитекторам в реализации
          экспериментальных и инновационных проектов.
          <br />
          <br />
          Каждый кирпич нашего производства обладает уникальным характером и
          неповторимой текстурой, что делает его идеальным выбором для создания
          эффектных архитектурных решений. Структура поверхности каждого кирпича
          рассказывает историю подлинности и качества ручной работы. Мы гордимся
          нашими продуктами и всегда готовы поделиться их историей с вами.
        </h5>
      </div>

      <div className={styles.images}>
        <img
          src={"/other/about-bg-1.png"}
          alt={APP_TITLE}
          className={styles.w100}
        />
        <img
          src={"/other/about-bg-2.png"}
          alt={APP_TITLE}
          className={styles.w50}
        />
        <img
          src={"/other/about-bg-3.png"}
          alt={APP_TITLE}
          className={styles.w50}
        />
      </div>
    </div>
  );
};

export default AboutCompany;
