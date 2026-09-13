import { parseProductSpecs } from "@/functions/parseProductSpecs";
import { SITE_NAME } from "@/constants/seo";

export type ProductSeoSource = {
  name: string;
  description?: string;
  price: number;
  discount?: number;
  pack?: number;
  available?: boolean;
  color?: string;
};

const specValue = (
  description: string | undefined,
  label: string,
): string | undefined => {
  const value = parseProductSpecs(description).find(
    (spec) => spec.label.toLowerCase() === label.toLowerCase(),
  )?.value;
  return value?.trim() || undefined;
};

const lowerName = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
};

const categoryKind = (categoryName?: string) => {
  const value = categoryName?.trim().toLowerCase();
  if (!value) return undefined;
  if (value.includes("облицовоч")) return "facing" as const;
  if (value.includes("рядов")) return "row" as const;
  return undefined;
};

const nameTraits = (name: string) => {
  const value = name.toLowerCase();
  return {
    solid: value.includes("полнотел"),
    hollow: value.includes("пустотел"),
  };
};

const useCase = (name: string, categoryName?: string) => {
  const kind = categoryKind(categoryName);
  const traits = nameTraits(name);

  if (kind === "facing") return "для фасада";
  if (kind === "row" && traits.solid) {
    return "для несущих стен, цоколя и столбов";
  }
  if (kind === "row") return "для стен и перегородок";
  return undefined;
};

const categoryPhrase = (categoryName?: string) => {
  const kind = categoryKind(categoryName);
  if (kind === "facing") return "облицовочный керамический кирпич";
  if (kind === "row") return "рядовой керамический кирпич";
  return "керамический кирпич";
};

export const getProductUnitPrice = (product: ProductSeoSource) => {
  if (!Number.isFinite(product.price) || product.price <= 0) return undefined;
  const discount = Number(product.discount) || 0;
  const value =
    discount > 0 ? (product.price * (100 - discount)) / 100 : product.price;
  return Math.round(value * 10) / 10;
};

export const formatProductPrice = (price: number) =>
  Number.isInteger(price) ? String(price) : String(price).replace(".", ",");

export const getMinProductUnitPrice = (products: ProductSeoSource[]) => {
  let min: number | undefined;

  for (const product of products) {
    const price = getProductUnitPrice(product);
    if (price === undefined) continue;
    min = min === undefined ? price : Math.min(min, price);
  }

  return min;
};

export const getCategorySeo = (
  category: { name: string; title: string; description: string },
  products: ProductSeoSource[],
) => {
  const minPrice = getMinProductUnitPrice(products);

  return {
    title:
      minPrice === undefined
        ? category.title
        : `${category.name} кирпич — от ${formatProductPrice(minPrice)} ₽/шт с доставкой | ${SITE_NAME}`,
    description: category.description,
  };
};

const priceLabel = (product: ProductSeoSource) => {
  const price = getProductUnitPrice(product);
  if (price === undefined) return undefined;
  const formatted = `${formatProductPrice(price)} ₽/шт`;
  const discount = Number(product.discount) || 0;
  if (discount > 0) return `${formatted} со скидкой ${discount}%`;
  return formatted;
};

const packLabel = (product: ProductSeoSource) => {
  const pack = Number(product.pack);
  if (!Number.isFinite(pack) || pack <= 0) return undefined;
  return `${pack} шт на поддоне`;
};

const availabilityLabel = (product: ProductSeoSource) => {
  if (product.available === true) return "в наличии";
  if (product.available === false) return "под заказ";
  return undefined;
};

const clipMeta = (text: string, limit = 160) => {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;

  const slice = normalized.slice(0, limit);
  const bound = Math.max(slice.lastIndexOf(" "), slice.lastIndexOf(","));
  return (bound > limit * 0.6 ? slice.slice(0, bound) : slice).replace(
    /[,.;:\s—-]+$/,
    "",
  );
};

const factsList = (product: ProductSeoSource) => {
  const size = specValue(product.description, "Размер");
  const weight = specValue(product.description, "Вес");
  const mark = specValue(product.description, "Марка по прочности");
  const frost = specValue(product.description, "Морозостойкость");
  const water = specValue(product.description, "Водопоглощение");
  const density = specValue(product.description, "Плотность");

  return [
    size,
    weight ? `вес ${weight}` : undefined,
    mark ? `марка по прочности ${mark}` : undefined,
    frost ? `морозостойкость ${frost}` : undefined,
    water ? `водопоглощение ${water}` : undefined,
    density ? `плотность ${density}` : undefined,
  ].filter((item): item is string => Boolean(item));
};

const colorNote = (product: ProductSeoSource) => {
  const color = product.color?.trim();
  if (!color) return undefined;
  if (product.name.toLowerCase().includes(color.toLowerCase())) return undefined;
  return `Цвет — ${color.toLowerCase()}.`;
};

export const getProductCopy = (
  product: ProductSeoSource,
  categoryName?: string,
) => {
  const purpose = useCase(product.name, categoryName);
  const intro = [
    `${product.name} — ${categoryPhrase(categoryName)} завода Ковернино${
      purpose ? ` ${purpose}` : ""
    }.`,
    colorNote(product),
  ]
    .filter(Boolean)
    .join(" ");

  const facts = factsList(product);
  const factsSentence = facts.length ? `${facts.join(", ")}.` : undefined;

  const offer = [
    priceLabel(product) ? `Цена ${priceLabel(product)}` : undefined,
    packLabel(product) ? `отгрузка ${packLabel(product)}` : undefined,
    availabilityLabel(product),
  ]
    .filter(Boolean)
    .join(", ");

  return {
    intro,
    facts: factsSentence,
    offer: offer ? `${offer}.` : undefined,
  };
};

export const getProductSeo = (
  product: ProductSeoSource,
  categoryName?: string,
) => {
  const unitPrice = getProductUnitPrice(product);
  const title = unitPrice
    ? `${product.name} | ${formatProductPrice(unitPrice)} ₽/шт`
    : `${product.name} | Купить с завода Ковернино`;

  const kind = categoryKind(categoryName);
  const typeWord =
    kind === "facing" ? "облицовочный " : kind === "row" ? "рядовой " : "";
  const size = specValue(product.description, "Размер");
  const mark = specValue(product.description, "Марка по прочности");
  const specBits = [
    size,
    mark ? `марка ${mark}` : undefined,
  ].filter((item): item is string => Boolean(item));

  const offerBits = [
    unitPrice !== undefined
      ? `${formatProductPrice(unitPrice)} ₽/шт`
      : undefined,
    packLabel(product),
  ].filter((item): item is string => Boolean(item));

  const specPart = specBits.length ? `: ${specBits.join(", ")}` : "";
  const head = (typePrefix: string) =>
    `Купить ${typePrefix}${lowerName(product.name)} с завода Ковернино${specPart}.`;
  const offer = offerBits.length ? `${offerBits.join(", ")}.` : "";
  const delivery = "Доставка в Нижний Новгород и область.";

  const candidates = [
    [head(typeWord), offer, delivery],
    [head(""), offer, delivery],
    [head(typeWord), offer],
    [head(""), offer],
  ]
    .map((parts) => parts.filter(Boolean).join(" "))
    .filter(Boolean);

  const description =
    candidates.find((text) => text.length <= 160) ?? clipMeta(candidates[0]);

  return { title, description };
};
