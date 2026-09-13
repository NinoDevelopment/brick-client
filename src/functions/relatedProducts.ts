import { parseProductSpecs } from "@/functions/parseProductSpecs";
import { IProductId } from "@/types/products";

const specValue = (description: string | undefined, label: string) =>
  parseProductSpecs(description).find(
    (spec) => spec.label.toLowerCase() === label.toLowerCase(),
  )?.value?.trim();

const normalize = (value?: string) =>
  value?.toLowerCase().replace(/\s+/g, "").replace(/[×х]/g, "x");

const formatKey = (product: IProductId) => {
  const fromSpec = normalize(specValue(product.description, "Формат"));
  if (fromSpec) return fromSpec.replace(".", ",");

  const match = product.name.toLowerCase().match(/(\d+(?:,\d+)?)\s*nf/);
  return match ? `${match[1]}nf` : undefined;
};

const relatedScore = (current: IProductId, other: IProductId) => {
  const currentName = current.name.toLowerCase();
  const otherName = other.name.toLowerCase();
  let score = 0;

  const currentFormat = formatKey(current);
  const otherFormat = formatKey(other);
  if (currentFormat && currentFormat === otherFormat) score += 4;

  const currentSize = normalize(specValue(current.description, "Размер"));
  const otherSize = normalize(specValue(other.description, "Размер"));
  if (currentSize && currentSize === otherSize) score += 3;

  if (currentName.includes("полнотел") && otherName.includes("полнотел")) {
    score += 3;
  }
  if (currentName.includes("пустотел") && otherName.includes("пустотел")) {
    score += 3;
  }
  if (currentName.includes("кора дуба") && otherName.includes("кора дуба")) {
    score += 3;
  }
  if (currentName.includes("скала") && otherName.includes("скала")) {
    score += 3;
  }
  if (currentName.includes("ребрист") && otherName.includes("ребрист")) {
    score += 2;
  }
  if (currentName.includes("гладк") && otherName.includes("гладк")) {
    score += 2;
  }

  const currentColor = current.color?.trim().toLowerCase();
  const otherColor = other.color?.trim().toLowerCase();
  if (currentColor && currentColor === otherColor) score += 2;

  const currentMark = normalize(
    specValue(current.description, "Марка по прочности"),
  );
  const otherMark = normalize(specValue(other.description, "Марка по прочности"));
  if (currentMark && currentMark === otherMark) score += 1;

  return score;
};

export const getRelatedProducts = (
  products: IProductId[],
  current: IProductId,
  limit = 3,
) =>
  products
    .filter(
      (product) =>
        product.show &&
        product._id !== current._id &&
        product.categoryId === current.categoryId,
    )
    .sort((left, right) => {
      const diff =
        relatedScore(current, right) - relatedScore(current, left);
      if (diff !== 0) return diff;
      return left.name.localeCompare(right.name, "ru");
    })
    .slice(0, limit);

const isSolid = (product: IProductId) =>
  product.name.toLowerCase().includes("полнотел");

const isHollow = (product: IProductId) =>
  product.name.toLowerCase().includes("пустотел");

export const getFeaturedDeliveryProducts = (
  products: IProductId[],
  categories: { _id: string; name: string }[],
  limit = 3,
) => {
  const visible = products.filter((product) => product.show);
  if (!visible.length || limit <= 0) return [];

  const facingIds = new Set(
    categories
      .filter((category) => category.name.toLowerCase().includes("облицовоч"))
      .map((category) => category._id),
  );
  const rowIds = new Set(
    categories
      .filter((category) => category.name.toLowerCase().includes("рядов"))
      .map((category) => category._id),
  );

  const score = (product: IProductId) => {
    const format = formatKey(product) ?? "";
    let value = 0;
    if (product.available) value += 5;
    if (isSolid(product)) value += 20;
    if (facingIds.has(product.categoryId)) value += 12;
    if (format === "1nf") value += 8;
    if (format === "1,4nf") value += 4;
    if (Number(product.discount) > 0) value += 3;
    return value;
  };

  const rank = (left: IProductId, right: IProductId) => {
    const diff = score(right) - score(left);
    if (diff !== 0) return diff;
    return left.name.localeCompare(right.name, "ru");
  };

  const picked: IProductId[] = [];
  const take = (predicate: (product: IProductId) => boolean) => {
    if (picked.length >= limit) return;
    const next = visible
      .filter(
        (product) =>
          !picked.some((item) => item._id === product._id) &&
          predicate(product),
      )
      .sort(rank)[0];
    if (next) picked.push(next);
  };

  take((product) => rowIds.has(product.categoryId) && isSolid(product));
  take((product) => facingIds.has(product.categoryId));
  take((product) => rowIds.has(product.categoryId) && isHollow(product));
  take(() => true);

  return picked.slice(0, limit);
};
