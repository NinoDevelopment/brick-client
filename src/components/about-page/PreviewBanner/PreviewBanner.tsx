import React from 'react';
import styles from './PreviewBanner.module.css';
import { Container } from 'react-bootstrap';

const PreviewBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Кирпичный завод Ковернино</h1>
        <h5>
          Узнайте больше об истории и производстве кирпича в нашей компании
        </h5>
      </Container>
    </div>
  );
};

export default PreviewBanner;
