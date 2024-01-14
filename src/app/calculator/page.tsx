import React from 'react';
import {Metadata} from "next";
import {META_CALC} from "@/constants/metadata";
import CalculatorPage from "@/pagesList/CalculatorPage/CalculatorPage";

export const metadata: Metadata = META_CALC;

const page = () => <CalculatorPage />;

export default page;