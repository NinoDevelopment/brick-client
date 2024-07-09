import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Каталог</h1>
        <h5>
          Ознакомьтесь с нашим ассортиментом кирпичей для вашего строительства
        </h5>
      </Container>
    </div>
  );
};

export default CatalogBanner;
