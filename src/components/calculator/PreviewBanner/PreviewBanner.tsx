import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/WebApplication">
        <Container className={styles.content}>
           <h1 itemProp="name">Калькулятор</h1>
           <h5 itemProp="description">
              Используйте наш калькулятор для точного расчета необходимого
              количества кирпича
           </h5>
        </Container>
     </div>
  );
};

export default PreviewBanner;
