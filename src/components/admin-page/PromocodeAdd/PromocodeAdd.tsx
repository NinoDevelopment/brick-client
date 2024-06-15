import React, { FormEvent, useState } from "react";
import styles from "./PromocodeAdd.module.css";
import { Button, Form, FormControl, Spinner } from "react-bootstrap";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_ORDER, API_PROMOCODE } from "@/constants/api";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { useGetPromocodes } from "@/hooks/usePromocodes";

const PromocodeAdd = () => {
  const { updatePromocodes } = useGetPromocodes();
  const [load, setLoad] = useState<boolean>(false);
  const [value, setValue] = useState({
    code: "",
    skidka: 0,
  });

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    if (+value.skidka >= 100 || +value.skidka < 1) {
      TOAST_ERROR("Введите корректное значение скидки!");
      return;
    }

    setLoad(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER + API_PROMOCODE, value)
      .then((res) => {
        if (res?.data?.success) {
          TOAST_SUCCESS("Промокод успешно добавлен!");
          updatePromocodes();
        } else {
          TOAST_ERROR("Ошибка добавления промокода!");
        }
      })
      .catch((err) =>
        TOAST_ERROR(err?.message || "Ошибка добавления промокода!"),
      )
      .finally(() => {
        setLoad(false);
        setValue({
          code: "",
          skidka: 0,
        });
      });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Добавление промокода</h1>
      </header>

      <Form onSubmit={handleSend}>
        <FormControl
          value={value.code}
          onChange={(e) => setValue({ ...value, code: e.target.value })}
          placeholder={"Введите промокод"}
          required
        />
        <FormControl
          type={"number"}
          value={value.skidka || ""}
          onChange={(e) => setValue({ ...value, skidka: +e.target.value })}
          placeholder={"Введите скидку"}
          required
        />
        <Button type="submit" disabled={load}>
          {load ? <Spinner size={"sm"} /> : "Отправить"}
        </Button>
      </Form>
    </div>
  );
};

export default PromocodeAdd;
