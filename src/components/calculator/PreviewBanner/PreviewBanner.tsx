import React from 'react';
import styles from './PreviewBanner.module.css';
import {Container} from "react-bootstrap";

const PreviewBanner = () => {
   return (
      <div className={styles.wrapper}>
         <Container className={styles.content}>
            <h1>Калькулятор</h1>
            <h5>Рассчитайте количество необходимого кирпича</h5>
         </Container>
      </div>
   );
};

export default PreviewBanner;