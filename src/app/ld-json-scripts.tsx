import { metadata } from './layout';
import Script from "next/script";

const LdJsonScripts = () => {
  return (
    <>
      {/* JSON-LD: WebSite */}
      <Script
        id="web-site-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: process.env.NEXT_PUBLIC_PROD_URL,
            name: metadata.title,
            description: metadata.description,
            mainEntity: [
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}`,
                name: 'Главная страница',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/catalog`,
                name: 'Каталог кирпича',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/contacts`,
                name: 'Контакты',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
                name: 'Оплата и доставка',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
                name: 'О нас',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/shopCart`,
                name: 'Корзина',
              },
              {
                '@type': 'SiteNavigationElement',
                target: `${process.env.NEXT_PUBLIC_PROD_URL}/calculator`,
                name: 'Калькулятор кирпича',
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Organization */}
      <Script
         id="org-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: metadata.title,
            description: metadata.description,
            url: process.env.NEXT_PUBLIC_PROD_URL,
            logo: `${process.env.NEXT_PUBLIC_PROD_URL}/favicon.ico`,
            sameAs: [
              'kzkvrn@yandex.ru',
              'https://api.whatsapp.com/send/?phone=79215092409&text&type=phone_number&app_absent=0',
              'https://t.me/kzkvrn',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '14',
              bestRating: '5',
              worstRating: '1',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+7-921-509-24-09',
              contactType: 'customer support',
              email: 'kzkvrn@yandex.ru',
              areaServed: 'RU',
              availableLanguage: 'Russian',
            },
            keywords: [
              'купить кирпич Нижний Новгород',
              'доставка кирпич Нижний Новгород',
              'кирпич от производителя Нижний Новгород',
              'кирпич низкие цены Нижний Новгород',
            ].join(', '),
          }),
        }}
      />
    </>
  );
};

export default LdJsonScripts;
