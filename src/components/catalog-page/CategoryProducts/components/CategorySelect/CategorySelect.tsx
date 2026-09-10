"use client";

import Link from "next/link";
import styles from "./CategorySelect.module.css";
import {
  CATALOG_CATEGORIES,
  getCatalogCategoryByName,
} from "@/constants/catalogCategories";
import { LINK_CATALOG, LINK_CATALOG_CATEGORY } from "@/constants/links";
import { CatalogCategoryRef } from "@/functions/serverFetch";

type CategorySelectProps = {
  categorySlug?: string | null;
  categories?: CatalogCategoryRef[];
};

const CategorySelect = ({
  categorySlug = null,
  categories,
}: CategorySelectProps) => {
  const chips = CATALOG_CATEGORIES.map((item) => {
    const apiMatch = categories?.find((category) =>
      getCatalogCategoryByName(category.name)?.slug === item.slug,
    );

    return {
      slug: item.slug,
      name: item.name,
      hasSale: Boolean(apiMatch?.hasSale),
    };
  });

  return (
    <div className={styles.CategorySelect} role="group" aria-label="Тип кирпича">
      <Link
        href={LINK_CATALOG}
        className={`${styles.chip} ${!categorySlug ? styles.chipActive : ""}`}
      >
        Все
      </Link>
      {chips.map((elem) => (
        <Link
          key={elem.slug}
          href={LINK_CATALOG_CATEGORY(elem.slug)}
          className={`${styles.chip} ${categorySlug === elem.slug ? styles.chipActive : ""}`}
        >
          {elem.name}
          {elem.hasSale && <span className={styles.sale}>%</span>}
        </Link>
      ))}
    </div>
  );
};

export default CategorySelect;
