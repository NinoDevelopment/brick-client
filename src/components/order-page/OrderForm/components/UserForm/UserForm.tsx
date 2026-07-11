import React, { Dispatch, SetStateAction } from "react";
import { IOrderForm, IOrderWithSchetForm } from "@/types/order";
import formStyles from "@/ui/FormFields/FormFields.module.css";

interface IUserForm {
  formData: IOrderForm | IOrderWithSchetForm;
  setFormData: Dispatch<SetStateAction<IOrderWithSchetForm | IOrderForm>>;
}

const UserForm: React.FC<IUserForm> = ({ formData, setFormData }) => {
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (inputValue.length > 16) {
      inputValue = inputValue.slice(0, 16);
    }
    let formattedValue = inputValue.replace(/\D/g, "");
    if (!formattedValue.startsWith("7") && formattedValue.length === 1) {
      formattedValue = "7" + formattedValue;
    }

    formattedValue = formattedValue.replace(
      /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
      function (_, p1, p2, p3, p4, p5) {
        let formatted = "";
        if (p1) formatted += `+${p1}`;
        if (p2) formatted += `(${p2}`;
        if (p3) formatted += `)${p3}`;
        if (p4) formatted += `-${p4}`;
        if (p5) formatted += `-${p5}`;
        return formatted;
      },
    );

    setFormData({ ...formData, phoneNumber: formattedValue });
  };

  return (
    <section className={formStyles.section}>
      <header className={formStyles.header}>
        <h2>Личная информация</h2>
        <p>Укажите контакты для связи по заказу</p>
      </header>

      <div className={formStyles.form}>
        <div className={formStyles.row}>
          <div className={formStyles.field}>
            <label htmlFor="order-name">Имя и фамилия*</label>
            <input
              id="order-name"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              placeholder="Иван Иванов"
              autoComplete="name"
            />
          </div>

          <div className={formStyles.field}>
            <label htmlFor="order-phone">Телефон*</label>
            <input
              id="order-phone"
              required
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+7(XXX)XXX-XX-XX"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-email">E-mail*</label>
          <input
            id="order-email"
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.ru"
            autoComplete="email"
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-comment">Комментарий к заказу</label>
          <textarea
            id="order-comment"
            rows={4}
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="Необязательно"
          />
        </div>
      </div>
    </section>
  );
};

export default UserForm;
