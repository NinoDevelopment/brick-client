import styles from "./DeliveryPage.module.css";
import PreviewBanner from "@/components/delivery-page/PreviewBanner/PreviewBanner";
import { Container } from "react-bootstrap";
import { CONTACTS, SHOPS_ADDRESSES } from "@/constants/general";
import Link from "next/link";
import { LINK_CONTACTS } from "@/constants/links";

const pickup = SHOPS_ADDRESSES[0];

const DeliveryPage = () => {
  return (
    <div className={styles.main}>
      <PreviewBanner />

      <Container className={styles.content}>
        <section className={styles.section}>
          <h2>Оплата</h2>
          <p>
            После оформления заказа на сайте менеджер свяжется с вами,
            подтвердит состав и согласует доставку или самовывоз.
          </p>
          <p>Доступные способы оплаты:</p>
          <ul className={styles.list}>
            <li>картой онлайн на сайте;</li>
            <li>по счёту для юридических лиц;</li>
            <li>наличными или картой при получении и самовывозе.</li>
          </ul>
          <p>
            Заказы, оформленные в выходные и праздники, обрабатываем
            в ближайший рабочий день.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Доставка</h2>
          <p>
            Доставляем кирпич своим транспортом по Нижнему Новгороду
            и Нижегородской области — от завода до вашего объекта.
          </p>
          <p>
            Возим в Дзержинск, Арзамас, Бор, Балахну, Кстово, Богородск,
            Городец и другие города области. Стоимость и сроки зависят
            от адреса и объёма заказа.
          </p>
          <p>
            При определённом объёме заказа возможна бесплатная доставка —
            условия уточнит менеджер. Перед отгрузкой согласуем дату
            и время приезда.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Самовывоз</h2>
          <p>
            Забрать заказ можно с завода по предварительной договорённости.
          </p>
          <ul className={styles.list}>
            <li>
              Адрес: {pickup.city}, {pickup.address}
            </li>
            <li>Время работы: {pickup.workTime}</li>
            <li>Оплата на месте — картой или наличными</li>
          </ul>
          <p>
            Дату и время самовывоза согласуйте с менеджером. При получении
            возьмите документ, удостоверяющий личность.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Разгрузка на объекте</h2>
          <p>
            На объекте разгружаем аккуратно, чтобы не повредить кирпич
            и площадку. Если нужна помощь с сортировкой или укладкой —
            скажите об этом при согласовании доставки.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Остались вопросы?</h2>
          <p>
            Позвоните{" "}
            <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
            {" "}или напишите на{" "}
            <Link href={LINK_CONTACTS}>странице контактов</Link>
            — подскажем по оплате, срокам и стоимости доставки.
          </p>
        </section>
      </Container>
    </div>
  );
};

export default DeliveryPage;
