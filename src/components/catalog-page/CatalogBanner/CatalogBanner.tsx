import React from 'react';
import {Container} from "react-bootstrap";
import styles from './CatalogBanner.module.css';

const CatalogBanner = () => {
   return (
      <div className={styles.wrapper}>
         <Container className={styles.content}>
            <h1>Каталог</h1>
            <h5>Все кирпичи в одном месте, удачных покупок!</h5>
         </Container>
      </div>
   );
};

export default CatalogBanner;