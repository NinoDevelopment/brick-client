import {EShopsIds, IShopAddress} from "@/types/general";

export const APP_TITLE = "Ковернино | Кирпичный завод"

// минимальная цена заказа
export const MIN_ORDER_PRICE = 600;

// адреса магазинов
export const SHOPS_ADDRESSES: IShopAddress[] = [
	{
		id: EShopsIds.ITS_BREAD,
		address: 'пр. Циолковского д.78 (центральный рынок), пекарня «Это Хлеб»',
		city: 'г.Дзержинск',
		workTime: 'Ежедневно с 08:00-20:00',
		selected: false,
	},
	{
		id: EShopsIds.SHADE,
		address: 'Гайдара 51, кафе «Шадэ»',
		city: 'г.Дзержинск',
		workTime: 'Ежедневно с 11:00-23:00',
		selected: false,
	},
	{
		id: EShopsIds.PEKARNYA,
		address: 'Окская набережная 5а, «Пекарня»',
		city: 'г.Дзержинск',
		workTime: 'Ежедневно с 10:00-18:00',
		selected: false,
	},
];

// контакты
export const CONTACTS = {
	phone: {
		title: "+7 (905) 190-30-90",
		value: "+79051903090",
		valueWS: "79051903090",
	},
	email: {
		title: "eto.hleb365@gmail.com",
		value: "eto.hleb365@gmail.com",
	},
	tg: {
		nick: "batonetta"
	}
};
