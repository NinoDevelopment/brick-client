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
		title: "+7 (999) 071-14-41",
		value: "+79990711441",
		valueWS: "79990711441",
	},
	email: {
		title: "kzk@gmail.com",
		value: "kzk@gmail.com",
	},
	tg: {
		nick: "leshakuzz"
	}
};
