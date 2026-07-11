import React from "react";
import styles from "./ExclusiveBlock.module.css";
import Image from "next/image";
import Link from "next/link";
import { LINK_CATALOG, LINK_DELIVERY } from "@/constants/links";

const ExclusiveBlock = () => {
  return (
     <div className={styles.wrapper}>
       <Image src="/icons/exclusiveIcon.svg" width={421} height={420} alt="Производство кирпича на заводе Ковернино"/>

       <div className={styles.content}>
         <h2>Производство</h2>
         <p className={styles.text}>
           Не перепродаём чужой кирпич — делаем сами. Глина с собственного карьера,
           формовка и обжиг на заводе в Ковернинском районе.
         </p>
         <p className={styles.text}>
           В ассортименте — красный, керамический, облицовочный и строительный кирпич.
           Покупаете напрямую у производителя:{" "}
           <Link href={LINK_CATALOG}>каталог с ценами</Link>
           {" "}и{" "}
           <Link href={LINK_DELIVERY}>доставка по Нижнему Новгороду и области</Link>.
         </p>
       </div>
     </div>
  );
};

export default ExclusiveBlock;
