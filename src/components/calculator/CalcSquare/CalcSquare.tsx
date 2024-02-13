import React, {FormEvent, useState} from 'react';
import styles from './CalcSquare.module.css';
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_CALC_PARAMS} from "@/constants/api";
import {TOAST_ERROR} from "@/constants/toasts";
import {Alert} from "react-bootstrap";

interface InitialValues {
   wallThicknessType: 1 | 2 | 3 | 4 | 5,
   brickType: 1 | 2,
   wallHeight: number,
   wallLength: number,
   frameHeight: number,
   frameWidth: number,
   mortarSeamEnabled: boolean
}

const initialValues: InitialValues = {
   wallThicknessType: 1,
   brickType: 1,
   wallHeight: 0,
   wallLength: 0,
   frameHeight: 0,
   frameWidth: 0,
   mortarSeamEnabled: true
}

const CalcSquare = () => {

   const [values, setValues] = useState<InitialValues>(initialValues)
   const [load, setLoad] = useState<boolean>(false)
   const [resValue, setResValue] = useState<null | number>(null)

   const handleSend = (e: FormEvent) => {
      e.preventDefault();
      setLoad(true);
      handleRequest(REQUEST_METHODS.POST, API_CALC_PARAMS, values)
         .then(res => setResValue(res.data))
         .catch(err => TOAST_ERROR('Ошибка рассчета! ' + err.message))
         .finally(() => setLoad(false))
   }

   return (
      <form className={styles.wrapper} onSubmit={handleSend}>
         <div className={styles.thickness}>
            <h3>Толщина кладки</h3>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.wallThicknessType === 1}
                  onClick={() => setValues({...values, wallThicknessType: 1})}
               />
               <span>Кладка в ½ кирпича (толщина 120мм)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.wallThicknessType === 2}
                  onClick={() => setValues({...values, wallThicknessType: 2})}
               />
               <span>Кладка в 1 кирпич (толщина 250мм)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.wallThicknessType === 3}
                  onClick={() => setValues({...values, wallThicknessType: 3})}
               />
               <span>Кладка в 1 ½ кирпича (толщина 380мм)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.wallThicknessType === 4}
                  onClick={() => setValues({...values, wallThicknessType: 4})}
               />
               <span>Кладка в 2 кирпича (толщина 510мм)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.wallThicknessType === 5}
                  onClick={() => setValues({...values, wallThicknessType: 5})}
               />
               <span>Кладка в 2 ½ кирпича (толщина 640мм)</span>
            </div>
         </div>

         <div className={styles.thickness}>
            <h3>Размер кирпича</h3>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.brickType === 1}
                  onClick={() => setValues({...values, brickType: 1})}
               />
               <span>Одинарный (250×120*65)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.brickType === 2}
                  onClick={() => setValues({...values, brickType: 2})}
               />
               <span>Утолщенный (250×120×88)</span>
            </div>

            <hr />

            <h3>Учёт растворного шва</h3>
            <div className={styles.itemThickness}>
               <button
                  disabled={!values.mortarSeamEnabled}
                  onClick={() => setValues({...values, mortarSeamEnabled: false})}
               />
               <span>Без учета растворного шва (10мм)</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.mortarSeamEnabled}
                  onClick={() => setValues({...values, mortarSeamEnabled: true})}
               />
               <span>С учетом растворного шва (10мм)</span>
            </div>
         </div>

         <div className={`${styles.thickness} ${styles.full}`}>
            <h3>Размеры строения</h3>

            <div className={styles.inputContainer}>
               <label>Высота стены (м)</label>
               <input
                  type="number"
                  required
                  value={values.wallHeight || ''}
                  onChange={e => setValues({...values, wallHeight: +e.target.value})}
               />
            </div>

            <div className={styles.inputContainer}>
               <label>Высота дверей и оконных проёмов (м)</label>
               <input
                  type="number"
                  value={values.frameHeight || ''}
                  onChange={e => setValues({...values, frameHeight: +e.target.value})}
               />
            </div>

            <div className={styles.inputContainer}>
               <label>Длина всех стен (м)</label>
               <input
                  type="number"
                  required
                  value={values.wallLength || ''}
                  onChange={e => setValues({...values, wallLength: +e.target.value})}
               />
            </div>

            <div className={styles.inputContainer}>
               <label>Длина дверей и оконных проёмов (м)</label>
               <input
                  type="number"
                  value={values.frameWidth || ''}
                  onChange={e => setValues({...values, frameWidth: +e.target.value})}
               />
            </div>
         </div>

         {
            resValue &&
            <Alert variant={'info'} className={styles.alertValue}>
               Необходимое количество кирпича по вашему запросу - <b>{resValue}шт</b>
            </Alert>
         }

         <button type={'submit'} className={styles.submit} disabled={load}>
            {load ? 'Загрузка...' : 'Рассчитать'}
         </button>
      </form>
   );
};

export default CalcSquare;