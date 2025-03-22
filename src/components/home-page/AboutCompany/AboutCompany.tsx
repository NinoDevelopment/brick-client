import React from 'react';
import styles from './AboutCompany.module.css';
import { APP_TITLE } from '@/constants/general';
import Image from "next/image";

const AboutCompany = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/Organization">
       <div className={styles.left}>
         <h1 itemProp="name">О компании</h1>
         <h4 itemProp="slogan">Давайте знакомиться</h4>
       </div>

       <div className={styles.right}>
         <h5 itemProp="description">
           Кирпичный завод Ковернино является лидером в производстве
           качественного кирпича в Нижнем Новгороде и Нижегородской области. Мы
           используем только высококачественную глину собственного производства,
           что обеспечивает превосходное качество и долговечность нашей
           продукции. Наш ассортимент кирпичей вдохновляет архитектурные проекты
           по всей стране и помогает строителям и архитекторам в осуществлении
           новаторских идей.
           <br/>
           <br/>
           Каждый кирпич, произведенный на нашем заводе, имеет уникальную
           текстуру и структуру, что делает его идеальным для создания
           выразительных архитектурных решений. Мы гордимся нашими продуктами и
           всегда готовы поделиться их историей с вами.
         </h5>
       </div>

       <div className={styles.images}>
         <Image
            width={1920}
            height={705}
            src={'/other/about-bg-1.png'}
            alt={APP_TITLE}
            className={styles.w100}
            itemProp="image"
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-2.png'}
            alt={APP_TITLE}
            className={styles.w50}
            itemProp="image"
         />
         <Image
            width={960}
            height={706}
            src={'/other/about-bg-3.png'}
            alt={APP_TITLE}
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
