import styles from './AboutCompany.module.css';
import Image from "next/image";
import Link from "next/link";
import { LINK_ABOUT, LINK_CATALOG, LINK_CONTACTS, LINK_DELIVERY, LINK_DELIVERY_CITY } from "@/constants/links";
import { DELIVERY_CITIES } from "@/constants/deliveryCities";

const AboutCompany = () => {
  return (
     <div className={styles.wrapper}>
       <div className={styles.left}>
         <h2>О нас</h2>
         <h4>Давайте знакомиться</h4>
       </div>

       <div className={styles.right}>
          <p className={styles.text}>
             Кирпичный завод «Ковернино» — производство в Нижегородской области.
             Делаем кирпич из глины собственного карьера и доставляем напрямую
             в Нижний Новгород и по области, без посредников.
          </p>

          <p className={styles.text}>
             Возим в{" "}
             {DELIVERY_CITIES.map((city, index) => (
               <span key={city.slug}>
                 <Link
                   href={LINK_DELIVERY_CITY(city.slug)}
                   className={styles.inlineLink}
                 >
                   {city.name}
                 </Link>
                 {index < DELIVERY_CITIES.length - 2
                   ? ", "
                   : index === DELIVERY_CITIES.length - 2
                     ? " и "
                     : ""}
               </span>
             ))}
             {" "}— подробности доставки на страницах городов.
          </p>

          <p className={styles.text}>
             В{" "}
             <Link href={LINK_CATALOG} className={styles.inlineLink}>
               каталоге
             </Link>
             {" "}— красный, керамический, облицовочный и строительный кирпич
             для частного и коммерческого строительства.
          </p>

          <ol className={styles.list}>
             <li>Красный кирпич — для несущих стен и наружной кладки</li>
             <li>Керамический — прочный, морозостойкий, экологичный</li>
             <li>Облицовочный — для фасадов и декоративной отделки</li>
             <li>Строительный — надёжный вариант по цене от завода</li>
          </ol>

          <h5 className={styles.subtitle}>Почему выбирают наш кирпич?</h5>

          <ol className={styles.list}>
             <li>Собственная глина и полный цикл производства</li>
             <li>Цены от производителя — без лишних наценок</li>
             <li>
               <Link href={LINK_DELIVERY} className={styles.inlineLink}>
                 Доставка
               </Link>
               {" "}по Нижнему Новгороду и области
             </li>
             <li>Поможем подобрать кирпич под ваш проект</li>
          </ol>

          <p className={styles.cta}>
             Оформите заказ на сайте или{" "}
             <Link href={LINK_CONTACTS} className={styles.inlineLink}>
               позвоните
             </Link>
             {" "}— привезём кирпич прямо с завода.{" "}
             <Link href={LINK_ABOUT} className={styles.inlineLink}>
               Подробнее о заводе
             </Link>
             .
          </p>
       </div>

       <div className={styles.images}>
         <Image
            width={1920}
            height={705}
            src={'/other/about-bg-1.png'}
            alt="Облицовочный кирпич с доставкой в Нижнем Новгороде"
            className={styles.w100}
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-2.png'}
            alt="Облицовочный кирпич от производителя в Нижнем Новгороде"
            className={styles.w50}
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-3.png'}
            alt="Строительный кирпич с доставкой от производителя в Нижнем Новгороде"
            className={styles.w50}
         />
       </div>
     </div>
  );
};

export default AboutCompany;
