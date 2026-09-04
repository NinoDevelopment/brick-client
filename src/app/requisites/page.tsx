import React from "react";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import { CONTACTS } from "@/constants/general";
import { OPERATOR } from "@/constants/operator";
import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SEO_REQUISITES,
} from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_REQUISITES,
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

const Page = () => {
  return (
    <Container className={styles.main}>
      <h1 className={styles.title}>Реквизиты</h1>

      <p className={styles.company}>
        {OPERATOR.fullName.toUpperCase()}
      </p>

      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>Директор</dt>
          <dd>{OPERATOR.director}</dd>
        </div>
        <div className={styles.row}>
          <dt>Юридический адрес</dt>
          <dd>{OPERATOR.address}</dd>
        </div>
        <div className={styles.row}>
          <dt>Почта</dt>
          <dd>
            <a href={`mailto:${CONTACTS.email.value}`}>
              {CONTACTS.email.title}
            </a>
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Телефон</dt>
          <dd>
            <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
          </dd>
        </div>
        <div className={styles.row}>
          <dt>ИНН</dt>
          <dd>{OPERATOR.inn}</dd>
        </div>
        <div className={styles.row}>
          <dt>КПП</dt>
          <dd>{OPERATOR.kpp}</dd>
        </div>
        <div className={styles.row}>
          <dt>ОГРН</dt>
          <dd>{OPERATOR.ogrn}</dd>
        </div>
        <div className={styles.row}>
          <dt>Банк</dt>
          <dd>ФИЛИАЛ «НИЖЕГОРОДСКИЙ» АО «АЛЬФА-БАНК»</dd>
        </div>
        <div className={styles.row}>
          <dt>БИК</dt>
          <dd>042202824</dd>
        </div>
        <div className={styles.row}>
          <dt>К/с</dt>
          <dd>30101810200000000824</dd>
        </div>
        <div className={styles.row}>
          <dt>Р/с</dt>
          <dd>40702810429050009559</dd>
        </div>
      </dl>
    </Container>
  );
};

export default Page;
