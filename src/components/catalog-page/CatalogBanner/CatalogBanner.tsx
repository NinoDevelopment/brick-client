import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
  return (
     <div className={styles.wrapper}>
        <Container className={styles.content}>
           <h1>Каталог кирпича</h1>
           <h5>
              Цены от производителя. Красный, керамический, облицовочный
              и строительный кирпич с доставкой по Нижнему Новгороду и области.
           </h5>
        </Container>
     </div>
  );
};

export default CatalogBanner;
