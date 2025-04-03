import DeliveryPage from "@/pagesList/DeliveryPage/DeliveryPage";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
   title: 'Доставка и оплата | Купить кирпич с доставкой Нижний Новгород',
   description: 'Условия доставки и оплаты кирпича от Кирпичного завода Ковернино. Мы осуществляем доставку по Нижнему Новгороду, Арзамасу, Балахне, Богородску, Бору и всей Нижегородской области. Гибкие способы оплаты, доступные цены и оперативная доставка. Узнайте подробности на нашем сайте!',
   keywords: [
      'кирпич с доставкой нижний новгород',
      'кирпич оптом нижний новгород',
      'кирпич с бесплатной доставкой в дзержинске',
      'доставка кирпича нижний новгород',
      'кирпич с доставкой дзержинск',
      'кирпич оптом дзержинск',
      'купить отделочный кирпич нижний новгород',
      'кирпич с доставкой в Бор нижний новгород',
      'способы оплаты кирпича нижний новгород',
      'условия доставки кирпича нижний новгород',
   ],
   openGraph: {
      title: 'Доставка и оплата | Купить кирпич с доставкой Нижний Новгород',
      description: 'Условия доставки и оплаты кирпича от Кирпичного завода Ковернино. Мы осуществляем доставку по Нижнему Новгороду, Арзамасу, Балахне, Богородску, Бору и всей Нижегородской области. Гибкие способы оплаты, доступные цены и оперативная доставка. Узнайте подробности на нашем сайте!',
      images: [
         {
            url: process.env.NEXT_PUBLIC_PROD_URL + '/Logo-dark.svg',
            width: 252,
            height: 94,
            alt: 'Кирпичный завод Ковернино',
         },
      ],
      siteName: 'Кирпичный завод Ковернино',
      locale: 'ru_RU',
      type: 'website',
   },
   alternates: {
      canonical: process.env.NEXT_PUBLIC_PROD_URL + '/delivery'
   }
};

const Page = () => {
   return (
      <>
         <DeliveryPage />

         {/* JSON-LD: BreadcrumbList */}
         <Script
            id="breadcrumbs-ld"
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
                        name: 'Доставка и оплата',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default Page;
