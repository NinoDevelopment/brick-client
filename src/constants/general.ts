import { EShopsIds, IShopAddress } from "@/types/general";

export const APP_TITLE = "Ковернино | Кирпичный завод";

// минимальная цена заказа
export const MIN_ORDER_PRICE = 600;

// адреса магазинов
export const SHOPS_ADDRESSES: IShopAddress[] = [
  {
    id: EShopsIds.ITS_BREAD,
    address: "Завод «Ковернино»",
    city: "Нижегородская область, Ковернинский район, деревня Черные",
    workTime: "Ежедневно с 08:00-20:00",
    selected: true,
  },
];

// контакты
export const CONTACTS = {
  phone: {
    title: "+7 (921) 509-24-09",
    value: "+79215092409",
    valueWS: "79215092409",
  },
  email: {
    title: "kzkvrn@yandex.ru",
    value: "kzkvrn@yandex.ru",
  },
  tg: {
    nick: "kzkvrn",
  },
};
