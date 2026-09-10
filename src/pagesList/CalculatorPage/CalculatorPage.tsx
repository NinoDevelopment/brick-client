import React from "react";
import PreviewBanner from "@/components/calculator/PreviewBanner/PreviewBanner";
import CalcWrapper from "@/components/calculator/CalcWrapper/CalcWrapper";
import CalcSeo from "@/components/calculator/CalcSeo/CalcSeo";
import { Container } from "react-bootstrap";

const CalculatorPage = () => {
  return (
    <div>
      <PreviewBanner />
      <CalcWrapper />
      <Container>
        <CalcSeo />
      </Container>
    </div>
  );
};

export default CalculatorPage;
