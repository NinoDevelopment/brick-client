import { API_PRODUCT, API_PRODUCT_ID, API_PRODUCT_IMG } from "@/constants/api";
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
