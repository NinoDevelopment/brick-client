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
           Завод «Ковернино» производит кирпич в Нижегородской области из глины
           собственного карьера. Контролируем качество на каждом этапе —
           от сырья до отгрузки.
         </p>
         <p className={styles.text}>
           Работаем с частными застройщиками, подрядчиками и торговыми организациями.
           Подскажем, какой кирпич лучше подойдёт под вашу задачу.
         </p>
       </div>
     </div>
  );
};

export default ExperienceBlock;
