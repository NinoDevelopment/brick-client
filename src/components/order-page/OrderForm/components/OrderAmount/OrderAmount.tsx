import React, { useEffect, useState } from "react";
import { IShopCartAmount, IShopCartItem } from "@/types/shopCart";
import { API_ORDER_AMOUNT } from "@/constants/api";
import { EDelivery, IOrderForm } from "@/types/order";
import { REQUEST_METHODS } from "@/types/general";
import { MIN_ORDER_PRICE } from "@/constants/general";
import styles from "./OrderAmount.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { TOAST_ERROR } from "@/constants/toasts";

interface IOrderAmount {
  shopCartData: IShopCartItem[];
  formData: IOrderForm;
}

const OrderAmount: React.FC<IOrderAmount> = ({ shopCartData, formData }) => {
  //count for all product
  const totalPalletsCount = shopCartData.reduce(
    (count, item) => count + Math.ceil(item.quantity / item.pack),
    0,
  );
  const [amountData, setAmountData] = useState<null | IShopCartAmount>(null);

  useEffect(() => {
    handleRequest(REQUEST_METHODS.POST, API_ORDER_AMOUNT, {
      positions: shopCartData,
      promocode: formData.promocode,
    })
      .then((res) => setAmountData(res?.data || null))
      .catch(() => TOAST_ERROR("Ошибка получения данных для оплаты!"));
  }, [formData?.promocode, formData.positions]);

  if (amountData && amountData.amountWithDelivery) {
    return (
      <div className={styles.OrderAmount}>
        <div className={styles.block}>
          <p>{totalPalletsCount?.toFixed()} паллет(а)</p>
          <b>{(amountData?.amount).toFixed(1)}₽</b>
        </div>

        {formData.deliveryType === EDelivery.COURIER && (
          <>
            <div className={styles.block}>
              <p>Доставка*</p>
              <b>
                {amountData.amountWithDelivery - amountData.discountedAmount}₽
              </b>
            </div>

            <div
              hidden={!(MIN_ORDER_PRICE > amountData.amount)}
              className={styles.alertDelivery}
            >
              <h5>
                <span>Бесплатная</span> доставка при заказе от {MIN_ORDER_PRICE}
                ₽
              </h5>
              <p className={"small"}>
                Добавьте товаров на {MIN_ORDER_PRICE - amountData.amount + "₽"},
                чтобы воспользоваться акцией
              </p>
            </div>
          </>
        )}

        <div className={styles.block + " " + styles.border}>
          <p>Скидка</p>
          <b>
            {(amountData.amount - amountData.discountedAmount)?.toFixed(1)}₽
          </b>
        </div>

        <div className={styles.block + " " + styles.itog}>
          <h5>Итого к оплате:</h5>
          <h5>
            {formData.deliveryType === EDelivery.COURIER
              ? amountData?.amountWithDelivery?.toFixed(1)
              : amountData?.discountedAmount?.toFixed(1)}
            ₽
          </h5>
        </div>
      </div>
    );
  }
};

export default OrderAmount;
