import styles from "./DeliveryCityPage.module.css";
import PreviewBanner from "@/components/delivery-page/PreviewBanner/PreviewBanner";
import { Container } from "react-bootstrap";
import Link from "next/link";
import {
  DELIVERY_CITIES,
  DeliveryCity,
  getDeliveryCityH1,
} from "@/constants/deliveryCities";
import {
  LINK_CALCULATOR,
  LINK_CATALOG,
  LINK_CATALOG_CATEGORY,
  LINK_CONTACTS,
  LINK_DELIVERY,
  LINK_DELIVERY_CITY,
  LINK_HOME,
  LINK_PRODUCT,
} from "@/constants/links";
import { CONTACTS } from "@/constants/general";
import bannerStyles from "@/components/delivery-page/PreviewBanner/PreviewBanner.module.css";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";

type Props = {
  city: DeliveryCity;
  products?: IProductId[];
};

const DeliveryCityPage = ({ city, products = [] }: Props) => {
  const otherCities = DELIVERY_CITIES.filter((item) => item.slug !== city.slug);

  return (
    <div className={styles.main}>
      <PreviewBanner
        title={getDeliveryCityH1(city)}
        subtitle={`Доставка с завода Ковернино — ${city.distanceHint}`}
      >
        <p className={bannerStyles.breadcrumb}>
          <Link href={LINK_HOME}>Главная</Link>
          <span aria-hidden="true"> / </span>
          <Link href={LINK_DELIVERY}>Оплата и доставка</Link>
          <span aria-hidden="true"> / </span>
          <span>{city.name}</span>
        </p>
      </PreviewBanner>

      <Container className={styles.content}>
        <section className={styles.section}>
          <h2>Доставка кирпича в {city.nameAccusative}</h2>
          {city.paragraphs.map((text) => (
            <p key={text.slice(0, 40)}>{text}</p>
          ))}
          <p>{city.districts}</p>
          <p>
            Кирпич с{" "}
            <Link href={LINK_HOME}>завода Ковернино</Link>
            . В каталоге —{" "}
            <Link href={LINK_CATALOG_CATEGORY("ryadovoy")}>рядовой</Link> и{" "}
            <Link href={LINK_CATALOG_CATEGORY("oblitsovochnyy")}>
              облицовочный
            </Link>
            . Расход можно прикинуть в{" "}
            <Link href={LINK_CALCULATOR}>калькуляторе</Link>.
          </p>
        </section>

        {!!products.length && (
          <section className={styles.section}>
            <h2>Кирпич с доставкой в {city.nameAccusative}</h2>
            {city.slug === "nizhny-novgorod" ? (
              <p>
                С доставкой в Нижний Новгород чаще всего берут{" "}
                {products.map((product, index) => (
                  <span key={product._id}>
                    {index > 0
                      ? index === products.length - 1
                        ? " и "
                        : ", "
                      : null}
                    <Link href={LINK_PRODUCT(product)}>{product.name}</Link>
                  </span>
                ))}
                .
              </p>
            ) : null}
            <div className={styles.products}>
              {products.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
            <p>
              Все позиции — в{" "}
              <Link href={LINK_CATALOG}>каталоге кирпича</Link>.
            </p>
          </section>
        )}

        <section className={styles.section}>
          <h2>Как заказать</h2>
          <ul className={styles.list}>
            {city.how.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            По вопросам доставки в {city.nameAccusative} звоните{" "}
            <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>{" "}
            или напишите на{" "}
            <Link href={LINK_CONTACTS}>странице контактов</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Другие города доставки</h2>
          <p>
            Также возим кирпич по Нижнему Новгороду и Нижегородской области:
          </p>
          <ul className={styles.cities}>
            {otherCities.map((item) => (
              <li key={item.slug}>
                <Link href={LINK_DELIVERY_CITY(item.slug)}>
                  Кирпич в {item.namePrepositional}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            Общие условия оплаты и доставки — на странице{" "}
            <Link href={LINK_DELIVERY}>«Оплата и доставка»</Link>.
          </p>
        </section>
      </Container>
    </div>
  );
};

export default DeliveryCityPage;
