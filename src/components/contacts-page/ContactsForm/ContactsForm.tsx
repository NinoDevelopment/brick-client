"use client";

import { type FormEvent, useState } from "react";
import styles from "./ContactsForm.module.css";
import { Container, Spinner } from "react-bootstrap";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALLME, API_ORDER } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";

const PHONE_REGEX = /^\+?[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const ContactsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    company: "",
    message: "",
  });
  const [sended, setSended] = useState(false);
  const [load, setLoad] = useState(false);

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

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.phoneNumber.match(PHONE_REGEX)) {
      TOAST_ERROR("Введите телефон в формате +7(XXX)XXX-XX-XX!");
      return;
    }

    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER + API_CALLME, {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      companyName: formData.company,
      email: formData.email,
      text: formData.message,
    })
      .then((res) => {
        if (res?.data?.success) {
          setSended(true);
        } else {
          TOAST_ERROR("Ошибка отправки формы, попробуйте позже!");
        }
      })
      .catch(() => TOAST_ERROR("Ошибка отправки формы, попробуйте позже!"))
      .finally(() => setLoad(false));
  };

  return (
    <section className={styles.wrapper}>
      <Container className={styles.inner}>
        <header className={styles.header}>
          <h2>Оставить заявку</h2>
          <p>Напишите вопрос или запрос — перезвоним и поможем с подбором</p>
        </header>

        {sended ? (
          <div className={styles.sendedContainer}>
            <h3>Заявка отправлена</h3>
            <p>
              Скоро свяжемся с вами, чтобы уточнить детали и ответить на
              вопросы.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSend}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-name">Имя*</label>
                <input
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Как к вам обращаться"
                  autoComplete="name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-phone">Телефон*</label>
                <input
                  id="contact-phone"
                  required
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="+7(XXX)XXX-XX-XX"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="contact-email">E-mail*</label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@company.ru"
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-company">Название компании</label>
                <input
                  id="contact-company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="Необязательно"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">Ваше сообщение*</label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Кратко опишите запрос"
              />
            </div>

            <button
              type="submit"
              className={styles.submit}
              disabled={load}
            >
              {load ? <Spinner size="sm" /> : "Отправить заявку"}
            </button>
          </form>
        )}
      </Container>
    </section>
  );
};

export default ContactsForm;
