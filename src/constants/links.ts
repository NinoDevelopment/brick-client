export const LINK_HOME = "/";
export const LINK_CATALOG = "/catalog";
export const LINK_GALLERY = "/gallery";
export const LINK_SHOP_CART = "/shopCart";
export const LINK_ERROR = "/error";
export const LINK_ADMIN = "/admin";
export const LINK_ORDER = "/order";
export const LINK_ABOUT = "/about";
export const LINK_DELIVERY = "/delivery";
export const LINK_CONTACTS = "/contacts";
export const LINK_CALCULATOR = "/calculator";
export const LINK_ORDER_ID = (id:string) => `/order/status/${id}`;
export const LINK_PRODUCT = (id:string) => `/product/${id}`;
export const LINK_PRIVACY = '/privacyPolicy';
export const LINK_REQUISITES = '/requisites';
export const LINK_ISSUING_PAYMENT = '/issuingPayment';

export const LIST_LINKS = [
	{
		title: "О нас",
		link: LINK_ABOUT,
	},
	{
		title: "Магазин",
		link: LINK_CATALOG,
	},
	{
		title: "Калькулятор",
		link: LINK_CALCULATOR,
	},
	{
		title: "Галерея",
		link: LINK_GALLERY,
	},
	{
		title: "Оплата и доставка",
		link: LINK_DELIVERY,
	},
	{
		title: "Контакты",
		link: LINK_CONTACTS,
	},
];
