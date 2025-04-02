import Providers from '@/app/providers';
import type { Metadata } from 'next';
import Script from 'next/script';
import LdJsonScripts from "@/app/ld-json-scripts";

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
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_PROD_URL
  }
};

interface IRootLayout {
  children: React.ReactNode;
}

const icons = [
  {
    rel: 'icon',
    url: `/favicon.svg`,
  },
  {
    rel: 'apple-touch-icon',
    url: `/favicon.svg`,
  },
];

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html lang='ru'>
      <head>
        <meta
          name='google-site-verification'
          content='1cv20c0Qox29yvRsFToKnq3SxEG8gxiD7DR_jHy0NBs'
        />
        <meta name='yandex-verification' content='f3553b2fcd8eadae' />

        <LdJsonScripts />
      </head>
      {icons.map((icon) => (
         <link key={icon.rel} rel={icon.rel} href={icon.url} sizes="any" />
      ))}
      <body>
        <Providers>{children}</Providers>

        <Script id='yabdex-metrika' type='text/javascript'>
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(97580805, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true
            });`}
        </Script>

        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/97580805'
              style={{ position: 'absolute', left: '-9999px' }}
              alt=''
            />
          </div>
        </noscript>
      </body>
    </html>
  );
};

export default RootLayout;
