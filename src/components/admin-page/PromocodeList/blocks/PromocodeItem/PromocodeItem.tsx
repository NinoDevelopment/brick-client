import React, { useState } from "react";
import styles from "./PromocodeItem.module.css";
import { Button, ListGroup } from "react-bootstrap";
import { IPromocode, REQUEST_METHODS } from "@/types/general";
import ModalConfirm from "@/ui/ModalConfirm/ModalConfirm";
import { handleRequest } from "@/functions/handleRequest";
import { API_ORDER, API_PROMOCODE } from "@/constants/api";
import { useGetPromocodes } from "@/hooks/usePromocodes";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";

interface IProps {
  data: IPromocode;
}

const PromocodeItem = ({ data }: IProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [load, setLoad] = useState<boolean>(false);
  const { updatePromocodes } = useGetPromocodes();

  const handleDelete = () => {
    setLoad(true);
    handleRequest(
      REQUEST_METHODS.DELETE,
      API_ORDER + API_PROMOCODE + "/" + data.code,
      {},
    )
      .then((res) => {
        if (res.data.success) {
          updatePromocodes();
          TOAST_SUCCESS("Промокод успешно удален!");
        } else {
          TOAST_ERROR("Ошибка удаления промокода!");
        }
      })
      .catch(() => TOAST_ERROR("Ошибка удаления промокода!"))
      .finally(() => setLoad(false));
  };

  return (
    <ListGroup className={styles.wrapper}>
      <ListGroup.Item>Код - {data.code}</ListGroup.Item>
      <ListGroup.Item>Скидка - {data.skidka}%</ListGroup.Item>
      <ListGroup.Item>
        <Button
          size={"sm"}
          variant={"danger"}
          onClick={() => setDeleteOpen(true)}
        >
          Удалить
        </Button>
      </ListGroup.Item>

      <ModalConfirm
        show={deleteOpen}
        title={"Подтвердите действие"}
        handleClose={() => setDeleteOpen(false)}
        handleConfirm={handleDelete}
        load={load}
      />
    </ListGroup>
  );
};

export default PromocodeItem;
