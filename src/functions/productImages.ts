type ProductImageSource = {
  images?: string[] | null;
};

export const getEmbeddedProductImages = (
  source?: ProductImageSource | null,
): string[] | undefined =>
  Array.isArray(source?.images) ? source.images : undefined;

export const shouldFetchProductImages = (
  productReady: boolean,
  source?: ProductImageSource | null,
): boolean => productReady && getEmbeddedProductImages(source) === undefined;
