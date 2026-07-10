import React from "react";
import styles from "./ExperienceBlock.module.css";
import { APP_TITLE } from "@/constants/general";

const ExperienceBlock = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
       <img src={"/icons/experienceIcon.svg"} alt={APP_TITLE} itemProp="image"/>

       <div className={styles.content}>
         <h2>Опыт</h2>
         <p className={styles.text} itemProp="description">
           Завод «Ковернино» много лет занимается производством кирпича в Нижегородской
           области. Мы используем глину собственного карьера и контролируем качество
           на каждом этапе — от добычи сырья до отгрузки готовой продукции.
         </p>
         <p className={styles.text}>
           За это время мы наладили стабильные поставки для частных застройщиков,
           подрядчиков и торговых организаций. Знаем, какой кирпич нужен под конкретную
           задачу, и помогаем с выбором.
         </p>
       </div>
     </div>
  );
};

export default ExperienceBlock;
