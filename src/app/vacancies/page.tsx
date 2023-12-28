import React from 'react';
import VacanciesPage from "@/pagesList/VacanciesPage/VacanciesPage";
import {Metadata} from "next";
import {META_VACANCIES} from "@/constants/metadata";

export const metadata: Metadata = META_VACANCIES;

const page = () => <VacanciesPage />;

export default page;
