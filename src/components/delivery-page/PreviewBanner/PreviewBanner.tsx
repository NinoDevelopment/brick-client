import React, { ReactNode } from "react";
import styles from "./PreviewBanner.module.css";
import { Container } from "react-bootstrap";

interface IPreviewBanner {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const PreviewBanner = ({
  title = "Оплата и доставка",
  subtitle = "Карта, счёт или наличные. Доставка по Нижнему Новгороду и области",
  children,
}: IPreviewBanner) => {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.content}>
        {children}
        <h1>{title}</h1>
        <p className={styles.lead}>{subtitle}</p>
      </Container>
    </div>
  );
};

export default PreviewBanner;
