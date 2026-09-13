import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { fetchCategories, fetchProducts, CatalogCategoryRef } from "@/functions/serverFetch";
import { createPageMetadata, SITE_URL } from "@/constants/seo";
import { breadcrumbJsonLd, productListJsonLd } from "@/functions/jsonLd";
import { getCategorySeo, formatCategoryAvailability, getCategoryAvailability } from "@/functions/productSeo";
import {
  CATALOG_CATEGORIES,
  CatalogCategory,
  getCatalogCategory,
  getCatalogRedirectSlug,
  matchApiCategory,
} from "@/constants/catalogCategories";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { IProductId } from "@/types/products";

export const revalidate = 60;

interface IPage {
  params: Promise<{ slug: string }>;
}

const getVisibleCategoryProducts = (
  products: IProductId[] | null,
  category: CatalogCategory,
  apiCategories: CatalogCategoryRef[] | null,
) => {
  const apiCategory = matchApiCategory(category, apiCategories ?? []);
  if (!apiCategory) return [];

  return (
    products?.filter(
      (product) => product.show && product.categoryId === apiCategory._id,
    ) ?? []
  );
};

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

  const [allProducts, apiCategories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);
  const products = getVisibleCategoryProducts(
    allProducts,
    category,
    apiCategories,
  );
  const inStockProducts = products.filter((product) => product.available);

  return createPageMetadata(
    getCategorySeo(category, inStockProducts),
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
  const products = getVisibleCategoryProducts(
    allProducts,
    category,
    apiCategories,
  );
  const inStockProducts = products.filter((product) => product.available);
  const availabilityText = formatCategoryAvailability(
    getCategoryAvailability(inStockProducts),
  );

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
        availability={
          availabilityText ? { text: availabilityText } : undefined
        }
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
