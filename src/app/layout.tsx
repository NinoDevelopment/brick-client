import React from "react";
import Providers from "@/app/providers";
import type {Metadata} from "next";
import {APP_TITLE} from "@/constants/general";

export const metadata: Metadata = {
    title: APP_TITLE,
    description:
        'Это Хлеб – место, где рождаются и заказываются торты,' +
        'пироги, хлеб и прочие вкусности. Это сочетание всего ' +
        'самого вкусного, познавательного и развлекательного. ' +
        'Лучшая пекарня в Дзержинске, которая соблюдает традиции.',
    icons: {
        icon: '/favicon.ico',
    },
}

interface IRootLayout {
  children: React.ReactNode,
}

const RootLayout = ({children}:IRootLayout) => {
  return (
      <html lang="ru">
          <body>
              <Providers>
                  {children}
              </Providers>
          </body>
      </html>
  )
}

export default RootLayout;
