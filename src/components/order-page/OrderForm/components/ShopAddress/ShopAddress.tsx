import React from "react";
import { IOrderForm } from "@/types/order";
import { SHOPS_ADDRESSES } from "@/constants/general";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import styles from "./ShopAddress.module.css";

interface IShopAddress {
  formData: IOrderForm;
  setFormData: (data: IOrderForm) => void;
}

const ShopAddress: React.FC<IShopAddress> = ({ formData, setFormData }) => {
  return (
    <section className={formStyles.section}>
      <header className={formStyles.header}>
        <h2>Пункт самовывоза</h2>
        <p>Выберите склад, откуда заберёте заказ</p>
      </header>

      <div className={styles.ShopAddress}>
        {SHOPS_ADDRESSES.map((elem) => (
          <button
            type="button"
            disabled={elem.address === formData.shopAddress}
            key={elem.address}
            onClick={() =>
              setFormData({
                ...formData,
                shopAddress: elem.address,
                shopCity: elem.city,
              })
            }
          >
            <h4>{elem.address}</h4>
            <p>{elem.city}</p>

            <footer>
              <b>{elem.workTime}</b>
              <span hidden={elem.address !== formData.shopAddress}>Выбрано</span>
            </footer>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ShopAddress;
