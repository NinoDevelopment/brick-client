import React from 'react';
import styles from './AboutCompany.module.css';
import { APP_TITLE } from '@/constants/general';

const AboutCompany = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1>О компании</h1>
        <h4>Давайте знакомиться</h4>
      </div>

      <div className={styles.right}>
        <h5>
          Кирпичный завод Ковернино является лидером в производстве
          качественного кирпича в Нижнем Новгороде и Нижегородской области. Мы
          используем только высококачественную глину собственного производства,
          что обеспечивает превосходное качество и долговечность нашей
          продукции. Наш ассортимент кирпичей вдохновляет архитектурные проекты
          по всей стране и помогает строителям и архитекторам в осуществлении
          новаторских идей.
          <br />
          <br />
          Каждый кирпич, произведенный на нашем заводе, имеет уникальную
          текстуру и структуру, что делает его идеальным для создания
          выразительных архитектурных решений. Мы гордимся нашими продуктами и
          всегда готовы поделиться их историей с вами.
        </h5>
      </div>

      <div className={styles.images}>
        <img
          src={'/other/about-bg-1.png'}
          alt={APP_TITLE}
          className={styles.w100}
        />
        <img
          src={'/other/about-bg-2.png'}
          alt={APP_TITLE}
          className={styles.w50}
        />
        <img
          src={'/other/about-bg-3.png'}
          alt={APP_TITLE}
          className={styles.w50}
        />
      </div>
    </div>
  );
};

export default AboutCompany;
