import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/CollectionPage">
        <Container className={styles.content}>
           <h1 itemProp="name">Каталог кирпича</h1>
           <h5 itemProp="description">
              Большой выбор и быстрая доставка кирпича для вашего строительства, работаем по Нижниему Новгороду и области.
              В наличии: красный, керамический, облицовочный и строительный кирпич. Выгодные цены и высокое качество от производителя!
           </h5>
        </Container>
     </div>
  );
};

export default CatalogBanner;
