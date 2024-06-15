"use client";
import React from "react";
import PreviewBanner from "@/components/calculator/PreviewBanner/PreviewBanner";
import CalcWrapper from "@/components/calculator/CalcWrapper/CalcWrapper";

const CalculatorPage = () => {
  return (
    <div>
      <PreviewBanner />
      <CalcWrapper />
    </div>
  );
};

export default CalculatorPage;
