export enum REQUEST_METHODS {
	PUT = "PUT",
	POST = "POST",
	DELETE = "DELETE",
	GET = "GET",
}

export enum EShopsIds {
	"ITS_BREAD" = "ITS_BREAD",
	"SHADE" = "SHADE",
	"PEKARNYA" = "PEKARNYA",
}

export interface IShopAddress {
	id: EShopsIds,
	address: string,
	city: string,
	workTime: string,
	selected: boolean,
}

export enum ESort {
	NOT_AVAILABLE = 'NOT_AVAILABLE',
	DEFAULT = 'DEFAULT',
	AVAILABLE = 'AVAILABLE',
}
