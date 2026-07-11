import React, { Dispatch, SetStateAction, useState } from "react";
import { Spinner } from "react-bootstrap";
import { IOrderForm, IOrderWithSchetForm } from "@/types/order";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import { handleRequest } from "@/functions/handleRequest";
import { API_ORDER_LOOKUP_INN } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import { TOAST_ERROR } from "@/constants/toasts";

interface IBankForm {
  formData: IOrderWithSchetForm;
  setFormData: Dispatch<SetStateAction<IOrderForm | IOrderWithSchetForm>>;
}

const BankForm: React.FC<IBankForm> = ({ formData, setFormData }) => {
  const [inn, setINN] = useState(formData.schetInfo?.inn ?? "");
  const [innLoading, setInnLoading] = useState(false);

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

  return (
    <section className={formStyles.section}>
      <header className={formStyles.header}>
        <h2>Данные плательщика</h2>
        <p>Укажите реквизиты вашей организации для выставления счёта</p>
      </header>

      <div className={formStyles.form}>
        <div className={formStyles.row}>
          <div className={formStyles.field}>
            <label htmlFor="order-inn">ИНН*</label>
            <div className={formStyles.inputRow}>
              <input
                id="order-inn"
                required
                inputMode="numeric"
                placeholder="10 или 12 цифр"
                value={inn}
                onChange={handleINNChange}
              />
              {innLoading && <Spinner size="sm" />}
            </div>
          </div>

          <div className={formStyles.field}>
            <label htmlFor="order-kpp">
              {inn.length === 12 ? "КПП" : "КПП*"}
            </label>
            <input
              id="order-kpp"
              required={inn.length === 10}
              inputMode="numeric"
              placeholder={inn.length === 12 ? "Не требуется для ИП" : "9 цифр"}
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
          </div>
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-company">Название организации*</label>
          <input
            id="order-company"
            required
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
            placeholder="ООО «Компания»"
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-company-address">Юр. адрес*</label>
          <input
            id="order-company-address"
            required
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
            placeholder="Город, улица, дом"
          />
        </div>
      </div>
    </section>
  );
};

export default BankForm;
