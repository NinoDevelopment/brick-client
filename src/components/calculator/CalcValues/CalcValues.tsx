import React, { FormEvent, useState } from "react";
import styles from "../CalcSquare/CalcSquare.module.css";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALC_VALUES } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";
import { Alert } from "react-bootstrap";

interface InitialValues {
  brickType: 1 | 2;
  bricklayingVolume: number;
  mortarSeamEnabled: boolean;
}

const initialValues: InitialValues = {
  brickType: 1,
  bricklayingVolume: 0,
  mortarSeamEnabled: true,
};

const CalcValues = () => {
  const [values, setValues] = useState<InitialValues>(initialValues);
  const [load, setLoad] = useState<boolean>(false);
  const [resValue, setResValue] = useState<null | number>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_CALC_VALUES, values)
      .then((res) => setResValue(res.data))
      .catch((err) => TOAST_ERROR("Ошибка расчёта! " + err.message))
      .finally(() => setLoad(false));
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSend}>
      <div className={styles.thickness}>
        <header className={formStyles.header}>
          <h2>Учёт растворного шва</h2>
        </header>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={!values.mortarSeamEnabled}
            onClick={() => setValues({ ...values, mortarSeamEnabled: false })}
          />
          <span>Без учета растворного шва (10мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.mortarSeamEnabled}
            onClick={() => setValues({ ...values, mortarSeamEnabled: true })}
          />
          <span>С учетом растворного шва (10мм)</span>
        </div>
      </div>

      <div className={styles.thickness}>
        <header className={formStyles.header}>
          <h2>Размер кирпича</h2>
        </header>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.brickType === 1}
            onClick={() => setValues({ ...values, brickType: 1 })}
          />
          <span>Одинарный (250×120×65)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.brickType === 2}
            onClick={() => setValues({ ...values, brickType: 2 })}
          />
          <span>Утолщенный (250×120×88)</span>
        </div>
      </div>

      <div className={`${styles.thickness} ${styles.full}`}>
        <header className={formStyles.header}>
          <h2>Объём кладки</h2>
          <p>Укажите объём кирпичной кладки в кубометрах</p>
        </header>

        <div className={formStyles.form}>
          <div className={formStyles.field}>
            <label htmlFor="calc-volume">Объём (м³)*</label>
            <input
              id="calc-volume"
              type="number"
              step="any"
              min="0"
              required
              placeholder="Например, 12.5"
              value={values.bricklayingVolume || ""}
              onChange={(e) =>
                setValues({ ...values, bricklayingVolume: +e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {resValue !== null && (
        <Alert variant={"info"} className={styles.alertValue}>
          Необходимое количество кирпича по вашему запросу - <b>{resValue}шт</b>
        </Alert>
      )}

      <button type="submit" className={formStyles.submit} disabled={load}>
        {load ? "Загрузка..." : "Рассчитать"}
      </button>
    </form>
  );
};

export default CalcValues;
