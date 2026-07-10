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
          <h5 itemProp="description">
             Кирпичный завод «Ковернино» в Нижегородской области. Производим кирпич
             из собственной глины и доставляем в Нижний Новгород и по области.
             <br/><br/>
             В каталоге — красный, керамический, облицовочный и строительный кирпич.
             Работаем напрямую с производителя, без посредников.
          </h5>

          <ol>
             <li>Красный кирпич – идеален для строительства и отделки.</li>
             <li>Керамический кирпич – экологичный, надежный и долговечный.</li>
             <li>Облицовочный кирпич – для эстетичных и выразительных фасадов.</li>
             <li>Строительный кирпич – прочный и выгодный по цене.</li>
          </ol>

          <h5>Почему выбирают наш кирпич?</h5>

          <ol>
             <li>Собственное сырье – гарантия качества.</li>
             <li>Доступная цена на кирпич.</li>
             <li>Доставка кирпича по Нижнему Новгороду и области.</li>
             <li>Широкий выбор для любых архитектурных решений.</li>
          </ol>

          <h5>Закажите кирпич с доставкой прямо с завода.</h5>
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
