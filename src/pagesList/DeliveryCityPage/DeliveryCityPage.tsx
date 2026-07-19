import styles from "./DeliveryCityPage.module.css";
import PreviewBanner from "@/components/delivery-page/PreviewBanner/PreviewBanner";
import { Container } from "react-bootstrap";
import Link from "next/link";
import {
  DELIVERY_CITIES,
  DeliveryCity,
} from "@/constants/deliveryCities";
import {
  LINK_CATALOG,
  LINK_CONTACTS,
  LINK_DELIVERY,
  LINK_DELIVERY_CITY,
} from "@/constants/links";
import { CONTACTS } from "@/constants/general";
import bannerStyles from "@/components/delivery-page/PreviewBanner/PreviewBanner.module.css";

type Props = {
  city: DeliveryCity;
};

const DeliveryCityPage = ({ city }: Props) => {
  const otherCities = DELIVERY_CITIES.filter((item) => item.slug !== city.slug);

  return (
    <div className={styles.main}>
      <PreviewBanner
        title={`Купить кирпич в ${city.namePrepositional}`}
        subtitle={`Доставка с завода Ковернино — ${city.distanceHint}`}
      >
        <p className={bannerStyles.breadcrumb}>
          <Link href={LINK_DELIVERY}>Оплата и доставка</Link>
          <span aria-hidden="true"> / </span>
          <span>{city.name}</span>
        </p>
      </PreviewBanner>

      <Container className={styles.content}>
        <section className={styles.section}>
          <h2>Доставка кирпича в {city.namePrepositional}</h2>
          <p>
            Кирпичный завод «Ковернино» производит кирпич из глины собственного
            карьера и доставляет его в {city.namePrepositional} своим
            транспортом — напрямую с завода, без посредников.
          </p>
          <p>{city.note}</p>
          <p>{city.extra}</p>
          <p>
            В каталоге — красный, керамический, облицовочный и строительный
            кирпич для частных домов, фасадов и коммерческого строительства.
            Цены — от производителя.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Как заказать</h2>
          <ul className={styles.list}>
            <li>
              Выберите кирпич в{" "}
              <Link href={LINK_CATALOG}>каталоге</Link> или позвоните менеджеру
            </li>
            <li>
              Согласуем объём, адрес в {city.namePrepositional}, дату и стоимость
              доставки
            </li>
            <li>Оплата — картой онлайн, по счёту или при получении</li>
          </ul>
          <p>
            По вопросам доставки в {city.namePrepositional} звоните{" "}
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
