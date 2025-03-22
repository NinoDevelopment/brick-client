import Providers from '@/app/providers';
import type { Metadata } from 'next';
import Script from 'next/script';
import LdJsonScripts from "@/app/ld-json-scripts";

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
  icons: [
     '/favicon.svg'
  ]
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
