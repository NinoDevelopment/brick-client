import DeliveryCityPage from "@/pagesList/DeliveryCityPage/DeliveryCityPage";
import {
  DELIVERY_CITIES,
  getDeliveryCity,
  getDeliveryCitySeo,
} from "@/constants/deliveryCities";
import { createPageMetadata, SITE_URL } from "@/constants/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

interface IPage {
  params: { city: string };
}

export function generateStaticParams() {
  return DELIVERY_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: IPage): Promise<Metadata> {
  const city = getDeliveryCity(params.city);

  if (!city) {
    return {
      title: "Город не найден | Кирпичный завод Ковернино",
    };
  }

  return createPageMetadata(
    getDeliveryCitySeo(city),
    `${SITE_URL}/delivery/${city.slug}`,
    `Купить кирпич в ${city.namePrepositional}`,
  );
}

const Page = ({ params }: IPage) => {
  const city = getDeliveryCity(params.city);

  if (!city) {
    notFound();
  }

  return (
    <>
      <DeliveryCityPage city={city} />

      <Script
        id="breadcrumbs-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Оплата и доставка",
                item: `${SITE_URL}/delivery`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: city.name,
                item: `${SITE_URL}/delivery/${city.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default Page;
