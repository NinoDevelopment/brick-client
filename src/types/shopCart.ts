export interface IShopCartItem {
	itemId: string,
	weight: number,
	price: number,
	quantity: number,
}

export interface IShopCartAmount {
	amount: number,
	discountedAmount: number,
	amountWithDelivery: number,
}
