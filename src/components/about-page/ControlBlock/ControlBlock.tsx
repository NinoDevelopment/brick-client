import React from "react";
import styles from "./ControlBlock.module.css";
import { APP_TITLE } from "@/constants/general";

const ControlBlock = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.block}>
          <div content={styles.imgContainer}>
            <img src="/icons/search-about-icon.png" alt={APP_TITLE} />
          </div>
          <div className={styles.inner}>
            <h3>Контроль</h3>
            <h5>
              Производственный процесс сложен, и каждый из наших кирпичей
              проходит путь строгого контроля.
            </h5>
          </div>
        </div>

        <div className={styles.block}>
          <div content={styles.imgContainer}>
            <img src="/icons/brick-about-icon.png" alt={APP_TITLE} />
          </div>
          <div className={styles.inner}>
            <h3>Дизайн</h3>
            <h5>
              Мы уделяем время, чтобы понять ваш проект. Выбор текстуры и тона
              требует тщательного рассмотрения, и наша команда всегда готова
              воплотить в жизнь ваш дизайн.
            </h5>
          </div>
        </div>

        <div className={styles.block}>
          <div content={styles.imgContainer}>
            <img src="/icons/delivery-about-icon.png" alt={APP_TITLE} />
          </div>
          <div className={styles.inner}>
            <h3>Доставка</h3>
            <h5>
              Задержка поставок в лучшем случае неудобна, а в худшем —
              дорогостояща. Как завод по производству кирпича, мы экономим ваше
              время и деньги.
            </h5>
          </div>
        </div>
      </div>
      <div className={styles.bgImage} />
    </div>
  );
};

export default ControlBlock;
