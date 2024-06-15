"use client";
import React from "react";
import styles from "./GalleryPage.module.css";
import PreviewBanner from "@/components/gallery-page/PreviewBanner/PreviewBanner";
import GalleryProjects from "@/components/gallery-page/GalleryProjects/GalleryProjects";

const GalleryPage = () => {
  return (
    <div className={styles.main}>
      <PreviewBanner />
      <GalleryProjects />
    </div>
  );
};

export default GalleryPage;
