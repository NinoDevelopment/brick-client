import { IProductIdWithImg, IProductWithImg } from "@/types/products";

type ProductPayload = Omit<IProductWithImg, never> & { _id?: string };

export const buildProductPayload = (
  formData: IProductWithImg | IProductIdWithImg,
): ProductPayload => {
  const payload: ProductPayload = {
    name: formData.name,
    description: formData.description,
    categoryId: formData.categoryId,
    images: formData.images,
    discount: Number(formData.discount) || 0,
    pack: Number(formData.pack) || 0,
    price: Number(formData.price) || 0,
    available: Boolean(formData.available),
    color: formData.color || "",
    isRecommendation: Boolean(formData.isRecommendation),
    show: Boolean(formData.show),
  };

  if ("_id" in formData && formData._id) {
    payload._id = formData._id;
  }

  return payload;
};
