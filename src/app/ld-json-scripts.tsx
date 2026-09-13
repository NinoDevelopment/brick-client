import JsonLd from "@/components/general/JsonLd/JsonLd";
import { OG_IMAGE, SEO_DEFAULT, SITE_NAME, SITE_URL } from "@/constants/seo";

const LdJsonScripts = () => {
  return (
    <>
      <JsonLd
        id="web-site-ld"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: SITE_URL,
          name: SITE_NAME,
          description: SEO_DEFAULT.description,
          inLanguage: "ru-RU",
        }}
      />

      <JsonLd
        id="local-business-ld"
        data={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Manufacturer"],
          name: SITE_NAME,
          description:
            "Производство и продажа кирпича с доставкой в Нижний Новгород и Нижегородскую область.",
          url: SITE_URL,
          logo: `${SITE_URL}/Logo-dark.svg`,
          image: OG_IMAGE.url,
          telephone: "+7-921-509-24-09",
          email: "kzkvrn@yandex.ru",
          address: {
            "@type": "PostalAddress",
            streetAddress: "деревня Черные",
            addressLocality: "Ковернино",
            addressRegion: "Нижегородская область",
            postalCode: "606570",
            addressCountry: "RU",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 57.147764,
            longitude: 43.803196,
          },
          openingHours: "Mo-Su 08:00-20:00",
          areaServed: [
            {
              "@type": "AdministrativeArea",
              name: "Нижегородская область",
            },
            { "@type": "City", name: "Нижний Новгород" },
            { "@type": "City", name: "Дзержинск" },
            { "@type": "City", name: "Арзамас" },
            { "@type": "City", name: "Саров" },
            { "@type": "City", name: "Бор" },
            { "@type": "City", name: "Кстово" },
            { "@type": "City", name: "Балахна" },
            { "@type": "City", name: "Богородск" },
            { "@type": "City", name: "Городец" },
            { "@type": "City", name: "Ковернино" },
          ],
          sameAs: [
            "https://api.whatsapp.com/send/?phone=79215092409&text&type=phone_number&app_absent=0",
            "https://t.me/kzkvrn",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+7-921-509-24-09",
            contactType: "sales",
            email: "kzkvrn@yandex.ru",
            areaServed: "RU",
            availableLanguage: "Russian",
          },
        }}
      />
    </>
  );
};

export default LdJsonScripts;
