"use client";
//css
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//other
import React from "react";
import Toast from "@/ui/Toast/Toast";
import { Provider } from "react-redux";
import store, { persistedStore } from "@/store/store";
import NavbarTop from "@/components/general/NavbarTop/NavbarTop";
import { PersistGate } from "redux-persist/integration/react";
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
      <PersistGate persistor={persistedStore}>
        <YMaps query={{ apikey: "f1423869-80d1-4c88-8150-8643fdf24b7b" }}>
          <h1 hidden>
            Купить кирпич Нижний Новогород красный кирпич, красный керамический
            кирпич, облицовочный кирпич, рядовой кирпич, 1 NF кирпич, 1.4 NF
            кирпич, 2.1 NF кирпич Нижний Новгород, Нижегородская область,
            Арзамас, Выкса, Дзержинск, Решетиха
          </h1>
          <h1 hidden>Завод Ковернино - купить кирпич в Нижнем Новгороде</h1>
          <h3 hidden>
            красный кирпич, красный керамический кирпич, облицовочный кирпич,
            рядовой кирпич, 1 NF кирпич, 1.4 NF кирпич, 2.1 NF кирпич Нижний
            Новгород
          </h3>
          <p hidden>
            Кирпич от производителя по лучшим ценам в Нижнем Новгороде
          </p>
          <p hidden>Кирпич Ковернино завод Нижегородская область</p>
          <p hidden>
            Кирпич от производителя по лучшим ценам Нижегородская область
          </p>
          <Toast />
          {process.env.NEXT_PUBLIC_APP_TEST === "true" && <TestWebsiteAlert />}
          <NavbarTop />
          {children}
          <FooterBottom />
        </YMaps>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
