"use client";
import styles from "./page.module.css";
import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";

const Home = () => {
  return (
    <main className={styles.main}>
      <PreviewBanner />
      <AboutCompany />
      <CalcBanner />
      <ProductTypes />
      <GalleryBanner />
    </main>
  );
};

export default Home;
