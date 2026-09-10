import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Галерея объектов</h1>
        <p className={styles.lead}>
          Фото готовых объектов и нашей продукции
        </p>
      </Container>
    </div>
  );
};

export default PreviewBanner;
