import { OG_IMAGE } from "@/constants/seo";

export const OG_DEFAULT_IMAGE = OG_IMAGE.url;

export const getHttpImages = (images?: string[] | null) =>
  (images ?? []).filter(
    (image) => image.startsWith("http://") || image.startsWith("https://"),
  );

export const getSchemaImages = (images?: string[] | null) => {
  const httpImages = getHttpImages(images);
  return httpImages.length ? httpImages : [OG_DEFAULT_IMAGE];
};
