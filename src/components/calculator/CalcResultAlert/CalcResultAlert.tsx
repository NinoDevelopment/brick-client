import React from "react";
import { Alert } from "react-bootstrap";
import Link from "next/link";
import { CalcResult } from "@/types/calc";
import { LINK_CATALOG, LINK_CONTACTS } from "@/constants/links";
import styles from "../CalcSquare/CalcSquare.module.css";

interface ICalcResultAlert {
  result: CalcResult;
}

const CalcResultAlert: React.FC<ICalcResultAlert> = ({ result }) => {
  return (
    <Alert variant="info" className={styles.alertValue}>
      <p className={styles.resultTitle}>
        Ориентир: <b>{result.quantityWithReserve.toLocaleString("ru-RU")} шт</b>
        <span className={styles.resultHint}>
          {" "}
          (с запасом {result.reservePercent}% на бой и подрезку)
        </span>
      </p>
      <p className={styles.resultMeta}>
        Чистый расчёт: {result.quantity.toLocaleString("ru-RU")} шт · ≈{" "}
        {result.pallets} паллет
        {result.pack > 0 ? ` по ${result.pack} шт` : ""} · {result.brickDescription}
      </p>
      <p className={styles.resultLinks}>
        <Link href={LINK_CATALOG}>Смотреть каталог</Link>
        <span aria-hidden="true"> · </span>
        <Link href={LINK_CONTACTS}>Уточнить у менеджера</Link>
      </p>
    </Alert>
  );
};

export default CalcResultAlert;
