import React from "react";
import styles from "./PromocodeList.module.css";
import { useGetPromocodes } from "@/hooks/usePromocodes";
import { Alert } from "react-bootstrap";
import PromocodeItem from "@/components/admin-page/PromocodeList/blocks/PromocodeItem/PromocodeItem";

const PromocodeList = () => {
  const { data } = useGetPromocodes();

  if (!data?.data?.length) {
    return <Alert variant={"info"}>Список промокодов пуст!</Alert>;
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Список промокодов ({data?.data?.length || "?"})</h1>
      </header>
      {data?.data?.map((elem) => <PromocodeItem key={elem?._id} data={elem} />)}
    </div>
  );
};

export default PromocodeList;
