"use client";
import React, { type SubmitEvent, useEffect, useState } from "react";
import styles from "./OrderForm.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ORDER_FORM_INITIAL } from "@/constants/order";
import UserForm from "@/components/order-page/OrderForm/components/UserForm/UserForm";
import {
  EDelivery,
  EPayment,
  IOrderForm,
  IOrderWithSchetForm,
  ISchetInfo,
} from "@/types/order";
import { Form, Spinner } from "react-bootstrap";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import DeliverySelect from "@/components/order-page/OrderForm/components/DeliverySelect/DeliverySelect";
import AddressForm from "@/components/order-page/OrderForm/components/AddressForm/AddressForm";
import BankForm from "@/components/order-page/OrderForm/components/BankForm/BankForm";
import ShopAddress from "@/components/order-page/OrderForm/components/ShopAddress/ShopAddress";
import PaySelect from "@/components/order-page/OrderForm/components/PaySelect/PaySelect";
import OrderAmount from "@/components/order-page/OrderForm/components/OrderAmount/OrderAmount";
import { TOAST_ERROR } from "@/constants/toasts";
import { handleRequest } from "@/functions/handleRequest";
import { API_ORDER, API_ORDER_PLATI } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { LINK_ORDER_ID } from "@/constants/links";
import { clearShopCart } from "@/store/slices/shopCartSlice";
import PdConsentCheckbox from "@/components/general/PdConsentCheckbox/PdConsentCheckbox";

const emptySchetInfo = (): ISchetInfo => ({
  companyName: "",
  companyAddress: "",
  kpp: "",
  inn: "",
});

