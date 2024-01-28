export interface IShopCartItem {
	itemId: string,
	price: number,
	quantity: number,
}

export interface IShopCartAmount {
	amount: number,
	discountedAmount: number,
	amountWithDelivery: number,
}
