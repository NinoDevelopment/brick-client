"use client";
import React from "react";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import { CONTACTS } from "@/constants/general";

const page = () => {
  return (
    <Container className={styles.main}>
      <h1 className={styles.title}>ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ И РЕКВИЗИТЫ</h1>

      <h5 className={styles.info}>
        ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "КИРПИЧНЫЙ ЗАВОД КОВЕРНИНО"{" "}
        <br />
        ФИО: <b>Громов Сергей Викторович</b> <br />
        Юридический адрес:{" "}
        <b>
          606570, Нижегородская область, Ковернинский район, деревня Черные
        </b>{" "}
        <br />
        Почта:{" "}
        <b>
          <a href={CONTACTS.email.value}>{CONTACTS.email.title}</a>
        </b>{" "}
        <br />
        Номер телефона:{" "}
        <b>
          <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
        </b>{" "}
        <br />
        ИНН: <b>5218001636</b> <br />
        КПП: <b>521801001</b> <br />
        ОГРН: <b>1155248001083</b> от 28 апреля 2015 г. <br />
      </h5>
    </Container>
  );
};

export default page;