const buildOrderPayload = (formData: IOrderForm | IOrderWithSchetForm) => {
  const payload: Record<string, unknown> = {
    phoneNumber: formData.phoneNumber,
    fullName: formData.fullName,
    email: formData.email,
    deliveryType: formData.deliveryType,
    paymentType: formData.paymentType,
    positions: formData.positions.map(({ itemId, quantity, pack }) => ({
      itemId,
      quantity,
      pack,
    })),
  };

  if (formData.comment) {
    payload.comment = formData.comment;
  }

  if (formData.promocode) {
    payload.promocode = formData.promocode;
  }

  if (formData.deliveryType === EDelivery.SELF) {
    payload.shopAddress = formData.shopAddress;
    if (formData.shopCity) {
      payload.shopCity = formData.shopCity;
    }
  } else {
    payload.address = {
      address: formData.address.address,
      city: formData.address.city,
      ...(formData.address.addressName
        ? { addressName: formData.address.addressName }
        : {}),
      ...(formData.address.flat ? { flat: formData.address.flat } : {}),
      ...(formData.address.entrance
        ? { entrance: formData.address.entrance }
        : {}),
      ...(formData.address.intercom
        ? { intercom: formData.address.intercom }
        : {}),
      ...(typeof formData.address.floor === "number"
        ? { floor: formData.address.floor }
        : {}),
      ...(formData.address.commentAddress
        ? { commentAddress: formData.address.commentAddress }
        : {}),
    };
  }

  if (formData.paymentType === EPayment.SCHET) {
    const schetInfo =
      (formData as IOrderWithSchetForm).schetInfo ?? emptySchetInfo();
    payload.schetInfo = {
      companyName: schetInfo.companyName,
      companyAddress: schetInfo.companyAddress,
      inn: schetInfo.inn,
      ...(schetInfo.kpp ? { kpp: schetInfo.kpp } : {}),
    };
  }

  return payload;
};

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const shopCartData = useAppSelector((state) => state.shopCart.data);
  const [formData, setFormData] = useState<IOrderForm | IOrderWithSchetForm>(
    ORDER_FORM_INITIAL(shopCartData, EPayment.ONLINE),
  );
  const [load, setLoad] = useState<boolean>(false);
  const [promocode, setPromocode] = useState<string>("");
  const [pdConsent, setPdConsent] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, positions: shopCartData }));
  }, [shopCartData]);

  const handleSend = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.positions || !formData.positions.length) {
      TOAST_ERROR("Товары для заказа не выбраны!");
      return;
    }

    if (formData.deliveryType === EDelivery.SELF && !formData.shopAddress) {
      TOAST_ERROR("Выберите откуда будет совершен самовывоз!");
      return;
    }

    if (formData.deliveryType === EDelivery.COURIER) {
      if (!formData.address.city.trim() || !formData.address.address.trim()) {
        TOAST_ERROR("Укажите город и адрес доставки!");
        return;
      }
    }

    if (
      !formData.phoneNumber.match(
        /^\+?[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      )
    ) {
      TOAST_ERROR("Введите телефон в формате +7(XXX)XXX-XX-XX!");
      return;
    }

    if (formData.paymentType === EPayment.SCHET) {
      const schetInfo = (formData as IOrderWithSchetForm).schetInfo;
      if (!formData.email.trim()) {
        TOAST_ERROR("Для оплаты по счёту укажите email!");
        return;
      }
      if (
        !schetInfo?.companyName?.trim() ||
        !schetInfo?.companyAddress?.trim() ||
        !schetInfo?.inn?.trim()
      ) {
        TOAST_ERROR("Заполните реквизиты компании для выставления счёта!");
        return;
      }
      if (!/^\d{10}(\d{2})?$/.test(schetInfo.inn)) {
        TOAST_ERROR("ИНН должен содержать 10 или 12 цифр!");
        return;
      }
      if (schetInfo.inn.length === 10 && !/^\d{9}$/.test(schetInfo.kpp || "")) {
        TOAST_ERROR("Для ИНН юрлица укажите КПП из 9 цифр!");
        return;
      }
    }

    if (!pdConsent) {
      TOAST_ERROR("Подтвердите согласие на обработку персональных данных");
      return;
    }

    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER, buildOrderPayload(formData))
      .then((res) => {
        const orderId = res.data._id as string;
        const accessToken = res.data.accessToken as string | undefined;
        if (!orderId || !accessToken) {
          TOAST_ERROR(
            "Ошибка оформления заказа, пожалуйста попробуйте позже!",
          );
          return;
        }
        const statusUrl = LINK_ORDER_ID(orderId, accessToken);
        if (res.data.paymentType === EPayment.ONLINE) {
          handleRequest(REQUEST_METHODS.POST, API_ORDER_PLATI(orderId), {})
            .then((resInner) => {
              dispatch(clearShopCart());
              globalThis.open(resInner.data.confirmationURL, "_blank");
              globalThis.location.replace(statusUrl);
            })
            .catch(() =>
              TOAST_ERROR(
                "Ошибка оформления заказа, пожалуйста попробуйте позже!",
              ),
            );
        } else {
          dispatch(clearShopCart());
          globalThis.location.replace(statusUrl);
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        const detail = Array.isArray(message)
          ? message.join("; ")
          : typeof message === "string"
            ? message
            : "Ошибка оформления заказа, пожалуйста попробуйте позже!";
        console.error("Ошибка оформления заказа:", err?.response?.data ?? err);
        TOAST_ERROR(detail);
      })
      .finally(() => setLoad(false));
  };

  return (
    <Form className={styles.OrderForm} onSubmit={handleSend}>
      <div className={styles.orderFormData}>
        <UserForm formData={formData} setFormData={setFormData} />
        {formData.paymentType === EPayment.SCHET && (
          <BankForm
            formData={formData as IOrderWithSchetForm}
            setFormData={setFormData}
          />
        )}
        <DeliverySelect formData={formData} setFormData={setFormData} />
        {formData.deliveryType === EDelivery.COURIER && (
          <AddressForm formData={formData} setFormData={setFormData} />
        )}
        {formData.deliveryType === EDelivery.SELF && (
          <ShopAddress formData={formData} setFormData={setFormData} />
        )}
      </div>

      <aside className={styles.payment} aria-label="Оплата и оформление">
        <h3>Оплата</h3>
        <PaySelect formData={formData} setFormData={setFormData} />

        <div className={formStyles.field}>
          <label htmlFor="order-promocode">Промокод</label>
          <div className={styles.promocodeRow}>
            <input
              id="order-promocode"
              placeholder="Введите промокод"
              value={promocode}
              onChange={(e) => setPromocode(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, promocode });
                setPromocode("");
              }}
            >
              Применить
            </button>
          </div>
        </div>

        <OrderAmount shopCartData={shopCartData} formData={formData} />

        <div className={styles.consent}>
          <PdConsentCheckbox
            id="order-pd-consent"
            checked={pdConsent}
            onChange={setPdConsent}
          />
        </div>

        <button disabled={load} type="submit" className={formStyles.submit}>
          {load ? <Spinner size="sm" /> : "Оформить заказ"}
        </button>
        {formData.deliveryType === EDelivery.COURIER && (
          <p className={styles.noteTitle}>
            * Доставка рассчитывается и оплачивается отдельно
          </p>
        )}
      </aside>
    </Form>
  );
};

export default OrderForm;
