"use client";
import React, { useEffect, useState } from "react";
import CategoriesAdd from "@/components/admin-page/CategoriesAdd/CategoriesAdd";
import ProductAdd from "@/components/admin-page/ProductAdd/ProductAdd";
import CategoriesList from "@/components/admin-page/CategoriesList/CategoriesList";
import ProductsList from "@/components/admin-page/ProductsList/ProductsList";
import OrdersList from "@/components/admin-page/OrdersList/OrdersList";
import { useFetch } from "@/hooks/useFetch";
import { API_ADMIN_AUTH, API_ADMIN_LOGOUT } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { useRouter } from "next/navigation";
import { LINK_ADMIN_AUTH } from "@/constants/links";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import styles from "./page.module.css";
import GalleryAdd from "@/components/admin-page/GalleryAdd/GalleryAdd";
import GalleryList from "@/components/admin-page/GalleryList/GalleryList";
import PromocodeAdd from "@/components/admin-page/PromocodeAdd/PromocodeAdd";
import PromocodeList from "@/components/admin-page/PromocodeList/PromocodeList";
import AdminShell, {
  ADMIN_TABS,
  type AdminTabId,
} from "@/components/admin-page/AdminShell/AdminShell";
import { handleRequest } from "@/functions/handleRequest";

const TAB_STORAGE_KEY = "admin-tab";

const isAdminTab = (value: string | null): value is AdminTabId =>
  ADMIN_TABS.some((tab) => tab.id === value);

const clearAdminSession = () =>
  handleRequest(REQUEST_METHODS.POST, API_ADMIN_LOGOUT, {}).catch(() => undefined);

const Page = () => {
  const router = useRouter();
  const { data, error, load } = useFetch<boolean>(
    API_ADMIN_AUTH,
    REQUEST_METHODS.POST,
    {},
  );
  const [tab, setTab] = useState<AdminTabId>("orders");

  useEffect(() => {
    const saved = sessionStorage.getItem(TAB_STORAGE_KEY);
    if (isAdminTab(saved)) setTab(saved);
  }, []);

  useEffect(() => {
    if (!error) return;
    void clearAdminSession().finally(() => {
      router.replace(LINK_ADMIN_AUTH);
    });
  }, [error, router]);

  const handleTab = (id: AdminTabId) => {
    setTab(id);
    sessionStorage.setItem(TAB_STORAGE_KEY, id);
  };

  const handleLogout = () => {
    void clearAdminSession().finally(() => {
      router.replace(LINK_ADMIN_AUTH);
    });
  };

  if (error || load) {
    return (
      <div className={styles.spinnerContainer}>
        <SpinnerPrimary />
      </div>
    );
  }

  if (!data) return null;

  return (
    <AdminShell active={tab} onChange={handleTab} onLogout={handleLogout}>
      {tab === "orders" && <OrdersList />}
      {tab === "categories" && (
        <>
          <CategoriesAdd />
          <CategoriesList />
        </>
      )}
      {tab === "products" && (
        <>
          <ProductAdd />
          <ProductsList />
        </>
      )}
      {tab === "gallery" && (
        <>
          <GalleryAdd />
          <GalleryList />
        </>
      )}
      {tab === "promocodes" && (
        <>
          <PromocodeAdd />
          <PromocodeList />
        </>
      )}
    </AdminShell>
  );
};

export default Page;
