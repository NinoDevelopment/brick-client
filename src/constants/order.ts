import { IShopCartItem } from "@/types/shopCart";
import {
  EDelivery,
  EPayment,
  IOrderForm,
  IOrderWithSchetForm,
} from "@/types/order";
import { SHOPS_ADDRESSES } from "@/constants/general";

const DEFAULT_SHOP = SHOPS_ADDRESSES[0];

export const ORDER_FORM_INITIAL = (
  positions: IShopCartItem[],
  paymentType: EPayment,
): IOrderForm => {
  return {
    phoneNumber: "",
    fullName: "",
    shopAddress: DEFAULT_SHOP?.address ?? "",
    shopCity: DEFAULT_SHOP?.city ?? "",
    email: "",
    address: {
      address: "",
      addressName: "",
      city: "",
      flat: "",
      entrance: "",
      intercom: "",
      floor: 0,
      commentAddress: "",
    },
    positions: positions,
    comment: "",
    deliveryType: EDelivery.SELF,
    paymentType: paymentType,
    promocode: "",
  };
};

export const ORDER_FORM_SCHET_INITIAL = (
  positions: IShopCartItem[],
): IOrderWithSchetForm => {
  return {
    phoneNumber: "",
    fullName: "",
    shopAddress: DEFAULT_SHOP?.address ?? "",
    shopCity: DEFAULT_SHOP?.city ?? "",
    email: "",
    address: {
      address: "",
      addressName: "",
      city: "",
      flat: "",
      entrance: "",
      intercom: "",
      floor: 0,
      commentAddress: "",
    },
    positions: positions,
    comment: "",
    deliveryType: EDelivery.SELF,
    paymentType: EPayment.SCHET,
    promocode: "",
    schetInfo: {
      companyName: "",
      companyAddress: "",
      kpp: "",
      inn: "",
    },
  };
};
