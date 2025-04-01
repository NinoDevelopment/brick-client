import styles from "./ProductTypes.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";

const ProductTypes = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/Product">
       <Container>
         <h1 itemProp="name">
           Не просто <span>кирпич</span>
         </h1>
         <h5 itemProp="slogan">Качество, на которое можно полагаться</h5>

         <div className={styles.content}>
           <Image
              width={483}
              height={578}
              src="/other/break-text-1.svg"
              alt="Кирпич с доставкой Нижний Новогород"
              itemProp="image"
           />
           <Image
              width={542}
              height={575}
              src="/other/break-text-2.svg"
              alt="Кирпич от производителя Нижний Новогород"
              itemProp="image"
           />
           <Image
              width={410}
              height={559}
              src="/other/break-text-3.svg"
              alt="Кирпич по лучшей цене Нижний Новогород"
              itemProp="image"
           />
         </div>
       </Container>

       <meta itemProp="description"
             content="Купить кирпич Нижний Новогород красный кирпич, красный керамический
            кирпич, облицовочный кирпич, рядовой кирпич Нижний Новгород,
            Нижегородская область, Арзамас, Балахна, Богородск, Бор, Выкса,
            Городец, Дзержинск, Заволжье, Кстово, Павлово, Саров"/>
       <meta itemProp="brand" content="Кирпичный завод Ковернино"/>
       <meta itemProp="offers" itemType="https://schema.org/Offer" itemScope content="Купить кирпич"/>
     </div>
  );
};

export default ProductTypes;
