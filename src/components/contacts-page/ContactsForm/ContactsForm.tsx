"use client";

import { type FormEvent, useState } from "react";
import styles from "./ContactsForm.module.css";
import { Container } from "react-bootstrap";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_CALLME, API_ORDER } from "@/constants/api";
import { TOAST_ERROR } from "@/constants/toasts";

const ContactsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sended, setSended] = useState<boolean>(false);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    handleRequest(REQUEST_METHODS.POST, API_ORDER + API_CALLME, {
      name: formData?.name,
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
       .catch(() => TOAST_ERROR("Ошибка отправки формы, попробуйте позже!"));
  };

  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/ContactPage">
       <Container>
         <header>
           <h2 itemProp="name">Оставить заявку</h2>
           <h5 itemProp="description">
             Напишите вопрос или запрос — перезвоним и поможем с подбором
           </h5>
         </header>

         {
           <div className={styles.sendedContainer} hidden={!sended}>
             <h2>Заявка отправлена</h2>
             <p>
               Скоро свяжемся с вами, чтобы уточнить детали и ответить на вопросы.
             </p>
           </div>
         }

         <form onSubmit={handleSend} hidden={sended} itemScope itemType="http://schema.org/ContactPoint">
           <div className={styles.inputContainer}>
             <label>Имя*</label>
             <input
                required
                value={formData.name}
                onChange={(e) =>
                   setFormData({ ...formData, name: e.target.value })
                }
                placeholder={""}
                itemProp="name"
             />
           </div>

           <div className={styles.inputContainer}>
             <label>E-mail*</label>
             <input
                required
                type={"email"}
                value={formData.email}
                onChange={(e) =>
                   setFormData({ ...formData, email: e.target.value })
                }
                placeholder={""}
                itemProp="email"
             />
           </div>

           <div className={styles.inputContainer}>
             <label>Название компании</label>
             <input
                value={formData.company}
                onChange={(e) =>
                   setFormData({ ...formData, company: e.target.value })
                }
                placeholder={""}
                itemProp="affiliation"
             />
           </div>

           <div className={styles.inputContainer}>
             <label>Ваше сообщение*</label>
             <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) =>
                   setFormData({ ...formData, message: e.target.value })
                }
                placeholder={""}
                itemProp="description"
             />
           </div>

           <button type="submit">Отправить заявку</button>
         </form>
       </Container>
     </div>
  );
};

export default ContactsForm;
