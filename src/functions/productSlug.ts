import { IProductId } from "@/types/products";
import { isMongoObjectId, slugify } from "@/functions/slugify";
import { fetchProduct, fetchProducts } from "@/functions/serverFetch";

export const getProductSlug = (product: { _id: string; name: string }) =>
  slugify(product.name) || product._id;

export const findProductBySlug = (
  products: IProductId[],
  slug: string,
) => products.find((product) => getProductSlug(product) === slug);

type ResolvedProduct =
  | { product: IProductId; redirectTo?: undefined }
  | { product: IProductId; redirectTo: string };

export const resolveProductParam = async (
  param: string,
): Promise<ResolvedProduct | null> => {
  if (isMongoObjectId(param)) {
    const product = await fetchProduct(param);
    if (!product || !product.show) return null;
    return { product, redirectTo: getProductSlug(product) };
  }

  const products = (await fetchProducts()) ?? [];
  const product = findProductBySlug(
    products.filter((item) => item.show),
    param,
  );

  if (!product) return null;
  return { product };
};
