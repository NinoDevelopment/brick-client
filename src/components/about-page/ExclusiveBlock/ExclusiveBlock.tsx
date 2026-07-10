import React from "react";
import styles from "./ExclusiveBlock.module.css";
import { APP_TITLE } from "@/constants/general";
import Image from "next/image";

const ExclusiveBlock = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
       <Image src="/icons/exclusiveIcon.svg" width={421} height={420} alt={APP_TITLE} itemProp="image"/>

       <div className={styles.content}>
         <h2>Производство</h2>
         <p className={styles.text} itemProp="description">
           Не перепродаём чужой кирпич — делаем сами. Глина с собственного карьера,
           формовка и обжиг на заводе в Ковернинском районе.
         </p>
         <p className={styles.text}>
           В ассортименте — красный, керамический, облицовочный и строительный кирпич.
           Покупаете напрямую у производителя, с доставкой по Нижнему Новгороду и области.
         </p>
       </div>
     </div>
  );
};

export default ExclusiveBlock;
