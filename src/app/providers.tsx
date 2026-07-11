"use client";

import React from "react";
import Toast from "@/ui/Toast/Toast";
import { Provider } from "react-redux";
import store from "@/store/store";
import NavbarTop from "@/components/general/NavbarTop/NavbarTop";
import FooterBottom from "@/components/general/FooterBottom/FooterBottom";
import TestWebsiteAlert from "@/components/general/TestWebsiteAlert/TestWebsiteAlert";
import useScrollTop from "@/hooks/useScrollTop";
import { YMaps } from "@pbe/react-yandex-maps";

interface IProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
  useScrollTop();

  return (
    <Provider store={store}>
      <YMaps query={{ apikey: "f1423869-80d1-4c88-8150-8643fdf24b7b" }}>
        <Toast />
        {process.env.NEXT_PUBLIC_APP_TEST === "true" && <TestWebsiteAlert />}
        <NavbarTop />
        {children}
        <FooterBottom />
      </YMaps>
    </Provider>
  );
};

export default Providers;
