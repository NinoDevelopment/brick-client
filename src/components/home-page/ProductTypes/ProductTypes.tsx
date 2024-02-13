import React from 'react';
import styles from './ProductTypes.module.css';
import {APP_TITLE} from "@/constants/general";
import {Container} from "react-bootstrap";

const ProductTypes = () => {
   return (
      <div className={styles.wrapper}>
         <Container>
            <h1>Не просто <span>кирпич</span></h1>
            <h5>Качество, на которое можно полагаться</h5>

            <div className={styles.content}>
               <img src={'/other/break-text-1.svg'} alt={APP_TITLE}/>
               <img src={'/other/break-text-2.svg'} alt={APP_TITLE}/>
               <img src={'/other/break-text-3.svg'} alt={APP_TITLE}/>
            </div>
         </Container>
      </div>
   );
};

export default ProductTypes;