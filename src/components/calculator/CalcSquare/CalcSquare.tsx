import React, { FormEvent, useState } from "react";
import styles from "./CalcSquare.module.css";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALC_PARAMS } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";
import { CalcBrickType, CalcResult } from "@/types/calc";
import CalcResultAlert from "@/components/calculator/CalcResultAlert/CalcResultAlert";

interface InitialValues {
  wallThicknessType: 1 | 2 | 3 | 4 | 5;
  brickType: CalcBrickType;
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
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_CALC_PARAMS, values)
      .then((res) => setResult(res.data))
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

      <div className={`${styles.thickness} ${styles.full}`}>
        <header className={formStyles.header}>
          <h2>Размеры строения</h2>
          <p>
            Размеры в метрах. Для нескольких окон и дверей укажите среднюю
            высоту проёмов и сумму их ширин — так получится суммарная площадь.
          </p>
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
                Средняя высота проёмов (м)
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
                Сумма ширин всех проёмов (м)
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

      {result && <CalcResultAlert result={result} />}

      <button type="submit" className={formStyles.submit} disabled={load}>
        {load ? "Загрузка..." : "Рассчитать"}
      </button>
    </form>
  );
};

export default CalcSquare;
