import AboutPage from "@/pagesList/AboutPage/AboutPage";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
   title: 'О компании | Кирпичный завод Ковернино - Производство кирпича в Нижегородской области',
   description: 'Кирпичный завод Ковернино - надежный производитель кирпича в Нижегородской области. Мы предлагаем красный, керамический, облицовочный и строительный кирпич высокого качества. Узнайте больше о нашей компании, истории и преимуществах сотрудничества с нами.',
   keywords: [
      'кирпичный завод Ковернино',
      'купить кирпич в Нижнем Новгороде',
      'красный кирпич в Нижегородской области',
      'керамический кирпич с доставкой Нижний Новгород',
      'облицовочный кирпич в Арзамасе',
      'строительный кирпич в Балахне',
      'кирпич цена в Богородске',
      'кирпич с доставкой в Бор',
      'купить кирпич оптом Нижегородская область',
      'кирпич для строительства в Нижнем Новгороде',
   ],
   openGraph: {
      title: 'О компании | Кирпичный завод Ковернино - Производство кирпича в Нижегородской области',
      description: 'Кирпичный завод Ковернино - надежный производитель кирпича в Нижегородской области. Мы предлагаем красный, керамический, облицовочный и строительный кирпич высокого качества. Узнайте больше о нашей компании, истории и преимуществах сотрудничества с нами.',
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
      canonical: process.env.NEXT_PUBLIC_PROD_URL + '/about'
   }
};

const page = () => {
   return (
      <>
         <AboutPage />

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
                        name: 'О нас',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default page;
