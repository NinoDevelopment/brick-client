"use client";

import React from "react";
import Toast from "@/ui/Toast/Toast";
import { Provider } from "react-redux";
import store from "@/store/store";
import NavbarTop from "@/components/general/NavbarTop/NavbarTop";
import FooterBottom from "@/components/general/FooterBottom/FooterBottom";
import TestWebsiteAlert from "@/components/general/TestWebsiteAlert/TestWebsiteAlert";
import CookieBanner from "@/components/general/CookieBanner/CookieBanner";
import YandexMetrika from "@/components/general/YandexMetrika/YandexMetrika";
import useScrollTop from "@/hooks/useScrollTop";

interface IProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
  useScrollTop();

  return (
    <Provider store={store}>
      <Toast />
      {process.env.NEXT_PUBLIC_APP_TEST === "true" && <TestWebsiteAlert />}
      <NavbarTop />
      {children}
      <FooterBottom />
      <CookieBanner />
      <YandexMetrika />
    </Provider>
  );
};

export default Providers;
