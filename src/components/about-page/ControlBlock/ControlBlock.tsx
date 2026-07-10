import styles from "./ControlBlock.module.css";
import { APP_TITLE } from "@/constants/general";

const ControlBlock = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
       <div className={styles.content}>
         <div className={styles.block} itemScope itemType="http://schema.org/Service">
           <div className={styles.imgContainer}>
             <img src="/icons/search-about-icon.png" alt={APP_TITLE} itemProp="image"/>
           </div>
           <div className={styles.inner}>
             <h3 itemProp="name">Контроль качества</h3>
             <p className={styles.text} itemProp="description">
               Каждая партия проходит проверку: геометрия, прочность, внешний вид.
               Мы не отгружаем кирпич, который не соответствует нашим стандартам.
             </p>
           </div>
         </div>

         <div className={styles.block} itemScope itemType="http://schema.org/Service">
           <div className={styles.imgContainer}>
             <img src="/icons/brick-about-icon.png" alt={APP_TITLE} itemProp="image"/>
           </div>
           <div className={styles.inner}>
             <h3 itemProp="name">Подбор под проект</h3>
             <p className={styles.text} itemProp="description">
               Поможем выбрать тип, формат и цвет кирпича под ваши задачи —
               несущие стены, фасад, внутренняя перегородка или отделка.
             </p>
           </div>
         </div>

         <div className={styles.block} itemScope itemType="http://schema.org/Service">
           <div className={styles.imgContainer}>
             <img src="/icons/delivery-about-icon.png" alt={APP_TITLE} itemProp="image"/>
           </div>
           <div className={styles.inner}>
             <h3 itemProp="name">Доставка</h3>
             <p className={styles.text} itemProp="description">
               Собственный автопарк: привозим кирпич в Нижний Новгород и по области
               в согласованные сроки. Стоимость и зоны доставки — на странице «Оплата и доставка».
             </p>
           </div>
         </div>
       </div>
       <div className={styles.bgImage}/>
     </div>
  );
};

export default ControlBlock;
