import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Галерея</h1>
        <h5>
          Фото готовых объектов и нашей продукции
        </h5>
      </Container>
    </div>
  );
};

export default PreviewBanner;
