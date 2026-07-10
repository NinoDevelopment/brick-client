import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/CollectionPage">
        <Container className={styles.content}>
           <h1 itemProp="name">Каталог</h1>
           <h5 itemProp="description">
              Цены от производителя. Красный, керамический, облицовочный
              и строительный кирпич с доставкой по Нижнему Новгороду и области.
           </h5>
        </Container>
     </div>
  );
};

export default CatalogBanner;
