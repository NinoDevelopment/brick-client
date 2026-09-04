import styles from "../privacyPolicy/page.module.css";
import { Container } from "react-bootstrap";
import {
  createPageMetadata,
  NO_INDEX_ROBOTS,
  SEO_CONSENT,
} from "@/constants/seo";
import { CONTACTS } from "@/constants/general";
import { OPERATOR } from "@/constants/operator";
import Link from "next/link";
import { LINK_CONTACTS, LINK_PRIVACY } from "@/constants/links";

export const metadata = createPageMetadata(
  SEO_CONSENT,
  undefined,
  undefined,
  NO_INDEX_ROBOTS,
);

const Page = () => {
  return (
    <Container className={styles.main}>
      <h1 className={styles.title}>
        Согласие на обработку персональных данных
      </h1>

      <p className={styles.intro}>
        Настоящее Согласие является отдельным документом. Оно не входит в
        текст договора, оферты или{" "}
        <Link href={LINK_PRIVACY}>
          Политики обработки персональных данных
        </Link>
        . Согласие считается данным, когда пользователь ставит отметку в
        чекбоксе на форме заявки или заказа. Отметка по умолчанию не
        проставлена.
      </p>

      <section className={styles.section}>
        <h2>1. Оператор</h2>
        <p>
          {OPERATOR.fullName}, ИНН {OPERATOR.inn}, ОГРН {OPERATOR.ogrn}, адрес:{" "}
          {OPERATOR.address}.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Какие данные обрабатываются</h2>
        <p>
          Имя, фамилия, отчество; номер телефона; адрес электронной почты;
          наименование компании; текст сообщения или комментарий к заказу;
          адрес доставки; для оплаты по счёту — ИНН, КПП, наименование и адрес
          организации; состав заказа.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Цели</h2>
        <ul className={styles.list}>
          <li>
            обработка заявки с Сайта, обратная связь, подбор продукции;
          </li>
          <li>
            оформление, подтверждение, доставка и оплата заказа, выставление
            счёта.
          </li>
        </ul>
        <p>
          Согласие не распространяется на рекламные рассылки и не даёт права
          передавать данные для маркетинга третьим лицам.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Действия и получатели</h2>
        <p>
          Сбор, запись, систематизация, накопление, хранение, уточнение,
          извлечение, использование, передача (предоставление, доступ),
          блокирование, удаление, уничтожение — с использованием средств
          автоматизации и без них.
        </p>
        <p>
          Данные могут быть переданы службе доставки и платёжному агрегатору
          исключительно для исполнения заказа и приёма оплаты, а также органам
          власти в случаях, установленных законом.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Срок и отзыв</h2>
        <p>
          Согласие действует со дня отметки в чекбоксе до достижения целей
          обработки либо до отзыва. Заявки хранятся до обработки обращения и 1
          год после; сведения о заказе — в сроки, установленные
          законодательством о бухгалтерском учёте.
        </p>
        <p>
          Отозвать согласие можно письмом на{" "}
          <a href={`mailto:${OPERATOR.pdEmail}`}>{OPERATOR.pdEmail}</a> или{" "}
          <a href={`mailto:${CONTACTS.email.value}`}>{CONTACTS.email.title}</a>{" "}
          либо через <Link href={LINK_CONTACTS}>форму контактов</Link>. Отзыв не
          влияет на обработку, которую Оператор обязан продолжать по закону
          или договору.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Подтверждение</h2>
        <p>
          Ставя отметку в чекбоксе, субъект подтверждает, что ознакомлен с
          настоящим Согласием и с{" "}
          <Link href={LINK_PRIVACY}>
            Политикой обработки персональных данных
          </Link>
          , действует от своего имени либо уполномочен действовать от имени
          представляемого лица, и даёт конкретное, информированное и
          сознательное согласие на обработку персональных данных в указанных
          целях.
        </p>
        <p>Дата редакции: 3 сентября 2026 г.</p>
      </section>
    </Container>
  );
};

export default Page;
