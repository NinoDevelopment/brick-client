import React from 'react';
import styles from "./ExclusiveBlock.module.css";
import {APP_TITLE} from "@/constants/general";

const ExclusiveBlock = () => {
   return (
      <div className={styles.wrapper}>
         <img src={'/icons/exclusiveIcon.svg'} alt={APP_TITLE}/>

         <div className={styles.content}>
            <h2>Эксклюзивность</h2>
            <h5>
               В мире строительства эксклюзивность играет решающую роль. Это не только о выдающемся дизайне, 
               но и о выборе материалов, которые подчеркнут индивидуальность вашего проекта. Наша компания, 
               с многолетним опытом в производстве кирпичей, предлагает уникальные и инновационные решения, 
               которые выделяются на рынке. Мы стремимся к тому, чтобы каждый кирпич, произведенный нами, 
               не только соответствовал вашим требованиям, но и добавлял в ваш проект уникальность и характер.
            </h5>
         </div>
      </div>
   );
};

export default ExclusiveBlock;