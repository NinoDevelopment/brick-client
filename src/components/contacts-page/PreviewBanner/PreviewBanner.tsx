import React from 'react';
import styles from './PreviewBanner.module.css';
import {Container} from "react-bootstrap";

const PreviewBanner = () => {
   return (
      <div className={styles.wrapper}>
         <Container className={styles.content}>
            <h1>Контакты</h1>
            <h5>Свяжитесь с нами и мы ответим на интересующие Вас вопросы</h5>
         </Container>
      </div>
   );
};

export default PreviewBanner;