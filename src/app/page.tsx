import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Купить кирпич в Нижегородской области | Кирпичный завод Ковернино',
   description: 'Купить кирпич в Нижегородской области от Кирпичного завода Ковернино. Широкий ассортимент: красный кирпич, керамический кирпич, облицовочный кирпич и строительный кирпич по выгодным ценам. Доставка кирпича в Нижний Новгород, Арзамас, Балахну, Дзержинск, Бор и другие города Нижегородской области. Высокое качество продукции, доступные цены и оперативная доставка. Закажите кирпич прямо сейчас!',
   keywords: [
      'купить кирпич в Нижнем Новгороде',
      'красный кирпич в Нижегородской области',
      'керамический кирпич с доставкой Нижний Новгород',
      'облицовочный кирпич в Арзамасе',
      'строительный кирпич в Балахне',
      'кирпич цена в Богородске',
      'кирпич с доставкой в Бор',
      'кирпичный завод Ковернино',
      'купить кирпич оптом Нижегородская область',
      'кирпич для строительства в Нижнем Новгороде',
   ],
   openGraph: {
      title: 'Купить кирпич в Нижегородской области | Кирпичный завод Ковернино',
      description: 'Купить кирпич в Нижегородской области от Кирпичного завода Ковернино. Широкий ассортимент: красный кирпич, керамический кирпич, облицовочный кирпич и строительный кирпич по выгодным ценам. Доставка кирпича в Нижний Новгород, Арзамас, Балахну, Богородск, Бор и другие города Нижегородской области.',
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
