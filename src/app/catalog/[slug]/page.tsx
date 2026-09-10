import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { fetchCategories, fetchProducts } from "@/functions/serverFetch";
import { createPageMetadata, SITE_URL } from "@/constants/seo";
import { breadcrumbJsonLd, productListJsonLd } from "@/functions/jsonLd";
import {
  CATALOG_CATEGORIES,
  getCatalogCategory,
  getCatalogRedirectSlug,
  matchApiCategory,
} from "@/constants/catalogCategories";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

export const revalidate = 60;

interface IPage {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATALOG_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: IPage): Promise<Metadata> {
  const { slug } = await params;
  const redirectTo = getCatalogRedirectSlug(slug);
  if (redirectTo) {
    return {};
  }

  const category = getCatalogCategory(slug);
  if (!category) {
    return { title: "Категория не найдена | Кирпичный завод Ковернино" };
  }

  return createPageMetadata(
    { title: category.title, description: category.description },
    `${SITE_URL}/catalog/${category.slug}`,
    category.h1,
  );
}

const Page = async ({ params }: IPage) => {
  const { slug } = await params;
  const redirectTo = getCatalogRedirectSlug(slug);
  if (redirectTo) {
    permanentRedirect(`/catalog/${redirectTo}`);
  }

  const category = getCatalogCategory(slug);
  if (!category) {
    notFound();
  }

  const [allProducts, apiCategories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const apiCategory = matchApiCategory(category, apiCategories ?? []);
  const products =
    allProducts
      ?.filter((product) => product.show)
      .filter((product) =>
        apiCategory ? product.categoryId === apiCategory._id : false,
      ) ?? [];

  return (
    <>
      <CatalogPage
        initialProducts={products}
        categorySlug={category.slug}
        title={category.h1}
        breadcrumbLabel={category.name}
        subtitle={category.lead}
        introHeading=""
        introParagraphs={[]}
        introSections={category.sections}
        categories={apiCategories ?? []}
      />

      <JsonLd
        id="breadcrumbs-ld"
        data={breadcrumbJsonLd([
          { name: "Главная", item: SITE_URL },
          { name: "Каталог кирпича", item: `${SITE_URL}/catalog` },
          {
            name: category.name,
            item: `${SITE_URL}/catalog/${category.slug}`,
          },
        ])}
      />

      <JsonLd id="catalog-itemlist-ld" data={productListJsonLd(products)} />
    </>
  );
};

export default Page;
