import styles from './CalcBanner.module.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { LINK_CALCULATOR } from '@/constants/links';
import Image from "next/image";

const CalcBanner = () => {
  return (
    <Container className={styles.wrapper}>
       <div className={styles.content}>
          <h1 itemProp="name">Рассчитать кирпич для вашего проекта</h1>
          <h5 className={styles.text} itemProp="description">
             Перейдите в раздел калькулятора, чтобы быстро и удобно рассчитать
             необходимое количество материала для строительства. Просто укажите
             параметры строения, и наш инструмент поможет определить оптимальное
             количество кирпичей, учитывая их размеры и ваши потребности.
          </h5>

          <Link href={LINK_CALCULATOR} itemProp="potentialAction" itemType="https://schema.org/Action">
             Перейти к калькулятору
          </Link>
       </div>

       <Image
          width={747}
          height={747}
          src={'/other/calculator.svg'}
          alt="Калькулятор для расчета стоимости кирпича"
          itemProp="image"
       />
    </Container>
  );
};

export default CalcBanner;
