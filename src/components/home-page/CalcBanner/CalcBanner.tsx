import React from 'react';
import styles from './CalcBanner.module.css';
import {Container} from "react-bootstrap";
import Link from "next/link";
import {APP_TITLE} from "@/constants/general";
import {LINK_CALCULATOR} from "@/constants/links";

const CalcBanner = () => {
   return (
      <Container className={styles.wrapper}>
         <div className={styles.content}>
            <h1>Рассчитать кирпич</h1>

            <h5 className={styles.text}>
               Перейдите в раздел калькулятора кирпича, чтобы быстро и удобно 
               рассчитать необходимое количество материала для вашего проекта. 
               Просто укажите параметры строения, и наш инструмент поможет 
               определить оптимальное количество кирпичей, учитывая их размеры и ваши потребности.
            </h5>

            <Link href={LINK_CALCULATOR}>
               Перейти к калькулятору
            </Link>
         </div>

         <img src={'/other/calculator.svg'} alt={APP_TITLE} />
      </Container>
   );
};

export default CalcBanner;