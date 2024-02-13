import React from "react";
import Providers from "@/app/providers";
import type {Metadata} from "next";
import {APP_TITLE} from "@/constants/general";

export const metadata: Metadata = {
    title: APP_TITLE,
    description:
        'Кирпичный завод Ковернино – место, где рождаются,' +
        'надежные и качественные кирпичи для вашего строительства.',
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
