import React from "react";
import Providers from "@/app/providers";
import type { Metadata } from "next";
import { APP_TITLE } from "@/constants/general";

export const metadata: Metadata = {
  title: APP_TITLE,
  description:
    "Кирпичный завод Ковернино – место, где производятся," +
    "надежные и качественные кирпичи для вашего строительства.",
  icons: {
    icon: "/favicon.ico",
  },
};

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IRootLayout) => {
  return (
    <html lang="ru">
      <head>
        <meta
          name="google-site-verification"
          content="1cv20c0Qox29yvRsFToKnq3SxEG8gxiD7DR_jHy0NBs"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
