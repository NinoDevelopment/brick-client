import React from "react";
import styles from "./PromocodeList.module.css";
import { useGetPromocodes } from "@/hooks/usePromocodes";
import PromocodeItem from "@/components/admin-page/PromocodeList/blocks/PromocodeItem/PromocodeItem";

const PromocodeList = () => {
  const { data } = useGetPromocodes();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2>Промокоды ({data?.data?.length || 0})</h2>
      </header>
      {!data?.data?.length ? (
        <p className={styles.empty}>Промокодов пока нет</p>
      ) : (
        <div className={styles.list}>
          {data.data.map((elem) => (
            <PromocodeItem key={elem?._id} data={elem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromocodeList;
