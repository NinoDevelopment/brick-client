import React from "react";
import { IOrderForm } from "@/types/order";
import formStyles from "@/ui/FormFields/FormFields.module.css";

interface IAddressForm {
  formData: IOrderForm;
  setFormData: (data: IOrderForm) => void;
}

const AddressForm: React.FC<IAddressForm> = ({ formData, setFormData }) => {
  return (
    <section className={formStyles.section}>
      <header className={formStyles.header}>
        <h2>Адрес доставки</h2>
        <p>Куда привезти заказ</p>
      </header>

      <div className={formStyles.form}>
        <div className={formStyles.field}>
          <label htmlFor="order-city">Область, город*</label>
          <input
            id="order-city"
            required
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
            placeholder="Нижегородская область, г. Нижний Новгород"
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-address">Адрес*</label>
          <input
            id="order-address"
            required
            value={formData.address.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, address: e.target.value },
              })
            }
            placeholder="Улица, дом, квартира"
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="order-address-comment">Комментарий к адресу</label>
          <textarea
            id="order-address-comment"
            rows={4}
            value={formData.address.commentAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  commentAddress: e.target.value,
                },
              })
            }
            placeholder="Подъезд, этаж, домофон — необязательно"
          />
        </div>
      </div>
    </section>
  );
};

export default AddressForm;
