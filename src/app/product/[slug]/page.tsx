import ProductPage from "@/pagesList/ProductPage/ProductPage";
import {
  fetchCategories,
  fetchProductImages,
  fetchProducts,
} from "@/functions/serverFetch";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { createPageMetadata, SITE_URL } from "@/constants/seo";
import { getProductSeo } from "@/functions/productSeo";
import { getProductSlug, resolveProductParam } from "@/functions/productSlug";
import { breadcrumbJsonLd } from "@/functions/jsonLd";
import { productJsonLd } from "@/functions/productJsonLd";
import { getCategorySlugById } from "@/constants/catalogCategories";
import { getEmbeddedProductImages } from "@/functions/productImages";
import { getRelatedProducts } from "@/functions/relatedProducts";

export const dynamicParams = true;
export const revalidate = 60;

interface IPage {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = (await fetchProducts())?.filter((item) => item.show) ?? [];
  return products.map((product) => ({ slug: getProductSlug(product) }));
}

export async function generateMetadata({ params }: IPage): Promise<Metadata> {
  const { slug } = await params;
  const [resolved, categories] = await Promise.all([
    resolveProductParam(slug),
    fetchCategories(),
  ]);

  if (!resolved) {
    return {
      title: "Товар не найден | Кирпичный завод Ковернино",
    };
  }

  const categoryName = categories?.find(
    (item) => item._id === resolved.product.categoryId,
  )?.name;
  const seo = getProductSeo(resolved.product, categoryName);
  const canonicalSlug = getProductSlug(resolved.product);

  return createPageMetadata(
    seo,
    `${SITE_URL}/product/${canonicalSlug}`,
    resolved.product.name,
  );
}

const Page = async ({ params }: IPage) => {
  const { slug } = await params;
  const resolved = await resolveProductParam(slug);

  if (!resolved) {
    notFound();
  }

  const canonicalSlug = getProductSlug(resolved.product);
  if (resolved.redirectTo || slug !== canonicalSlug) {
    permanentRedirect(`/product/${canonicalSlug}`);
  }

  const product = resolved.product;
  const embeddedImages = getEmbeddedProductImages(product);
  const [allProducts, categories, fetchedImages] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
    embeddedImages === undefined
      ? fetchProductImages(product._id)
      : Promise.resolve(null),
  ]);
  const productImages =
    embeddedImages !== undefined
      ? { _id: product._id, images: embeddedImages }
      : fetchedImages;

  const related = getRelatedProducts(allProducts ?? [], product, 3);
  const categorySlug = getCategorySlugById(
    product.categoryId,
    categories ?? [],
  );
  const categoryName = categories?.find(
    (item) => item._id === product.categoryId,
  )?.name;
  const catalogHref = categorySlug
    ? `/catalog/${categorySlug}`
    : "/catalog";
  const productUrl = `${SITE_URL}/product/${canonicalSlug}`;
  const seo = getProductSeo(product, categoryName);

  return (
    <>
      <ProductPage
        initialProduct={product}
        initialImages={productImages}
        initialRelatedProducts={related}
        categoryName={categoryName}
        categorySlug={categorySlug}
        catalogHref={catalogHref}
        heading={seo.h1}
      />

      <JsonLd
        id="product-ld"
        data={productJsonLd(product, productImages?.images, categoryName)}
      />

      <JsonLd
        id="breadcrumbs-ld"
        data={breadcrumbJsonLd([
          { name: "Главная", item: SITE_URL },
          ...(categorySlug && categoryName
            ? [
                {
                  name: categoryName,
                  item: `${SITE_URL}/catalog/${categorySlug}`,
                },
              ]
            : [{ name: "Каталог кирпича", item: `${SITE_URL}/catalog` }]),
          { name: product.name, item: productUrl },
        ])}
      />
    </>
  );
};

export default Page;
