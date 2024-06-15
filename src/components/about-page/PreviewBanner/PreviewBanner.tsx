import React from "react";
import styles from "./PreviewBanner.module.css";
import { Container } from "react-bootstrap";

const PreviewBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Кирпичный завод Ковернино</h1>
        <h5>Информация о нашей компании</h5>
      </Container>
    </div>
  );
};

export default PreviewBanner;
