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
