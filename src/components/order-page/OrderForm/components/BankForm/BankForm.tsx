import React, { Dispatch, SetStateAction, useState } from "react";
import { FormGroup, Spinner } from "react-bootstrap";
import { IOrderWithSchetForm } from "@/types/order";
import styles from "./BankForm.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { API_ORDER_LOOKUP_INN } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { TOAST_ERROR } from "@/constants/toasts";

interface IBankForm {
  formData: IOrderWithSchetForm;
  setFormData: Dispatch<SetStateAction<IOrderWithSchetForm>>;
}

const BankForm: React.FC<IBankForm> = ({ formData, setFormData }) => {
  const [inn, setINN] = useState("");
  const [innLoading, setInnLoading] = useState(false);

  const fetchCompanyByInn = (query: string) => {
    setInnLoading(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER_LOOKUP_INN, { inn: query })
      .then((res) => {
        const { kpp, companyName, companyAddress } = res.data;
        setFormData((prev) => ({
          ...prev,
          schetInfo: {
            ...prev.schetInfo,
            kpp,
            companyName,
            companyAddress,
            inn: query,
          },
        }));
      })
      .catch(() => TOAST_ERROR("Не удалось найти компанию по ИНН"))
      .finally(() => setInnLoading(false));
  };

  const handleINNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.replace(/\D/g, "");
    setINN(query);

    if (query.length === 10 || query.length === 12) {
      fetchCompanyByInn(query);
    }
  };

  return (
    <div className={styles.BankForm}>
      <header>
        <h2>Реквизиты компании</h2>
      </header>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          inputMode="numeric"
          placeholder={"ИНН*"}
          value={inn}
          onChange={handleINNChange}
        />
        {innLoading && <Spinner size="sm" className="ms-2" />}
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={"КПП*"}
          value={formData.schetInfo?.kpp}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: { ...formData.schetInfo, kpp: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={"Компания*"}
          value={formData.schetInfo?.companyName}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: { ...formData.schetInfo, companyName: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={"Юр адрес компании*"}
          value={formData.schetInfo?.companyAddress}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: {
                ...formData.schetInfo,
                companyAddress: e.target.value,
              },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          placeholder={"Полное наименование банка (необязательно)"}
          value={formData.schetInfo?.bankName}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: { ...formData.schetInfo, bankName: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          placeholder={"БИК (необязательно)"}
          value={formData.schetInfo?.bic}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: { ...formData.schetInfo, bic: e.target.value },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          placeholder={"Корреспондентский счёт (необязательно)"}
          value={formData.schetInfo?.correspondentAccount}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: {
                ...formData.schetInfo,
                correspondentAccount: e.target.value,
              },
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          placeholder={"Номер счёта получателя (необязательно)"}
          value={formData.schetInfo?.receiverAccount}
          onChange={(e) =>
            setFormData({
              ...formData,
              schetInfo: {
                ...formData.schetInfo,
                receiverAccount: e.target.value,
              },
            })
          }
        />
      </FormGroup>
    </div>
  );
};

export default BankForm;
