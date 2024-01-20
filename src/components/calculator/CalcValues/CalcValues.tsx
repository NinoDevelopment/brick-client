import React, {FormEvent, useState} from 'react';
import styles from '../CalcSquare/CalcSquare.module.css';
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_CALC_VALUES} from "@/constants/api";
import {TOAST_ERROR} from "@/constants/toasts";


interface InitialValues {
   brickType: 1 | 2,
   bricklayingVolume: number,
   mortarSeamEnabled: boolean,
}

const initialValues: InitialValues = {
   brickType: 1,
   bricklayingVolume: 0,
   mortarSeamEnabled: true,
}

const CalcValues = () => {

   const [values, setValues] = useState<InitialValues>(initialValues)
   const [load, setLoad] = useState<boolean>(false)

   const handleSend = (e: FormEvent) => {
      e.preventDefault();
      setLoad(true)
      handleRequest(REQUEST_METHODS.POST, API_CALC_VALUES, values)
         .then(res => console.log(res))
         .catch(err => TOAST_ERROR('Ошибка рассчета! ' + err.message))
         .finally(() => setLoad(false))
   }

   return (
      <form className={styles.wrapper} onSubmit={handleSend}>

         <div className={styles.thickness}>
            <h3>Учёт растворного шва</h3>
            <div className={styles.itemThickness}>
               <button
                  disabled={!values.mortarSeamEnabled}
                  onClick={() => setValues({...values, mortarSeamEnabled: false})}
               />
               <span>Без учета растворного шва</span>
            </div>
            <div className={styles.itemThickness}>
               <button
                  disabled={values.mortarSeamEnabled}
                  onClick={() => setValues({...values, mortarSeamEnabled: true})}
               />
               <span>С учетом растворного шва</span>
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
         </div>

         <div style={{ width: '100%' }}>
            <div className={styles.inputContainer}>
               <label>Объем (м3)</label>
               <input
                  type="number"
                  required
                  value={values.bricklayingVolume || ''}
                  onChange={e => setValues({...values, bricklayingVolume: +e.target.value})}
               />
            </div>
         </div>

         <button type={'submit'} className={styles.submit} disabled={load}>
            {load ? 'Загрузка...' : 'Рассчитать'}
         </button>
      </form>
   );
};

export default CalcValues;