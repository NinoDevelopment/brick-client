export interface ICategory {
	name: string,
	description: string,
	image: string,
	hasSale: boolean,
}

export interface ICategoryId extends ICategory {
	_id: string,
	_v: number,
}
