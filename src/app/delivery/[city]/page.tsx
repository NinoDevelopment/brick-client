import DeliveryCityPage from "@/pagesList/DeliveryCityPage/DeliveryCityPage";
import {
  DELIVERY_CITIES,
  getDeliveryCity,
  getDeliveryCitySeo,
} from "@/constants/deliveryCities";
import { createPageMetadata, SITE_URL } from "@/constants/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { breadcrumbJsonLd } from "@/functions/jsonLd";
import { fetchProducts } from "@/functions/serverFetch";

export const revalidate = 60;

interface IPage {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return DELIVERY_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: IPage): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getDeliveryCity(citySlug);

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

const Page = async ({ params }: IPage) => {
  const { city: citySlug } = await params;
  const city = getDeliveryCity(citySlug);

  if (!city) {
    notFound();
  }

  const products =
    (await fetchProducts())
      ?.filter((product) => product.show)
      .slice(0, 3) ?? [];

  return (
    <>
      <DeliveryCityPage city={city} products={products} />

      <JsonLd
        id="breadcrumbs-ld"
        data={breadcrumbJsonLd([
          { name: "Главная", item: SITE_URL },
          { name: "Оплата и доставка", item: `${SITE_URL}/delivery` },
          {
            name: city.name,
            item: `${SITE_URL}/delivery/${city.slug}`,
          },
        ])}
      />
    </>
  );
};

export default Page;
