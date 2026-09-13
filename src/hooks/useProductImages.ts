import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCT_IMG } from "@/constants/api";
import { IProductImg } from "@/types/products";
import { REQUEST_METHODS } from "@/types/general";
import {
  getEmbeddedProductImages,
  shouldFetchProductImages,
} from "@/functions/productImages";

export const useProductImages = (
  productId: string | undefined,
  source?: { images?: string[] | null } | null,
  productReady: boolean = true,
) => {
  const embedded = getEmbeddedProductImages(source);
  const { data } = useFetch<IProductImg>(
    API_PRODUCT_IMG(productId || ""),
    REQUEST_METHODS.GET,
    {},
    false,
    Boolean(productId) && shouldFetchProductImages(productReady, source),
  );

  return embedded ?? data?.images;
};
