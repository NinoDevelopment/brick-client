import React, { FormEvent, useState } from "react";
import styles from "./CalcSquare.module.css";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALC_PARAMS } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";
import { Alert } from "react-bootstrap";

interface InitialValues {
  wallThicknessType: 1 | 2 | 3 | 4 | 5;
  brickType: 1 | 2;
  wallHeight: number;
  wallLength: number;
  frameHeight: number;
  frameWidth: number;
  mortarSeamEnabled: boolean;
}

const initialValues: InitialValues = {
  wallThicknessType: 1,
  brickType: 1,
  wallHeight: 0,
  wallLength: 0,
  frameHeight: 0,
  frameWidth: 0,
  mortarSeamEnabled: true,
};

const CalcSquare = () => {
  const [values, setValues] = useState<InitialValues>(initialValues);
  const [load, setLoad] = useState<boolean>(false);
  const [resValue, setResValue] = useState<null | number>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_CALC_PARAMS, values)
      .then((res) => setResValue(res.data))
      .catch((err) => TOAST_ERROR("Ошибка расчёта! " + err.message))
      .finally(() => setLoad(false));
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSend}>
      <div className={styles.thickness}>
        <header className={formStyles.header}>
          <h2>Толщина кладки</h2>
        </header>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.wallThicknessType === 1}
            onClick={() => setValues({ ...values, wallThicknessType: 1 })}
          />
          <span>Кладка в ½ кирпича (толщина 120мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.wallThicknessType === 2}
            onClick={() => setValues({ ...values, wallThicknessType: 2 })}
          />
          <span>Кладка в 1 кирпич (толщина 250мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.wallThicknessType === 3}
            onClick={() => setValues({ ...values, wallThicknessType: 3 })}
          />
          <span>Кладка в 1 ½ кирпича (толщина 380мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.wallThicknessType === 4}
            onClick={() => setValues({ ...values, wallThicknessType: 4 })}
          />
          <span>Кладка в 2 кирпича (толщина 510мм)</span>
        </div>
        <div className={styles.itemThickness}>
          <button
            type="button"
            disabled={values.wallThicknessType === 5}
            onClick={() => setValues({ ...values, wallThicknessType: 5 })}
          />
          <span>Кладка в 2 ½ кирпича (толщина 640мм)</span>
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

        <hr className={styles.divider} />

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

      <div className={`${styles.thickness} ${styles.full}`}>
        <header className={formStyles.header}>
          <h2>Размеры строения</h2>
          <p>Укажите размеры стен и проёмов в метрах</p>
        </header>

        <div className={formStyles.form}>
          <div className={formStyles.row}>
            <div className={formStyles.field}>
              <label htmlFor="calc-wall-height">Высота стены (м)*</label>
              <input
                id="calc-wall-height"
                type="number"
                step="any"
                min="0"
                required
                placeholder="Например, 3"
                value={values.wallHeight || ""}
                onChange={(e) =>
                  setValues({ ...values, wallHeight: +e.target.value })
                }
              />
            </div>

            <div className={formStyles.field}>
              <label htmlFor="calc-frame-height">
                Высота дверей и оконных проёмов (м)
              </label>
              <input
                id="calc-frame-height"
                type="number"
                step="any"
                min="0"
                placeholder="Необязательно"
                value={values.frameHeight || ""}
                onChange={(e) =>
                  setValues({ ...values, frameHeight: +e.target.value })
                }
              />
            </div>
          </div>

          <div className={formStyles.row}>
            <div className={formStyles.field}>
              <label htmlFor="calc-wall-length">Длина всех стен (м)*</label>
              <input
                id="calc-wall-length"
                type="number"
                step="any"
                min="0"
                required
                placeholder="Например, 40"
                value={values.wallLength || ""}
                onChange={(e) =>
                  setValues({ ...values, wallLength: +e.target.value })
                }
              />
            </div>

            <div className={formStyles.field}>
              <label htmlFor="calc-frame-width">
                Длина дверей и оконных проёмов (м)
              </label>
              <input
                id="calc-frame-width"
                type="number"
                step="any"
                min="0"
                placeholder="Необязательно"
                value={values.frameWidth || ""}
                onChange={(e) =>
                  setValues({ ...values, frameWidth: +e.target.value })
                }
              />
            </div>
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

export default CalcSquare;
