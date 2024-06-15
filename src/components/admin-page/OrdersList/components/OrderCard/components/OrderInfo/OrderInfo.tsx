import React from "react";
import { EDelivery, EPayment, IOrderFormId } from "@/types/order";
import styles from "./OrderInfo.module.css";
import { convertDateTime } from "@/functions/convertDateTime";
import { Table } from "react-bootstrap";

interface IOrderInfo {
  data: IOrderFormId;
}

const OrderInfo: React.FC<IOrderInfo> = ({ data }) => {
  return (
    <div className={styles.OrderInfo}>
      <h5 className={"m-0"}>Информация о заказе:</h5>

      <Table bordered>
        <tbody>
          <tr>
            <td>Дата:</td>
            <td>{convertDateTime(data.createdAt)}</td>
          </tr>
          <tr>
            <td>Сумма:</td>
            <td>{data.amount}₽</td>
          </tr>
          <tr>
            <td>Доставка:</td>
            <td>
              {data.deliveryType === EDelivery.SELF ? "Самовывоз" : "Курьер"}
            </td>
          </tr>
          <tr hidden={data.deliveryType !== EDelivery.SELF}>
            <td>Пункт выдачи:</td>
            <td>{data.shopAddress}</td>
          </tr>
          <tr>
            <td>Тип оплаты:</td>
            <td>
              {data.paymentType === EPayment.ONLINE
                ? "Картой онлайн"
                : data.paymentType === EPayment.SCHET
                  ? "Оплата по счету"
                  : "При получении"}
            </td>
          </tr>
          <tr>
            <td>Статус заказа:</td>
            <td>{data.completed ? "Завершен" : "Не завершен"}</td>
          </tr>
        </tbody>
      </Table>

      <h5 className={"m-0"}>Информация о покупателе:</h5>

      <Table bordered>
        <tbody>
          <tr>
            <td>Имя:</td>
            <td>{data.fullName}</td>
          </tr>
          <tr>
            <td>Телефон:</td>
            <td>{data.phoneNumber}</td>
          </tr>
          <tr>
            <td>Комментарий:</td>
            <td>{data.comment || "-"}</td>
          </tr>
        </tbody>
      </Table>

      <h5 hidden={data.deliveryType !== EDelivery.COURIER} className={"m-0"}>
        Адрес покупателя:
      </h5>

      <Table bordered hidden={data.deliveryType !== EDelivery.COURIER}>
        <tbody>
          <tr>
            <td>Город:</td>
            <td>{data?.address?.city}</td>
          </tr>
          <tr>
            <td>Адрес:</td>
            <td>{data?.address?.address || "-"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderInfo;
