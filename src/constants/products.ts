import {IProductWithImg} from "@/types/products";

export const ITEM_INITIAL: IProductWithImg = {
	name: '',
	description: '',
	categoryId: '',
	images: [],
	discount: 0,
	price: 0,
	available: true,
	isRecommendation: false,
	show: true,
};