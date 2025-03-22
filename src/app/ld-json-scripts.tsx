import { metadata } from './layout';

const LdJsonScripts = () => {
  return (
    <>
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: process.env.NEXT_PUBLIC_PROD_URL,
            name: metadata.title,
            description: metadata.description,
            potentialAction: [
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/catalog`,
                name: 'Просмотреть каталог',
              },
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/contacts`,
                name: 'Просмотреть контакты',
              },
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
                name: 'Узнать про оплату и доставку',
              },
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
                name: 'Узнать о нас',
              },
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/shopCart`,
                name: 'Перейти в корзину',
              },
              {
                '@type': 'ViewAction',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/calculator`,
                name: 'Калькулятор кирпича',
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Кирпичный завод Ковернино',
            url: process.env.NEXT_PUBLIC_PROD_URL,
            logo: `${process.env.NEXT_PUBLIC_PROD_URL}/favicon.ico`,
            sameAs: [
              'kzkvrn@yandex.ru',
              'https://api.whatsapp.com/send/?phone=79215092409&text&type=phone_number&app_absent=0',
              'https://t.me/kzkvrn',
            ],
          }),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: process.env.NEXT_PUBLIC_PROD_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Каталог',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/catalog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'О нас',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Контакты',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/contacts`,
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Оплата и доставка',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Калькулятор',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/calculator`,
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Корзина',
                item: `${process.env.NEXT_PUBLIC_PROD_URL}/shopCart`,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default LdJsonScripts;
