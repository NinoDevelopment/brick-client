import { SITE_NAME } from "@/constants/seo";

export type CatalogCategory = {
  slug: string;
  apiNames: string[];
  name: string;
  nameGenitive: string;
  h1: string;
  title: string;
  description: string;
  lead: string;
  redirectsFrom: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    slug: "ryadovoy",
    apiNames: ["Рядовой"],
    name: "Рядовой",
    nameGenitive: "рядового кирпича",
    h1: "Купить рядовой кирпич в Нижнем Новгороде",
    title: `Купить рядовой кирпич в Нижнем Новгороде | ${SITE_NAME}`,
    description:
      "Рядовой керамический кирпич с завода Ковернино: стены, перегородки и хозяйственные постройки. Купить с доставкой в Нижний Новгород и область, цена от производителя.",
    lead:
      "Для несущих стен и перегородок. Доставка по Нижнему Новгороду и области.",
    redirectsFrom: ["stroitelnyy", "stroitelny", "keramicheskiy"],
    sections: [
      {
        heading: "Рядовой кирпич с завода",
        paragraphs: [
          "Рядовой керамический кирпич — основа стен: его штукатурят, утепляют или закрывают облицовкой. Делаем из своей глины на заводе в Ковернинском районе, без перепродажи чужих партий. Пустотелый легче и теплее, полнотелый берут на цоколь и столбы. Размеры и марки — в карточках выше.",
        ],
      },
      {
        heading: "Доставка и цена",
        paragraphs: [
          "Возим в Нижний Новгород и по области своим транспортом, самовывоз — с завода в деревне Чёрные. Цена за штуку, отгрузка паллетами. Расход можно прикинуть в калькуляторе, точную смету сверим с проектом.",
        ],
      },
    ],
  },
  {
    slug: "oblitsovochnyy",
    apiNames: ["Облицовочный"],
    name: "Облицовочный",
    nameGenitive: "облицовочного кирпича",
    h1: "Купить облицовочный кирпич в Нижнем Новгороде",
    title: `Купить облицовочный кирпич в Нижнем Новгороде | ${SITE_NAME}`,
    description:
      "Облицовочный и лицевой кирпич с завода Ковернино для фасада. Купить в Нижнем Новгороде с доставкой по области, цена от производителя.",
    lead:
      "Для фасада. Производство в Нижегородской области, доставка в Нижний Новгород.",
    redirectsFrom: [
      "litsevoy",
      "licevoy",
      "oblicovochnyy",
      "fasadnyy",
      "krasnyy",
    ],
    sections: [
      {
        heading: "Лицевой кирпич для фасада",
        paragraphs: [
          "Облицовочный кирпич задаёт вид дома: важны цвет партии, геометрия и поверхность. Делаем сами из ковернинской глины — партию можно докупить под тот же объект. Рельеф прощает мелкие огрехи кладки, гладкий даёт спокойный фасад. Что сейчас в отгрузке — в карточках выше.",
        ],
      },
      {
        heading: "Доставка и цена",
        paragraphs: [
          "Привозим в Нижний Новгород и по области, разгрузка бережная, чтобы не сбить лицевую грань. Самовывоз с завода в деревне Чёрные. Цена за штуку, отгрузка паллетами. На фасад закладывайте запас 5–7% на подрезку и бой.",
        ],
      },
    ],
  },
];

export const CATALOG_INTRO = {
  heading: "Кирпич от производителя",
  paragraphs: [
    "Керамический кирпич завода «Ковернино»: рядовой для стен и облицовочный для фасада. Своя глина, своё производство, доставка в Нижний Новгород и область без посредников. Актуальные позиции и цены — в карточках выше.",
  ],
};

export const getCatalogCategory = (slug: string) =>
  CATALOG_CATEGORIES.find((category) => category.slug === slug);

export const getCatalogCategoryByName = (name: string) =>
  CATALOG_CATEGORIES.find((category) =>
    category.apiNames.some(
      (apiName) => apiName.toLowerCase() === name.trim().toLowerCase(),
    ),
  );

export const getCatalogRedirectSlug = (slug: string) => {
  const direct = getCatalogCategory(slug);
  if (direct) return null;

  const source = CATALOG_CATEGORIES.find((category) =>
    category.redirectsFrom.includes(slug),
  );

  return source?.slug ?? null;
};

export const getCategorySlugById = (
  categoryId: string,
  categories: { _id: string; name: string }[],
) => {
  const apiCategory = categories.find((item) => item._id === categoryId);
  if (!apiCategory) return undefined;
  return getCatalogCategoryByName(apiCategory.name)?.slug;
};

export const matchApiCategory = (
  catalog: CatalogCategory,
  apiCategories: { _id: string; name: string }[],
) =>
  apiCategories.find((item) =>
    catalog.apiNames.some(
      (apiName) => apiName.toLowerCase() === item.name.trim().toLowerCase(),
    ),
  );

