export interface IVacancy {
	name: string,
	description: string,
	salary: number,
	additionalInfo?: string,
	show: boolean,
}

export interface IVacancyId extends IVacancy{
	_id: string,
}
