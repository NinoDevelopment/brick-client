import ProductPage from "@/pagesList/ProductPage/ProductPage";
import {
  fetchProduct,
  fetchProductImages,
  fetchProductSample,
} from "@/functions/serverFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  createPageMetadata,
  getProductSeo,
  SITE_NAME,
  SITE_URL,
} from "@/constants/seo";

interface IPage {
  params: { _id: string };
}

const getSchemaImage = (image?: string) => {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return undefined;
};

export async function generateMetadata({ params }: IPage): Promise<Metadata> {
  const product = await fetchProduct(params._id);

  if (!product) {
    return {
      title: "Товар не найден | Кирпичный завод Ковернино",
    };
  }

  const seo = getProductSeo(product.name, product.description);

  return createPageMetadata(
    seo,
    `${SITE_URL}/product/${params._id}`,
    product.name,
  );
}

const Page = async ({ params }: IPage) => {
  const [product, images, relatedProducts] = await Promise.all([
    fetchProduct(params._id),
    fetchProductImages(params._id),
    fetchProductSample(3),
  ]);

  if (!product || !product.show) {
    notFound();
  }

  const productUrl = `${SITE_URL}/product/${params._id}`;
  const schemaImage = getSchemaImage(images?.images?.[0]);
  const related =
    relatedProducts?.filter(
      (item) => item.show && item._id !== product._id,
    ) ?? [];

  return (
    <>
      <ProductPage
        initialProduct={product}
        initialImages={images}
        initialRelatedProducts={related}
      />

      <Script
        id="product-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            ...(schemaImage && { image: schemaImage }),
            brand: {
              "@type": "Brand",
              name: SITE_NAME,
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "RUB",
              availability: product.available
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              url: productUrl,
              seller: {
                "@type": "Organization",
                name: SITE_NAME,
                url: SITE_URL,
              },
            },
            sku: product._id,
          }),
        }}
      />

      <Script
        id="breadcrumbs-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Каталог кирпича",
                item: `${SITE_URL}/catalog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: productUrl,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default Page;
