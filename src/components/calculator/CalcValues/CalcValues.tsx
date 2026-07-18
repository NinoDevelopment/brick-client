import React, { FormEvent, useState } from "react";
import styles from "../CalcSquare/CalcSquare.module.css";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALC_VALUES } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";
import { CalcBrickType, CalcResult } from "@/types/calc";
import CalcResultAlert from "@/components/calculator/CalcResultAlert/CalcResultAlert";

interface InitialValues {
  brickType: CalcBrickType;
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
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_CALC_VALUES, values)
      .then((res) => setResult(res.data))
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
          <span>Без учёта растворного шва (10 мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.mortarSeamEnabled}
            onClick={() => setValues({ ...values, mortarSeamEnabled: true })}
          />
          <span>С учётом растворного шва (10 мм)</span>
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
          <span>1НФ одинарный (250×120×65)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.brickType === 2}
            onClick={() => setValues({ ...values, brickType: 2 })}
          />
          <span>1,4НФ утолщённый (250×120×88)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.brickType === 3}
            onClick={() => setValues({ ...values, brickType: 3 })}
          />
          <span>2,1НФ (250×120×140)</span>
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

      {result && <CalcResultAlert result={result} />}

      <button type="submit" className={formStyles.submit} disabled={load}>
        {load ? "Загрузка..." : "Рассчитать"}
      </button>
    </form>
  );
};

export default CalcValues;
