import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper}>
        <Container className={styles.content}>
           <h1>Калькулятор кирпича</h1>
           <p className={styles.lead}>
              Укажите размеры или объём — узнаете, сколько кирпича нужно для проекта
           </p>
        </Container>
     </div>
  );
};

export default PreviewBanner;
