import styles from "./ProductTypes.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { LINK_CATALOG, LINK_CATALOG_CATEGORY } from "@/constants/links";

const TYPES = [
  {
    slug: "ryadovoy",
    title: "Рядовой кирпич",
    text: "Для несущих стен и перегородок: одинарный, полуторный и двойной формат.",
    image: "/other/break-text-1.svg",
    alt: "Рядовой керамический кирпич одинарный и утолщённый",
  },
  {
    slug: "oblitsovochnyy",
    title: "Облицовочный кирпич",
    text: "Для фасада: цвет и фактура — в каталоге, партия с завода под объект.",
    image: "/other/break-text-3.svg",
    alt: "Облицовочный кирпич разных фактур",
  },
];

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

        <div className={styles.cards}>
          {TYPES.map((item) => (
            <Link
              key={item.slug}
              href={LINK_CATALOG_CATEGORY(item.slug)}
              className={styles.card}
            >
              <Image
                width={410}
                height={475}
                src={item.image}
                alt={item.alt}
              />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href={LINK_CATALOG} className="app-btn">
            Смотреть весь каталог
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ProductTypes;
