import styles from "./CalcSeo.module.css";
import Link from "next/link";
import { LINK_CATALOG_CATEGORY, LINK_CONTACTS } from "@/constants/links";

const CalcSeo = () => {
  return (
    <section className={styles.seo}>
      <h2>Как считать расход кирпича</h2>
      <p>
        Калькулятор считает штуки по площади стен или по объёму кладки. Для
        площади укажите длину и высоту стен, вычтите проёмы, выберите толщину
        кладки и формат: 1NF (250×120×65), 1,4NF (250×120×88) или 2,1NF
        (250×120×140). Для объёма — кубометры кладки из проекта.
      </p>
      <p>
        Результат — ориентир. На углы, подрезку и бой закладывают запас 5–7%,
        для облицовки иногда больше. Точную смету лучше сверить с менеджером:
        рядовой и лицевой считают отдельно.
      </p>
      <p>
        Подобрать позиции:{" "}
        <Link href={LINK_CATALOG_CATEGORY("ryadovoy")}>рядовой кирпич</Link>
        {" "}и{" "}
        <Link href={LINK_CATALOG_CATEGORY("oblitsovochnyy")}>
          облицовочный
        </Link>
        . Вопросы по расходу — на{" "}
        <Link href={LINK_CONTACTS}>странице контактов</Link>.
      </p>
    </section>
  );
};

export default CalcSeo;
