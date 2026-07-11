import { Metadata } from "next";

export const SITE_NAME = "Кирпичный завод Ковернино";
export const SITE_URL = process.env.NEXT_PUBLIC_PROD_URL || "https://kzk.ooo";

const OG_IMAGE = {
  width: 252,
  height: 94,
};

export const SEO_DEFAULT = {
  title: `Купить кирпич в Нижнем Новгороде | ${SITE_NAME}`,
  description:
    "Купить кирпич в Нижнем Новгороде с доставкой от производителя. Красный, керамический, облицовочный и строительный — цены с завода Ковернино.",
};

export const SEO_HOME = SEO_DEFAULT;

export const SEO_CATALOG = {
  title: `Каталог кирпича | Нижний Новгород | ${SITE_NAME}`,
  description:
    "Каталог кирпича с ценами и характеристиками. Купить в Нижнем Новгороде с доставкой по городу и Нижегородской области.",
};

export const SEO_ABOUT = {
  title: `О нас | ${SITE_NAME}`,
  description:
    "Кирпичный завод Ковернино: собственная глина, производство и доставка кирпича в Нижний Новгород и область.",
};

export const SEO_DELIVERY = {
  title: `Оплата и доставка | Нижний Новгород | ${SITE_NAME}`,
  description:
    "Условия доставки и оплаты кирпича по Нижнему Новгороду и Нижегородской области. Зоны и сроки.",
};

export const SEO_CONTACTS = {
  title: `Контакты | ${SITE_NAME}`,
  description:
    "Телефон, адрес завода и форма заявки. Заказать кирпич в Нижнем Новгороде с доставкой — Кирпичный завод Ковернино.",
};

export const SEO_CALCULATOR = {
  title: `Калькулятор кирпича | ${SITE_NAME}`,
  description:
    "Рассчитайте количество кирпича для строительства онлайн. Калькулятор завода Ковернино — Нижний Новгород и область.",
};

export const SEO_GALLERY = {
  title: `Галерея | ${SITE_NAME}`,
  description:
    "Фото готовых объектов и нашего кирпича. Примеры работ завода Ковернино в Нижнем Новгороде и Нижегородской области.",
};

export const SEO_ORDER = {
  title: `Оформление заказа | ${SITE_NAME}`,
  description:
    "Оформите заказ кирпича с доставкой по Нижнему Новгороду и Нижегородской области. Цены от производителя.",
};

export const SEO_SHOP_CART = {
  title: `Корзина | ${SITE_NAME}`,
  description: "Корзина заказа кирпича — Кирпичный завод Ковернино.",
};

export const SEO_PRIVACY = {
  title: `Политика конфиденциальности | ${SITE_NAME}`,
  description:
    "Политика конфиденциальности и обработки персональных данных сайта Кирпичного завода Ковернино.",
};

export const SEO_REQUISITES = {
  title: `Реквизиты | ${SITE_NAME}`,
  description:
    "Юридические реквизиты ООО «Кирпичный завод Ковернино»: ИНН, ОГРН, адрес и контакты.",
};

export const NO_INDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
};

export const getProductSeo = (name: string, description?: string) => {
  const firstLine = description?.split("\n")[0]?.trim();
  const productDescription = firstLine
    ? `${name} — ${firstLine}. Купить с доставкой в Нижнем Новгороде, цена от производителя.`
    : `Купить ${name} с доставкой в Нижнем Новгороде и области. Цена от производителя — ${SITE_NAME}.`;

  return {
    title: `${name} | Купить в Нижнем Новгороде`,
    description: productDescription.slice(0, 160),
  };
};

export const createPageMetadata = (
  seo: { title: string; description: string },
  canonical?: string,
  imageAlt?: string,
  robots?: Metadata["robots"],
): Metadata => {
  const ogImage = {
    url: `${SITE_URL}/Logo-dark.svg`,
    ...OG_IMAGE,
    alt: imageAlt || SITE_NAME,
  };

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      ...(canonical && { url: canonical }),
      images: [ogImage],
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage.url],
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    ...(robots && { robots }),
  };
};
