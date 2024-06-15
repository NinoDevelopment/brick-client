"use client";
import React from "react";
import { Container } from "react-bootstrap";
import styles from "./AboutPage.module.css";
import PreviewBanner from "@/components/about-page/PreviewBanner/PreviewBanner";
import ExperienceBlock from "@/components/about-page/ExperienceBlock/ExperienceBlock";
import ControlBlock from "@/components/about-page/ControlBlock/ControlBlock";
import ExclusiveBlock from "@/components/about-page/ExclusiveBlock/ExclusiveBlock";

const AboutPage = () => {
  return (
    <div className={styles.main}>
      <PreviewBanner />
      <Container>
        <ExperienceBlock />
      </Container>
      <ControlBlock />
      <Container>
        <ExclusiveBlock />
      </Container>
    </div>
  );
};

export default AboutPage;
