import React from "react";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import { CONTACTS } from "@/constants/general";
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

      <h5 className={styles.info}>
        ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «КИРПИЧНЫЙ ЗАВОД КОВЕРНИНО»
        <br />
        Директор: <b>Громов Сергей Викторович</b>
        <br />
        Юридический адрес:{" "}
        <b>606570, Нижегородская область, р-н Ковернинский, д. Черные</b>
        <br />
        Почта:{" "}
        <b>
          <a href={CONTACTS.email.value}>{CONTACTS.email.title}</a>
        </b>
        <br />
        Телефон:{" "}
        <b>
          <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
        </b>
        <br />
        ИНН: <b>5218001636</b>
        <br />
        КПП: <b>521801001</b>
        <br />
        ОГРН: <b>1155248001083</b>
        <br />
        Банк: <b>ФИЛИАЛ &quot;НИЖЕГОРОДСКИЙ&quot; АО &quot;АЛЬФА-БАНК&quot;</b>
        <br />
        БИК: <b>042202824</b>
        <br />
        К/с: <b>30101810200000000824</b>
        <br />
        Р/с: <b>40702810429050009559</b>
      </h5>
    </Container>
  );
};

export default Page;
