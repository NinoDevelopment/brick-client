import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Купить кирпич с доставкой в Нижнем Новгороде | Кирпичный завод Ковернино',
   description: 'Кирпич с доставкой от производителя в Нижнем Новгороде. Большой выбор: красный, керамический, облицовочный и строительный кирпич по выгодным ценам. Доставка кирпича в Нижний Новгород, Арзамас, Балахну, Дзержинск, Бор и другие города Нижегородской области. Закажите кирпич прямо сейчас!',
   keywords: [
      'купить кирпич в Нижнем Новгороде',
      'красный кирпич Нижний Новгород',
      'керамический кирпич с доставкой Нижний Новгород',
      'облицовочный кирпич Нижний Новгород',
      'строительный кирпич Нижний Новгород',
      'кирпич цена Нижний Новгород',
      'кирпич с доставкой Нижний Новгород',
      'кирпичный завод Ковернино',
      'купить кирпич оптом Нижний Новгород',
      'кирпич для строительства в Нижнем Новгороде',
   ],
   openGraph: {
      title: 'Купить кирпич с доставкой | Нижний Новгород | Кирпичный завод Ковернино',
      description: 'Кирпич с доставкой от производителя в Нижнем Новгороде. Большой выбор: красный, керамический, облицовочный и строительный кирпич по выгодным ценам. Доставка кирпича в Нижний Новгород, Арзамас, Балахну, Дзержинск, Бор и другие города Нижегородской области. Закажите кирпич прямо сейчас!',
      images: [
         {
            url: process.env.NEXT_PUBLIC_PROD_URL + '/Logo-dark.svg',
            width: 252,
            height: 94,
            alt: 'Кирпич с доставкой от производителя в Нижнем Новгороде',
         },
      ],
      siteName: 'Кирпич с доставкой от производителя в Нижнем Новгороде | Корвернино',
      locale: 'ru_RU',
      type: 'website',
   },
   icons: [
      '/favicon.svg'
   ]
};

const Home = () => {
  return (
    <main>
      <PreviewBanner />
      <AboutCompany />
      <CalcBanner />
      <ProductTypes />
      <GalleryBanner />
    </main>
  );
};

export default Home;
