import CategoryProducts from "@/components/catalog-page/CategoryProducts/CategoryProducts";
import { Container } from "react-bootstrap";
import CatalogBanner from "@/components/catalog-page/CatalogBanner/CatalogBanner";
import CatalogIntro from "@/components/catalog-page/CatalogIntro/CatalogIntro";
import introStyles from "@/components/catalog-page/CatalogIntro/CatalogIntro.module.css";
import { IProductId } from "@/types/products";
import { CatalogCategoryRef } from "@/functions/serverFetch";
import { CATALOG_INTRO } from "@/constants/catalogCategories";
import Link from "next/link";
import { LINK_CATALOG } from "@/constants/links";
import bannerStyles from "@/components/catalog-page/CatalogBanner/CatalogBanner.module.css";

interface ICatalogPage {
  initialProducts?: IProductId[];
  categorySlug?: string | null;
  title?: string;
  breadcrumbLabel?: string;
  subtitle?: string;
  introHeading?: string;
  introParagraphs?: string[];
  introSections?: { heading: string; paragraphs: string[] }[];
  categories?: CatalogCategoryRef[];
  availability?: { text: string };
}

const CatalogPage = ({
  initialProducts,
  categorySlug = null,
  title,
  breadcrumbLabel,
  subtitle,
  introHeading = CATALOG_INTRO.heading,
  introParagraphs = CATALOG_INTRO.paragraphs,
  introSections,
  categories,
  availability,
}: ICatalogPage) => {
  return (
    <>
      <CatalogBanner title={title} subtitle={subtitle}>
        {categorySlug ? (
          <p className={bannerStyles.breadcrumb}>
            <Link href={LINK_CATALOG}>Каталог</Link>
            <span aria-hidden="true"> / </span>
            <span>{breadcrumbLabel || title}</span>
          </p>
        ) : null}
      </CatalogBanner>
      <Container>
        {availability?.text ? (
          <section className={introStyles.availability}>
            <h2>В наличии</h2>
            <p>{availability.text}</p>
          </section>
        ) : null}
        <CategoryProducts
          initialProducts={initialProducts}
          categorySlug={categorySlug}
          categories={categories}
        />
        <CatalogIntro
          heading={introHeading}
          paragraphs={introParagraphs}
          sections={introSections}
        />
      </Container>
    </>
  );
};

export default CatalogPage;
