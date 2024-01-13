import React from 'react';
import styles from './ExperienceBlock.module.css';
import {APP_TITLE} from "@/constants/general";

const ExperienceBlock = () => {
   return (
      <div className={styles.wrapper}>
         <img src={'/icons/experienceIcon.svg'} alt={APP_TITLE} />

         <div className={styles.content}>
            <h2>Опыт</h2>
            <h5>
               Мастерская архитектура – это форма искусства. Для достижения мельчайших деталей необходимы
               вдумчивость и внимание, а выбор правильного кирпича для сборки является ключевым моментом.
               Наша команда имеет более чем 40-летний опыт принятия архитектурных решений, и мы гордимся
               тем, что наша забота позволила нам оказаться в авангарде отрасли. Наша команда имеет богатую
               историю поставок инновационного кирпича, и как партнеры крупнейших и наиболее эффективных
               производителей кирпича в России, мы здесь, чтобы поддержать вашу постройку.
            </h5>
         </div>
      </div>
   );
};

export default ExperienceBlock;