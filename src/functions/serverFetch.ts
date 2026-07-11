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

export async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(getApiUrl(path), {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export const fetchProducts = () => serverFetch<IProductId[]>(API_PRODUCT);

export const fetchProduct = (id: string) =>
  serverFetch<IProductId>(API_PRODUCT_ID(id));

export const fetchProductImages = (id: string) =>
  serverFetch<IProductImg>(API_PRODUCT_IMG(id));

export const fetchGallery = () => serverFetch<IGalleryItem[]>(API_GALLERY);

export const fetchProductSample = (quantity: number) =>
  serverFetch<IProductId[]>(API_PRODUCTS_SAMPLE(quantity));
