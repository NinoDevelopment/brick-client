import {EShopsIds, IShopAddress} from "@/types/general";

export const APP_TITLE = "Ковернино | Кирпичный завод"
//@ts-ignore
export const BRICK_PACK: number = +process.env.NEXT_PUBLIC_PACK_BRICK_AMOUNT || 400;

// минимальная цена заказа
export const MIN_ORDER_PRICE = 600;

// адреса магазинов
export const SHOPS_ADDRESSES: IShopAddress[] = [
	{
		id: EShopsIds.ITS_BREAD,
		address: 'Завод «Ковернино» | Самовывоз',
		city: 'г.Нижний Новгород',
		workTime: 'Ежедневно с 08:00-20:00',
		selected: false,
	},
];

// контакты
export const CONTACTS = {
	phone: {
		title: "+7 (831) 469-83-83",
		value: "+78314698383",
		valueWS: "78314698383",
	},
	email: {
		title: "eto.hleb365@gmail.com",
		value: "eto.hleb365@gmail.com",
	},
	tg: {
		nick: "batonetta"
	}
};
