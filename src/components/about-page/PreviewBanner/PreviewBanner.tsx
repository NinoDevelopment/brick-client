import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
     <div className={styles.wrapper}>
        <Container className={styles.content}>
           <h1>Кирпичный завод Ковернино</h1>
           <p className={styles.lead}>
              Производство в Нижегородской области, доставка в Нижний Новгород
           </p>
        </Container>
     </div>
  );
};

export default PreviewBanner;
