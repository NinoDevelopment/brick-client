import React from "react";
import styles from "./ExperienceBlock.module.css";
import { APP_TITLE } from "@/constants/general";

const ExperienceBlock = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
       <img src={"/icons/experienceIcon.svg"} alt={APP_TITLE} itemProp="Наш опыт"/>

       <div className={styles.content}>
         <h2 itemProp="description">Опыт</h2>
         <h5 itemProp="about">
           Производство кирпича - это искусство, требующее тщательности и
           внимания к мельчайшим деталям. Наша компания, с более чем десятилетним
           опытом в этой отрасли, является лидером в производстве кирпичей
           высочайшего качества. Мы гордимся своим профессионализмом и
           экспертностью в выборе материалов, обеспечивая надежность и
           долговечность нашей продукции. С нами вы можете быть уверены в том,
           что ваш проект будет воплощен в жизнь с использованием лучших
           кирпичных решений, которые соответствуют самым высоким стандартам
           качества.
         </h5>
       </div>
     </div>
  );
};

export default ExperienceBlock;
