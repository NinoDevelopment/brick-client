import React from 'react';
import Providers from '@/app/providers';
import type { Metadata } from 'next';
import { APP_TITLE } from '@/constants/general';
import Script from 'next/script';

export const metadata: Metadata = {
  title: APP_TITLE,
  description:
    'Кирпичный завод Ковернино предлагает купить качественные кирпичи в Нижнем Новгороде и Нижегородской области. У нас вы найдете красный керамический и облицовочный кирпич напрямую от производителя для строительства и ремонта.',
  icons: {
    icon: '/favicon.ico',
  },
};

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html lang='ru'>
      <head>
        <meta
          name='google-site-verification'
          content='1cv20c0Qox29yvRsFToKnq3SxEG8gxiD7DR_jHy0NBs'
        />
        <meta name='yandex-verification' content='f3553b2fcd8eadae' />
      </head>
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
