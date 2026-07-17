import styles from "./FaqPage.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import { FAQ_ITEMS } from "@/constants/faq";
import {
  LINK_CALCULATOR,
  LINK_CATALOG,
  LINK_CONTACTS,
  LINK_DELIVERY,
} from "@/constants/links";
import { CONTACTS } from "@/constants/general";

const FaqPage = () => {
  return (
    <Container className={styles.main}>
      <h1 className={styles.title}>Частые вопросы</h1>
      <p className={styles.lead}>
        Коротко о производстве, доставке по Нижнему Новгороду и области,
        оплате и оформлении заказа. Если не нашли ответ — позвоните или
        напишите, подскажем по вашему объекту.
      </p>

      <div className={styles.list}>
        {FAQ_ITEMS.map((item) => (
          <section key={item.question} className={styles.item}>
            <h2 className={styles.question}>{item.question}</h2>
            <p className={styles.answer}>{item.answer}</p>
          </section>
        ))}
      </div>

      <div className={styles.cta}>
        <p>
          Посмотреть{" "}
          <Link href={LINK_CATALOG}>каталог кирпича</Link>,{" "}
          <Link href={LINK_CALCULATOR}>калькулятор</Link> или{" "}
          <Link href={LINK_DELIVERY}>условия доставки</Link>. Связь:{" "}
          <a href={`tel:${CONTACTS.phone.value}`}>{CONTACTS.phone.title}</a>
          {" "}и{" "}
          <Link href={LINK_CONTACTS}>страница контактов</Link>.
        </p>
      </div>
    </Container>
  );
};

export default FaqPage;
