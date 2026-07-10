import Script from "next/script";
import { SEO_DEFAULT, SITE_NAME } from "@/constants/seo";

const SITE_URL = process.env.NEXT_PUBLIC_PROD_URL;

const LdJsonScripts = () => {
  return (
    <>
      <Script
        id="web-site-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: SITE_URL,
            name: SITE_NAME,
            description: SEO_DEFAULT.description,
            inLanguage: "ru-RU",
          }),
        }}
      />

      <Script
        id="local-business-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: SITE_NAME,
            description:
              "Производство и продажа кирпича с доставкой в Нижний Новгород и Нижегородскую область.",
            url: SITE_URL,
            logo: `${SITE_URL}/Logo-dark.svg`,
            image: `${SITE_URL}/other/back-video.png`,
            telephone: "+7-921-509-24-09",
            email: "kzkvrn@yandex.ru",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ковернино",
              addressRegion: "Нижегородская область",
              addressCountry: "RU",
            },
            areaServed: [
              "Нижний Новгород",
              "Арзамас",
              "Балахна",
              "Богородск",
              "Бор",
              "Дзержинск",
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
          }),
        }}
      />
    </>
  );
};

export default LdJsonScripts;
