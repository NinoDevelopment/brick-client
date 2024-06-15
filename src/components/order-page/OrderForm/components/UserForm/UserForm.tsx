import React, { Dispatch, SetStateAction } from "react";
import { IOrderForm, IOrderWithSchetForm } from "@/types/order";
import styles from "./UserForm.module.css";
import { FormGroup } from "react-bootstrap";

interface IUserForm {
  formData: IOrderForm | IOrderWithSchetForm;
  setFormData: Dispatch<SetStateAction<IOrderWithSchetForm | IOrderForm>>;
}

const UserForm: React.FC<IUserForm> = ({ formData, setFormData }) => {
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    let inputValue = inputElement.value;

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
    <div className={styles.UserForm}>
      <FormGroup className={styles.w100}>
        <header>
          <h2>Личная информация</h2>
        </header>
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w50}>
        <input
          required
          placeholder={"Имя и фамилия*"}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w50}>
        <input
          required
          placeholder={"Номер телефона*"}
          value={formData.phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={`Email*`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <textarea
          rows={4}
          placeholder={"Комментарий к заказу"}
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        />
      </FormGroup>
    </div>
  );
};

export default UserForm;
