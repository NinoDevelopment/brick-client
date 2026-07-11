import React, { Dispatch, SetStateAction, useState } from "react";
import { FormGroup, Spinner } from "react-bootstrap";
import { IOrderForm, IOrderWithSchetForm } from "@/types/order";
import styles from "./BankForm.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { API_ORDER_LOOKUP_BIC, API_ORDER_LOOKUP_INN } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { TOAST_ERROR } from "@/constants/toasts";

interface IBankForm {
  formData: IOrderWithSchetForm;
  setFormData: Dispatch<SetStateAction<IOrderForm | IOrderWithSchetForm>>;
}

const BankForm: React.FC<IBankForm> = ({ formData, setFormData }) => {
  const [inn, setINN] = useState(formData.schetInfo?.inn ?? "");
  const [bic, setBic] = useState(formData.schetInfo?.bic ?? "");
  const [innLoading, setInnLoading] = useState(false);
  const [bicLoading, setBicLoading] = useState(false);

  const fetchCompanyByInn = (query: string) => {
    setInnLoading(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER_LOOKUP_INN, { inn: query })
      .then((res) => {
        const { kpp, companyName, companyAddress } = res.data;
        setFormData((prev) => {
          const current = prev as IOrderWithSchetForm;
          return {
            ...current,
            schetInfo: {
              ...current.schetInfo,
              kpp,
              companyName,
              companyAddress,
              inn: query,
            },
          };
        });
      })
      .catch(() => TOAST_ERROR("Не удалось найти компанию по ИНН"))
      .finally(() => setInnLoading(false));
  };

  const fetchBankByBic = (query: string) => {
    setBicLoading(true);
    handleRequest(REQUEST_METHODS.POST, API_ORDER_LOOKUP_BIC, { bic: query })
      .then((res) => {
        const { bankName, correspondentAccount } = res.data;
        setFormData((prev) => {
          const current = prev as IOrderWithSchetForm;
          return {
            ...current,
            schetInfo: {
              ...current.schetInfo,
              bic: query,
              bankName,
              correspondentAccount,
            },
          };
        });
      })
      .catch(() => TOAST_ERROR("Не удалось найти банк по БИК"))
      .finally(() => setBicLoading(false));
  };

  const handleINNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.replace(/\D/g, "");
    setINN(query);
    setFormData((prev) => {
      const current = prev as IOrderWithSchetForm;
      return {
        ...current,
        schetInfo: { ...current.schetInfo, inn: query },
      };
    });

    if (query.length === 10 || query.length === 12) {
      fetchCompanyByInn(query);
    }
  };

  const handleBicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.replace(/\D/g, "").slice(0, 9);
    setBic(query);
    setFormData((prev) => {
      const current = prev as IOrderWithSchetForm;
      return {
        ...current,
        schetInfo: { ...current.schetInfo, bic: query },
      };
    });

    if (query.length === 9) {
      fetchBankByBic(query);
    }
  };

  const handleAccountChange = (
    field: "correspondentAccount" | "receiverAccount",
    value: string,
  ) => {
    const digits = value.replace(/\D/g, "").slice(0, 20);
    setFormData((prev) => {
      const current = prev as IOrderWithSchetForm;
      return {
        ...current,
        schetInfo: { ...current.schetInfo, [field]: digits },
      };
    });
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
          required={inn.length === 10}
          inputMode="numeric"
          placeholder={inn.length === 12 ? "КПП (не требуется для ИП)" : "КПП*"}
          value={formData.schetInfo?.kpp}
          onChange={(e) =>
            setFormData((prev) => {
              const current = prev as IOrderWithSchetForm;
              return {
                ...current,
                schetInfo: {
                  ...current.schetInfo,
                  kpp: e.target.value.replace(/\D/g, "").slice(0, 9),
                },
              };
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
            setFormData((prev) => {
              const current = prev as IOrderWithSchetForm;
              return {
                ...current,
                schetInfo: {
                  ...current.schetInfo,
                  companyName: e.target.value,
                },
              };
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={"Юр. адрес компании*"}
          value={formData.schetInfo?.companyAddress}
          onChange={(e) =>
            setFormData((prev) => {
              const current = prev as IOrderWithSchetForm;
              return {
                ...current,
                schetInfo: {
                  ...current.schetInfo,
                  companyAddress: e.target.value,
                },
              };
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          inputMode="numeric"
          placeholder={"БИК*"}
          value={bic}
          onChange={handleBicChange}
        />
        {bicLoading && <Spinner size="sm" className="ms-2" />}
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          placeholder={"Полное наименование банка*"}
          value={formData.schetInfo?.bankName}
          onChange={(e) =>
            setFormData((prev) => {
              const current = prev as IOrderWithSchetForm;
              return {
                ...current,
                schetInfo: {
                  ...current.schetInfo,
                  bankName: e.target.value,
                },
              };
            })
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          inputMode="numeric"
          placeholder={"Корреспондентский счёт*"}
          value={formData.schetInfo?.correspondentAccount}
          onChange={(e) =>
            handleAccountChange("correspondentAccount", e.target.value)
          }
        />
      </FormGroup>

      <FormGroup className={styles.block + " " + styles.w100}>
        <input
          required
          inputMode="numeric"
          placeholder={"Расчётный счёт получателя*"}
          value={formData.schetInfo?.receiverAccount}
          onChange={(e) => handleAccountChange("receiverAccount", e.target.value)}
        />
      </FormGroup>
    </div>
  );
};

export default BankForm;
