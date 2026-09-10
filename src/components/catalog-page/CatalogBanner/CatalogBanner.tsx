import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import styles from "./CatalogBanner.module.css";

interface ICatalogBanner {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

const CatalogBanner = ({
  title = "Каталог кирпича",
  subtitle = "Цены от производителя. Рядовой и облицовочный кирпич с доставкой по Нижнему Новгороду и области.",
  children,
}: ICatalogBanner) => {
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

export default CatalogBanner;
