import React, {FormEvent, useState} from 'react';
import styles from './ContactsForm.module.css';
import {Container} from "react-bootstrap";

const ContactsForm = () => {

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
      message: '',
   })

   const handleSend = (e: FormEvent) => {
      e.preventDefault();
      console.log(formData)
   }

   return (
      <div className={styles.wrapper}>
         <Container>

            <header>
               <h2>Заполните форму</h2>
               <h5>Наши специалисты свяжутся с вами в ближайшее время</h5>
            </header>

            <form onSubmit={handleSend}>
               <div className={styles.inputContainer}>
                  <label>Как к вам обращаться</label>
                  <input
                     required
                     value={formData.name}
                     onChange={e => setFormData({ ...formData, name: e.target.value })}
                     placeholder={'Введите'}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>E-mail</label>
                  <input
                     required
                     value={formData.email}
                     onChange={e => setFormData({ ...formData, email: e.target.value })}
                     placeholder={'Введите'}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>Название компании</label>
                  <input
                     value={formData.company}
                     onChange={e => setFormData({ ...formData, company: e.target.value })}
                     placeholder={'Введите'}
                  />
               </div>

               <div className={styles.inputContainer}>
                  <label>Ваше сообщение</label>
                  <textarea
                     rows={5}
                     value={formData.message}
                     onChange={e => setFormData({ ...formData, message: e.target.value })}
                     placeholder={'Введите'}
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