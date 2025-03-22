import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
        <Container className={styles.content}>
           <h1 itemProp="name">Оплата и доставка</h1>
           <h5 itemProp="description">Мы предлагаем только выгодные условия!</h5>
        </Container>
     </div>
  );
};

export default PreviewBanner;
