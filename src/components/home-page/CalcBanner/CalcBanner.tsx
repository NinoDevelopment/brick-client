import styles from './CalcBanner.module.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';
import { LINK_CALCULATOR } from '@/constants/links';
import Image from "next/image";

const CalcBanner = () => {
  return (
    <Container className={styles.wrapper}>
       <div className={styles.content}>
          <h2 itemProp="name">Рассчитать кирпич для вашего проекта</h2>
          <h5 className={styles.text} itemProp="description">
             Перейдите в раздел калькулятора, чтобы быстро и удобно рассчитать
             необходимое количество кирпича для строительства. Просто укажите
             параметры строения, и наш инструмент поможет определить оптимальное
             количество кирпичей, учитывая их размеры и ваши потребности.
             Останется только удивится нашим низким ценам и оформить доставку!
          </h5>

          <Link href={LINK_CALCULATOR} itemProp="potentialAction" itemType="https://schema.org/Action">
             Перейти к калькулятору
          </Link>
       </div>

       <Image
          width={747}
          height={747}
          src="/other/calculator.svg"
          alt="Кирпич по низким ценам Нижний Новгород"
          itemProp="image"
       />
    </Container>
  );
};

export default CalcBanner;
