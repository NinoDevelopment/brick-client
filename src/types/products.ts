export interface ISelectManyItem {
	title: string,
	value: number | string
}

export interface IProductPrice {
	weight: number,
	price: number,
}

export interface IProductImg {
	_id: string,
	images: string[],
}

export interface IProduct {
	name: string,
	description: string,
	categoryId: string,
	discount: number,
	prices: IProductPrice[],
	weights: ISelectManyItem[],
	composition: string,
	available: boolean,
	isRecommendation: boolean,
	show: boolean,
	onlyBread: boolean,
}

export interface IProductId extends IProduct {
	_id: string,
	_v: number,
}

export interface IProductIdWithImg extends IProductId {
	images: string[] | null | undefined,
}

export interface IProductWithImg extends IProduct {
	images: string[] | null | undefined,
}
