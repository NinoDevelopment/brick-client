import React from "react";
import { EPayment, IOrderForm, IOrderWithSchetForm } from "@/types/order";
import styles from "./PaySelect.module.css";
import { ORDER_FORM_SCHET_INITIAL } from "@/constants/order";

interface IPaySelect {
  formData: IOrderForm | IOrderWithSchetForm;
  setFormData: (data: IOrderForm | IOrderWithSchetForm) => void;
}

const emptySchetInfo = ORDER_FORM_SCHET_INITIAL([]).schetInfo;

const OPTIONS = [
  {
    type: EPayment.ONLINE,
    title: "Картой онлайн",
    hint: "Оплата сразу на сайте",
    icon: "/icons/bank-card.svg",
    alt: "Оплата онлайн",
  },
  {
    type: EPayment.SCHET,
    title: "Выставить счёт",
    hint: "Для юридических лиц",
    icon: "/icons/schet.svg",
    alt: "Выставить счёт",
  },
  {
    type: EPayment.CASH,
    title: "Наличные",
    hint: "При получении заказа",
    icon: "/icons/cash.svg",
    alt: "Наличные",
  },
] as const;

const PaySelect: React.FC<IPaySelect> = ({ formData, setFormData }) => {
  const selectPayment = (type: EPayment) => {
    if (type === EPayment.SCHET) {
      setFormData({
        ...formData,
        paymentType: EPayment.SCHET,
        schetInfo:
          (formData as IOrderWithSchetForm).schetInfo ?? emptySchetInfo,
      });
      return;
    }

    const { schetInfo: _schetInfo, ...rest } = formData as IOrderWithSchetForm;
    setFormData({ ...rest, paymentType: type });
  };

  return (
    <div className={styles.PaySelect} role="group" aria-label="Способ оплаты">
      {OPTIONS.map((option) => {
        const selected = formData.paymentType === option.type;

        return (
          <button
            key={option.type}
            type="button"
            className={`${styles.option} ${selected ? styles.selected : ""}`}
            aria-pressed={selected}
            onClick={() => selectPayment(option.type)}
          >
            <span className={styles.iconWrap}>
              <img src={option.icon} alt="" aria-hidden="true" />
            </span>
            <span className={styles.text}>
              <span className={styles.title}>{option.title}</span>
              <span className={styles.hint}>{option.hint}</span>
            </span>
            <span className={styles.radio} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
};

export default PaySelect;
