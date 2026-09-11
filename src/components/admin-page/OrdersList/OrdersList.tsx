import React, { useState } from "react";
import styles from "./OrdersList.module.css";
import { useGetOrders } from "@/hooks/useGetOrders";
import { Button } from "react-bootstrap";
import OrderCard from "@/components/admin-page/OrdersList/components/OrderCard/OrderCard";
import { EOrderSorts } from "@/types/order";

const OrdersList = () => {
  //list orders
  const { data, updateOrders } = useGetOrders();

  const [sort, setSort] = useState(EOrderSorts.WAIT);

  // return sorted products
  const getSortedItems = () => {
    if (!data?.orders?.length) return null;
    if (sort === EOrderSorts.ALL) return data.orders;
    if (sort === EOrderSorts.WAIT)
      return data.orders.filter((elem) => !elem.completed);
    if (sort === EOrderSorts.COMPLETED)
      return data.orders.filter((elem) => elem.completed);
  };

  return (
    <div className={styles.OrdersList}>
      <div className={styles.header}>
        <h2>
          Заказы ({data.loading ? "Обновление..." : data.orders.length})
        </h2>

        <Button
          variant={"dark"}
          onClick={updateOrders}
          disabled={!!data.loading}
        >
          Обновить заказы
        </Button>
      </div>

      <div className={styles.sortsContainer}>
        <button
          type="button"
          disabled={sort === EOrderSorts.WAIT}
          onClick={() => setSort(EOrderSorts.WAIT)}
        >
          В работе
        </button>
        <button
          type="button"
          disabled={sort === EOrderSorts.COMPLETED}
          onClick={() => setSort(EOrderSorts.COMPLETED)}
        >
          Завершённые
        </button>
        <button
          type="button"
          disabled={sort === EOrderSorts.ALL}
          onClick={() => setSort(EOrderSorts.ALL)}
        >
          Все
        </button>
      </div>

      {/*LIST ORDERS*/}
      <div
        hidden={!getSortedItems() || !getSortedItems()?.length}
        className={styles.content}
      >
        {getSortedItems() &&
          getSortedItems()?.map((elem) => (
            <OrderCard key={elem._id} data={elem} />
          ))}
      </div>

      {
        // смотрим не пустой ли массив в категории
        (!getSortedItems() || !getSortedItems()?.length) && (
          <p className={styles.noOrders}>
            В этом списке пока нет заказов
          </p>
        )
      }
    </div>
  );
};

export default OrdersList;
