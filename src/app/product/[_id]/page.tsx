import ProductPage from "@/pagesList/ProductPage/ProductPage";
import { fetchProduct, fetchProductImages } from "@/functions/serverFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata, getProductSeo } from "@/constants/seo";

interface IPage {
  params: { _id: string };
}

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
    `${process.env.NEXT_PUBLIC_PROD_URL}/product/${params._id}`,
    product.name,
  );
}

const Page = async ({ params }: IPage) => {
  const [product, images] = await Promise.all([
    fetchProduct(params._id),
    fetchProductImages(params._id),
  ]);

  if (!product || !product.show) {
    notFound();
  }

  return (
    <ProductPage initialProduct={product} initialImages={images} />
  );
};

export default Page;
