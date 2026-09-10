import { cache } from "react";
import {
  API_CATEGORY,
  API_GALLERY,
  API_PRODUCT,
  API_PRODUCT_ID,
  API_PRODUCT_IMG,
  API_PRODUCTS_SAMPLE,
} from "@/constants/api";
import { IGalleryItem } from "@/types/gallery";
import { IProductId, IProductImg } from "@/types/products";
import { ICategoryId } from "@/types/categories";

const getApiUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_LINK}${path}`;

export async function serverFetch<T>(
  path: string,
  options?: { cache?: RequestCache; revalidate?: number | false },
): Promise<T | null> {
  try {
    const requestCache = options?.cache;
    const revalidate = options?.revalidate ?? 60;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(getApiUrl(path), {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        ...(requestCache
          ? { cache: requestCache }
          : { next: { revalidate } }),
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  } catch {
    return null;
  }
}

export type CatalogCategoryRef = Pick<
  ICategoryId,
  "_id" | "name" | "hasSale" | "description"
>;

export const stripCategoryMedia = (
  categories: ICategoryId[],
): CatalogCategoryRef[] =>
  categories.map(({ _id, name, hasSale, description }) => ({
    _id,
    name,
    hasSale,
    description,
  }));

export const fetchProducts = cache(() =>
  serverFetch<IProductId[]>(API_PRODUCT),
);

export const fetchCategories = cache(async () => {
  const categories = await serverFetch<ICategoryId[]>(API_CATEGORY);
  return categories ? stripCategoryMedia(categories) : null;
});

export const fetchProduct = cache((id: string) =>
  serverFetch<IProductId>(API_PRODUCT_ID(id)),
);

export const fetchProductImages = (id: string) =>
  serverFetch<IProductImg>(API_PRODUCT_IMG(id));

export const fetchGallery = () => serverFetch<IGalleryItem[]>(API_GALLERY);

export const fetchProductSample = (quantity: number) =>
  serverFetch<IProductId[]>(API_PRODUCTS_SAMPLE(quantity));
