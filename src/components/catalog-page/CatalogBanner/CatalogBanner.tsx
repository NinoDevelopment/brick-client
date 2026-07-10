import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/CollectionPage">
        <Container className={styles.content}>
           <h1 itemProp="name">Каталог кирпича</h1>
           <h5 itemProp="description">
              Кирпич с ценами от производителя. Доставка по Нижнему Новгороду
              и Нижегородской области — красный, керамический, облицовочный и строительный.
           </h5>
        </Container>
     </div>
  );
};

export default CatalogBanner;
