import React from "react";
import { EPayment, IOrderForm, IOrderWithSchetForm } from "@/types/order";
import styles from "./PaySelect.module.css";
import { ORDER_FORM_SCHET_INITIAL } from "@/constants/order";

interface IPaySelect {
  formData: IOrderForm | IOrderWithSchetForm;
  setFormData: (data: IOrderForm | IOrderWithSchetForm) => void;
}

const emptySchetInfo = ORDER_FORM_SCHET_INITIAL([]).schetInfo;

const PaySelect: React.FC<IPaySelect> = ({ formData, setFormData }) => {
  return (
    <div className={styles.PaySelect}>
      <button
        disabled={formData.paymentType === EPayment.ONLINE}
        onClick={() =>
          setFormData({ ...formData, paymentType: EPayment.ONLINE })
        }
      >
        <div className={styles.left}>
          <div className={styles.circle} />
          <p>Картой онлайн</p>
        </div>
        <img src="/icons/bank-card.svg" alt="Оплата онлайн" />
      </button>

      <button
        disabled={formData.paymentType === EPayment.SCHET}
        onClick={() =>
          setFormData({
            ...formData,
            paymentType: EPayment.SCHET,
            schetInfo:
              (formData as IOrderWithSchetForm).schetInfo ?? emptySchetInfo,
          })
        }
      >
        <div className={styles.left}>
          <div className={styles.circle} />
          <p>Выставить счёт</p>
        </div>
        <img src="/icons/schet.svg" alt="Выставить счёт" />
      </button>

      <button
        disabled={formData.paymentType === EPayment.CASH}
        onClick={() => setFormData({ ...formData, paymentType: EPayment.CASH })}
      >
        <div className={styles.left}>
          <div className={styles.circle} />
          <p>Наличные</p>
        </div>
        <img src="/icons/cash.svg" alt="Наличные" />
      </button>
    </div>
  );
};

export default PaySelect;
