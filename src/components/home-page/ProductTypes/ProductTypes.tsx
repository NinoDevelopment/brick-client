import styles from "./ProductTypes.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";

const ProductTypes = () => {
  return (
     <div className={styles.wrapper}>
       <Container>
         <h2>
           Не просто <span>кирпич</span>
         </h2>
         <h5>Качество, на которое можно полагаться</h5>

         <div className={styles.content}>
           <Image
              width={483}
              height={578}
              src="/other/break-text-1.svg"
              alt="Кирпич с доставкой в Нижнем Новгороде"
           />
           <Image
              width={542}
              height={575}
              src="/other/break-text-2.svg"
              alt="Кирпич от производителя в Нижнем Новгороде"
           />
           <Image
              width={410}
              height={559}
              src="/other/break-text-3.svg"
              alt="Кирпич по цене завода в Нижнем Новгороде"
           />
         </div>
       </Container>
     </div>
  );
};

export default ProductTypes;
