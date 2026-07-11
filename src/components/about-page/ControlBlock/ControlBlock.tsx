import styles from "./ControlBlock.module.css";
import Link from "next/link";
import { LINK_CATALOG, LINK_CONTACTS, LINK_DELIVERY } from "@/constants/links";

const ControlBlock = () => {
  return (
     <div className={styles.wrapper}>
       <div className={styles.content}>
         <div className={styles.block}>
           <div className={styles.imgContainer}>
             <img src="/icons/search-about-icon.png" alt="Контроль качества кирпича"/>
           </div>
           <div className={styles.inner}>
             <h3>Контроль качества</h3>
             <p className={styles.text}>
               Проверяем геометрию, прочность и внешний вид. В отгрузку
               идёт только кирпич, который проходит контроль.
             </p>
           </div>
         </div>

         <div className={styles.block}>
           <div className={styles.imgContainer}>
             <img src="/icons/brick-about-icon.png" alt="Подбор кирпича под проект"/>
           </div>
           <div className={styles.inner}>
             <h3>Подбор под проект</h3>
             <p className={styles.text}>
               Подберём тип, формат и цвет: стены, фасад, перегородки или отделка.
               Смотрите{" "}
               <Link href={LINK_CATALOG}>каталог кирпича</Link>
               {" "}или{" "}
               <Link href={LINK_CONTACTS}>оставьте заявку</Link>.
             </p>
           </div>
         </div>

         <div className={styles.block}>
           <div className={styles.imgContainer}>
             <img src="/icons/delivery-about-icon.png" alt="Доставка кирпича"/>
           </div>
           <div className={styles.inner}>
             <h3>Доставка</h3>
             <p className={styles.text}>
               Привозим в Нижний Новгород и по области своим транспортом.
               Зоны и стоимость — на странице{" "}
               <Link href={LINK_DELIVERY}>«Оплата и доставка»</Link>.
             </p>
           </div>
         </div>
       </div>
       <div className={styles.bgImage}/>
     </div>
  );
};

export default ControlBlock;
