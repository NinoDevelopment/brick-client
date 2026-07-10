import styles from './AboutCompany.module.css';
import Image from "next/image";

const AboutCompany = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/Organization">
       <div className={styles.left}>
         <h2 itemProp="name">О компании</h2>
         <h4 itemProp="slogan">Давайте знакомиться</h4>
       </div>

       <div className={styles.right}>
          <p className={styles.text} itemProp="description">
             Кирпичный завод «Ковернино» находится в Нижегородской области. Мы производим
             кирпич из глины собственного карьера и поставляем его в Нижний Новгород
             и по области — напрямую, без посредников.
          </p>

          <p className={styles.text}>
             В каталоге — красный, керамический, облицовочный и строительный кирпич
             для частного и коммерческого строительства.
          </p>

          <h5 className={styles.listTitle}>Ассортимент</h5>
          <ul className={styles.list}>
             <li>Красный кирпич — для несущих стен и наружной кладки.</li>
             <li>Керамический — прочный, морозостойкий, экологичный.</li>
             <li>Облицовочный — для фасадов и декоративной отделки.</li>
             <li>Строительный (рядовой) — надёжное решение по доступной цене.</li>
          </ul>

          <h5 className={styles.listTitle}>Почему выбирают нас</h5>
          <ul className={styles.list}>
             <li>Собственная глина и полный цикл производства на заводе.</li>
             <li>Цены от производителя — без лишних наценок.</li>
             <li>Доставка по Нижнему Новгороду и Нижегородской области.</li>
             <li>Поможем подобрать кирпич под ваш проект.</li>
          </ul>

          <p className={styles.text}>
             Оформите заказ на сайте или позвоните — привезём кирпич прямо с завода.
          </p>
       </div>

       <div className={styles.images}>
         <Image
            width={1920}
            height={705}
            src={'/other/about-bg-1.png'}
            alt="Облицовочный кирпич с доставкой в Нижнем Новгороде"
            className={styles.w100}
            itemProp="image"
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-2.png'}
            alt="Облицовочный кирпич от производителя в Нижнем Новгороде"
            className={styles.w50}
            itemProp="image"
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-3.png'}
            alt="Строительный кирпич с доставкой от производителя в Нижнем Новгороде"
            className={styles.w50}
            itemProp="image"
         />
       </div>

       <meta itemProp="url" content={process.env.NEXT_PUBLIC_PROD_URL}/>
       <meta itemProp="logo" content={`${process.env.NEXT_PUBLIC_PROD_URL}/Logo-dark.svg`}/>
       <meta itemProp="address" content="Нижегородская область, Ковернино"/>
       <meta itemProp="telephone" content="+7 (921) 509-24-09"/>
       <meta itemProp="email" content="kzkvrn@yandex.ru"/>
     </div>
  );
};

export default AboutCompany;
