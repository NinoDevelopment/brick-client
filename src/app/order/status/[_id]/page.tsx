"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { API_ORDER_ID } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { LINK_HOME } from "@/constants/links";
import { EPayment, IOrderFormId } from "@/types/order";
import { Container, Spinner } from "react-bootstrap";
import OrderStatusData from "@/components/order-status-page/OrderStatusData/OrderStatusData";
import BackLink from "@/ui/BackLink/BackLink";
import styles from "./page.module.css";
import PhoneEmailLinks from "@/ui/PhoneEmailLinks/PhoneEmailLinks";

const OrderStatusContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [interval, setInterval] = useState<false | number>(false);
  const orderId = typeof params._id === "string" ? params._id : "";
  const token = searchParams.get("token") ?? "";
  const canFetch = Boolean(orderId && token);
  const { data, load, error } = useFetch<IOrderFormId>(
    canFetch ? API_ORDER_ID(orderId, token) : "",
    REQUEST_METHODS.GET,
    {},
    interval,
    canFetch,
  );

  useEffect(() => {
    //если онлайн оплата не завершена то обновляем статус каждые 3 секунды
    if (data?.paymentType === EPayment.ONLINE && !data?.paid) {
      setInterval(3000);
    } else {
      setInterval(false);
    }
  }, [data?.paymentType, data?.paid]);

  if (load && !interval) return <Spinner />;

  if (!canFetch || error || !data)
    return (
      <Container className={styles.main}>
        <BackLink link={LINK_HOME} text={"На главную"} />
        <p>Заказ не найден</p>
      </Container>
    );

  return (
    <Container className={styles.main}>
      <BackLink link={LINK_HOME} text={"На главную"} />
      <OrderStatusData data={data} />
      <PhoneEmailLinks />
    </Container>
  );
};

const page = () => (
  <Suspense fallback={<Spinner />}>
    <OrderStatusContent />
  </Suspense>
);

export default page;
