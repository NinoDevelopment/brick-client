import React, {FormEvent, useState} from 'react';
import styles from './ContactsForm.module.css';
import {Container} from "react-bootstrap";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_CALLME, API_ORDER} from "@/constants/api";
import {TOAST_ERROR} from "@/constants/toasts";

const ContactsForm = () => {

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      message: '',
   })
   const [sended, setSended] = useState<boolean>(false);

   const handleSend = (e: FormEvent) => {
      e.preventDefault();
      handleRequest(REQUEST_METHODS.POST, API_ORDER + API_CALLME, {
         name: formData?.name,
         companyName: formData.company,
         email: formData.email,
         text: formData.message
      })
         .then(res  => {
            if (res?.data?.success) {
               setSended(true);
            } else {
               TOAST_ERROR('Ошибка отправки формы, попробуйте позже!')
            }
         })
         .catch(() => TOAST_ERROR('Ошибка отправки формы, попробуйте позже!'))
   }

   return (
      <div className={styles.wrapper}>
         <Container>

            <header>
               <h2>Заполните форму</h2>
               <h5>Наши специалисты свяжутся с вами в ближайшее время</h5>
            </header>

            {
               <div className={styles.sendedContainer} hidden={!sended}>
                  <h2>Спасибо за вашу заявку!</h2>
                  <p>В ближайшее время с вами свяжутся наши менеджеры и вы сможете задать им ваш вопрос.</p>
               </div>
            }

            <form onSubmit={handleSend} hidden={sended}>
               <div className={styles.inputContainer}>
                  <label>Как к вам обращаться</label>
                  <input
                     required
                     value={formData.name}
                     onChange={e => setFormData({ ...formData, name: e.target.value })}
                     placeholder={''}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>E-mail</label>
                  <input
                     required
                     type={'email'}
                     value={formData.email}
                     onChange={e => setFormData({ ...formData, email: e.target.value })}
                     placeholder={''}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>Название компании</label>
                  <input
                     required
                     value={formData.company}
                     onChange={e => setFormData({ ...formData, company: e.target.value })}
                     placeholder={''}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>Ваше сообщение</label>
                  <textarea
                     rows={5}
                     required
                     value={formData.message}
                     onChange={e => setFormData({ ...formData, message: e.target.value })}
                     placeholder={''}
                  />
               </div>

               <button type="submit">
                  Отправить заявку
               </button>
            </form>
         </Container>
      </div>
   );
};

export default ContactsForm;