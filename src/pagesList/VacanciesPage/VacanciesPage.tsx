'use client'
import React from 'react';
import Preview from "@/components/vacancies-page/Preview/Preview";
import VacanciesList from "@/components/vacancies-page/VacanciesList/VacanciesList";

const VacanciesPage = () => {
	return (
		<>
			<Preview />
			<VacanciesList />
		</>
	);
};

export default VacanciesPage;
