import React from 'react';
import styles from './CalcBanner.module.css';
import {Container} from "react-bootstrap";
import Link from "next/link";
import {APP_TITLE} from "@/constants/general";

const CalcBanner = () => {
   return (
      <Container className={styles.wrapper}>
         <div className={styles.content}>
            <h1>Рассчитать кирпич</h1>
            <h5 className={styles.subtitle}>Давайте посчитаем</h5>

            <h5 className={styles.text}>
               Кирпичный завод Ковернино представляет вам уникальный онлайн
               калькулятор кирпича. С его помощью вам не составит труда
               произвести расчет количества кирпича, необходимого для
               ваших строительных работ.
            </h5>

            <Link href={'/'}>
               Перейти к калькулятору
            </Link>
         </div>

         <img src={'/other/calculator.svg'} alt={APP_TITLE} />
      </Container>
   );
};

export default CalcBanner;