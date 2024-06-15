import React from "react";
import styles from "./PreviewBanner.module.css";
import { Container } from "react-bootstrap";

const PreviewBanner = () => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        <h1>Галерея</h1>
        <h5>
          Источник вдохновения для создания прочных и красивых конструкций
        </h5>
      </Container>
    </div>
  );
};

export default PreviewBanner;
