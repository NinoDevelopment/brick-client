import ProductPage from "@/pagesList/ProductPage/ProductPage";
import {
  fetchCategories,
  fetchProductImages,
  fetchProducts,
  fetchProductSample,
} from "@/functions/serverFetch";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import {
  createPageMetadata,
  getProductSeo,
  SITE_URL,
} from "@/constants/seo";
import { getProductSlug, resolveProductParam } from "@/functions/productSlug";
import { breadcrumbJsonLd } from "@/functions/jsonLd";
import { productJsonLd } from "@/functions/productJsonLd";
import { getCategorySlugById } from "@/constants/catalogCategories";
import { getEmbeddedProductImages } from "@/functions/productImages";

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
  const resolved = await resolveProductParam(slug);

  if (!resolved) {
    return {
      title: "Товар не найден | Кирпичный завод Ковернино",
    };
  }

  const seo = getProductSeo(
    resolved.product.name,
    resolved.product.description,
  );
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
  const [relatedProducts, categories, fetchedImages] = await Promise.all([
    fetchProductSample(3),
    fetchCategories(),
    embeddedImages === undefined
      ? fetchProductImages(product._id)
      : Promise.resolve(null),
  ]);
  const productImages =
    embeddedImages !== undefined
      ? { _id: product._id, images: embeddedImages }
      : fetchedImages;

  const related =
    relatedProducts?.filter(
      (item) => item.show && item._id !== product._id,
    ) ?? [];
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

  return (
    <>
      <ProductPage
        initialProduct={product}
        initialImages={productImages}
        initialRelatedProducts={related}
        categoryName={categoryName}
        categorySlug={categorySlug}
        catalogHref={catalogHref}
      />

      <JsonLd
        id="product-ld"
        data={productJsonLd(product, productImages?.images)}
      />

      <JsonLd
        id="breadcrumbs-ld"
        data={breadcrumbJsonLd([
          { name: "Главная", item: SITE_URL },
          { name: "Каталог кирпича", item: `${SITE_URL}/catalog` },
          ...(categorySlug && categoryName
            ? [
                {
                  name: categoryName,
                  item: `${SITE_URL}/catalog/${categorySlug}`,
                },
              ]
            : []),
          { name: product.name, item: productUrl },
        ])}
      />
    </>
  );
};

export default Page;
