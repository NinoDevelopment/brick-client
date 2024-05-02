export interface IProductImg {
	_id: string,
	images: string[],
}

export interface IProduct {
	name: string,
	description: string,
	categoryId: string,
	discount: number,
	pack: number,
	price: number,
	available: boolean,
	isRecommendation: boolean,
	show: boolean,
	color: string,
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
