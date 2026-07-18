import {
  API_GALLERY,
  API_PRODUCT,
  API_PRODUCT_ID,
  API_PRODUCT_IMG,
  API_PRODUCTS_SAMPLE,
} from "@/constants/api";
import { IGalleryItem } from "@/types/gallery";
import { IProductId, IProductImg } from "@/types/products";

const getApiUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_LINK}${path}`;

export async function serverFetch<T>(
  path: string,
  options?: { cache?: RequestCache; revalidate?: number | false },
): Promise<T | null> {
  try {
    const cache = options?.cache;
    const revalidate = options?.revalidate ?? 3600;

    const response = await fetch(getApiUrl(path), {
      headers: { "Content-Type": "application/json" },
      ...(cache ? { cache } : { next: { revalidate } }),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export const fetchProducts = () =>
  serverFetch<IProductId[]>(API_PRODUCT, { cache: "no-store" });

export const fetchProduct = (id: string) =>
  serverFetch<IProductId>(API_PRODUCT_ID(id), { cache: "no-store" });

export const fetchProductImages = (id: string) =>
  serverFetch<IProductImg>(API_PRODUCT_IMG(id), { cache: "no-store" });

export const fetchGallery = () =>
  serverFetch<IGalleryItem[]>(API_GALLERY, { cache: "no-store" });

export const fetchProductSample = (quantity: number) =>
  serverFetch<IProductId[]>(API_PRODUCTS_SAMPLE(quantity), {
    cache: "no-store",
  });
