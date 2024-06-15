import { IShopCartItem } from "@/types/shopCart";

// тип доставки
export enum EDelivery {
  SELF = "SELF",
  COURIER = "COURIER",
}

// тип оплаты
export enum EPayment {
  CASH = "CASH",
  ONLINE = "ONLINE",
  SCHET = "SCHET",
}

// тип сортировки для заказов
export enum EOrderSorts {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  WAIT = "WAIT",
}

export interface IOrderAddress {
  address: string; // адрес
  addressName?: string; // название адреса
  city: string; // город
  flat?: string; // квартира
  entrance?: string; // подъезд
  intercom?: string; // домофон
  floor?: number; // этаж
  commentAddress?: string; // коммент к заказу
}

export interface IOrderForm {
  phoneNumber: string; // телефон
  email: string; // телефон
  fullName: string; // имя фамилия
  address: IOrderAddress; // объект адреса
  shopAddress?: string; // id магазина
  shopCity?: string; // адрес магазина
  positions: IShopCartItem[]; // товары массив
  comment?: string; // коммент ко всему заказу
  deliveryType: EDelivery; // тип доставки
  paymentType: EPayment; // тип оплаты
  promocode: string; // промокод
}

export interface IOrderWithSchetForm extends IOrderForm {
  schetInfo: ISchetInfo;
}

export interface ISchetInfo {
  companyName: string;
  companyAddress: string;
  bankName: string;
  bic: string;
  correspondentAccount: string;
  receiverAccount: string;
  inn: string;
  kpp: string;
}

export interface IOrderFormId extends IOrderForm {
  _id: string;
  _v: number;
  paid: boolean;
  completed: boolean;
  amount: number;
  createdAt: string;
}
