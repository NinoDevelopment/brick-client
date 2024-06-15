import React from "react";
import styles from "./FooterBottom.module.css";
import { Container } from "react-bootstrap";
import FooterNav from "@/components/general/FooterBottom/components/FooterNav/FooterNav";
import FooterContent from "@/components/general/FooterBottom/components/FooterContent/FooterContent";

const FooterBottom = () => {
  return (
    <div className={styles.FooterBottom}>
      <Container>
        <FooterNav />
        <FooterContent />
      </Container>
    </div>
  );
};

export default FooterBottom;
