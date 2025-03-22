import React from "react";
import styles from "./ExclusiveBlock.module.css";
import { APP_TITLE } from "@/constants/general";
import Image from "next/image";

const ExclusiveBlock = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
       <Image src="/icons/exclusiveIcon.svg" width={421} height={420} alt={APP_TITLE} itemProp="Эксклюзивный кирпич"/>

       <div className={styles.content}>
         <h2 itemProp="description">Эксклюзивность</h2>
         <h5 itemProp="about">
           В мире строительства эксклюзивность играет решающую роль. Это не
           только о выдающемся дизайне, но и о выборе материалов, которые
           подчеркнут индивидуальность вашего проекта. Наша компания, с
           многолетним опытом в производстве кирпичей, предлагает уникальные и
           инновационные решения, которые выделяются на рынке. Мы стремимся к
           тому, чтобы каждый кирпич, произведенный нами, не только
           соответствовал вашим требованиям, но и добавлял в ваш проект
           уникальность и характер.
         </h5>
       </div>
     </div>
  );
};

export default ExclusiveBlock;
