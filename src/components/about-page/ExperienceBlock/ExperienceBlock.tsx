import React from "react";
import styles from "./ExperienceBlock.module.css";
import Link from "next/link";
import { LINK_CATALOG, LINK_CONTACTS } from "@/constants/links";

const ExperienceBlock = () => {
  return (
     <div className={styles.wrapper}>
       <img src={"/icons/experienceIcon.svg"} alt="Опыт производства кирпича Ковернино"/>

       <div className={styles.content}>
         <h2>Опыт</h2>
         <p className={styles.text}>
           Завод «Ковернино» производит кирпич в Нижегородской области из глины
           собственного карьера. Контролируем качество на каждом этапе —
           от сырья до отгрузки.
         </p>
         <p className={styles.text}>
           Работаем с частными застройщиками, подрядчиками и торговыми организациями.
           Подскажем, какой кирпич лучше подойдёт под вашу задачу — смотрите{" "}
           <Link href={LINK_CATALOG}>каталог</Link>
           {" "}или{" "}
           <Link href={LINK_CONTACTS}>свяжитесь с нами</Link>.
         </p>
       </div>
     </div>
  );
};

export default ExperienceBlock;
