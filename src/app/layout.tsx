import Providers from '@/app/providers';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Nunito_Sans, Playfair_Display } from 'next/font/google';
import LdJsonScripts from "@/app/ld-json-scripts";
import { createPageMetadata, SEO_DEFAULT, SITE_URL } from '@/constants/seo';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata(SEO_DEFAULT),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

interface IRootLayout {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html
      lang='ru'
      data-scroll-behavior='smooth'
      className={`${nunitoSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <meta
          name='google-site-verification'
          content='1cv20c0Qox29yvRsFToKnq3SxEG8gxiD7DR_jHy0NBs'
        />
        <meta name='yandex-verification' content='f3553b2fcd8eadae' />

        <LdJsonScripts />
      </head>
      <body className={nunitoSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
