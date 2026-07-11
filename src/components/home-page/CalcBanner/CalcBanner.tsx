import styles from './CalcBanner.module.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { LINK_CALCULATOR } from '@/constants/links';
import Image from "next/image";

const CalcBanner = () => {
  return (
    <Container className={styles.wrapper}>
       <div className={styles.content}>
          <h2>Калькулятор</h2>
          <h5 className={styles.text}>
             Укажите размеры стен или объём кладки — калькулятор посчитает,
             сколько кирпича нужно для вашего проекта. После расчёта можно
             сразу оформить заказ.
          </h5>

          <Link href={LINK_CALCULATOR}>
             Рассчитать количество
          </Link>
       </div>

       <Image
          width={747}
          height={747}
          src="/other/calculator.svg"
          alt="Калькулятор кирпича — расчёт количества для строительства"
       />
    </Container>
  );
};

export default CalcBanner;
