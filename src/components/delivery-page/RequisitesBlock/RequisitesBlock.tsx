import React from "react";
import styles from "./RequisitesBlock.module.css";

const RequisitesBlock = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Реквизиты компании</h3>
      <h5>
        Общество с ограниченной ответственностью «КИРПИЧНЫЙ ЗАВОД КОВЕРНИНО»
        <br />
        <br />
        ФИО: <b>Фамилия Имя Отчество</b>
        <br />
        <br />
        Почтовый адрес: <b>Почтовый адрес</b>
        <br />
        <br />
        Почта: <b>Почта</b>
        <br />
        <br />
        Номер телефона: <b>+7 999 999-99-99</b>
        <br />
        <br />
        Расчётный счёт: <b>40742810742760691592</b>
        <br />
        <br />
        Банк: <b>ВОЛГО-ВЯТСКИЙ БАНК БАНК</b>
        <br />
        <br />
        ИНН: <b>564907427532</b>
        <br />
        <br />
        КПП: <b>574951222</b>
        <br />
        <br />
        ОГРНИП: <b>363528530535288</b>
      </h5>
    </div>
  );
};

export default RequisitesBlock;
