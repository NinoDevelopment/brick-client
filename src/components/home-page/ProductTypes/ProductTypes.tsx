import styles from "./ProductTypes.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { LINK_CATALOG } from "@/constants/links";

const ProductTypes = () => {
  return (
     <div className={styles.wrapper}>
       <Container>
         <h2>
           Кирпич <span>с завода</span>
         </h2>
         <p className={styles.lead}>
           Своя глина, своё производство, доставка по области
         </p>

         <div className={styles.content}>
           <Image
              width={410}
              height={475}
              src="/other/break-text-1.svg"
              alt="Утолщённый и одинарный кирпич с доставкой в Нижнем Новгороде"
           />
           <Image
              width={410}
              height={475}
              src="/other/break-text-2.svg"
              alt="Кирпич ручной формовки длинного формата с доставкой в Нижнем Новгороде"
           />
           <Image
              width={410}
              height={475}
              src="/other/break-text-3.svg"
              alt="Облицовочный кирпич разных оттенков с доставкой в Нижнем Новгороде"
           />
         </div>

         <div className={styles.cta}>
           <Link href={LINK_CATALOG} className="app-btn">
             Смотреть каталог кирпича
           </Link>
         </div>
       </Container>
     </div>
  );
};

export default ProductTypes;
