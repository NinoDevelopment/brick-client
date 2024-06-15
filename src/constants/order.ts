import { IShopCartItem } from "@/types/shopCart";
import {
  EDelivery,
  EPayment,
  IOrderForm,
  IOrderWithSchetForm,
} from "@/types/order";

export const ORDER_FORM_INITIAL = (
  positions: IShopCartItem[],
  paymentType: EPayment,
): IOrderForm => {
  return {
    phoneNumber: "",
    fullName: "",
    shopAddress: "",
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
    deliveryType: EDelivery.COURIER,
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
    shopAddress: "",
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
      bankName: "",
      correspondentAccount: "",
      bic: "",
      kpp: "",
      receiverAccount: "",
      inn: "",
    },
  };
};
