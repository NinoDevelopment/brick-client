import React from "react";
import { EDelivery, IOrderForm } from "@/types/order";
import { SHOPS_ADDRESSES } from "@/constants/general";
import formStyles from "@/ui/FormFields/FormFields.module.css";
import styles from "./DeliverySelect.module.css";

interface IDeliverySelect {
  formData: IOrderForm;
  setFormData: (data: IOrderForm) => void;
}

const DeliverySelect: React.FC<IDeliverySelect> = ({
  formData,
  setFormData,
}) => {
  const handleSelfPickup = () => {
    const firstShop = SHOPS_ADDRESSES[0];
    if (firstShop) {
      setFormData({
        ...formData,
        deliveryType: EDelivery.SELF,
        shopAddress: firstShop.address,
      });
    }
  };

  const handleCourierDelivery = () => {
    setFormData({
      ...formData,
      deliveryType: EDelivery.COURIER,
    });
  };

  return (
    <section className={formStyles.section}>
      <header className={formStyles.header}>
        <h2>Способ получения</h2>
        <p>Самовывоз со склада или доставка курьером</p>
      </header>

      <div className={styles.DeliverySelect}>
        <button
          type="button"
          disabled={formData.deliveryType === EDelivery.SELF}
          onClick={handleSelfPickup}
        >
          Самовывоз
        </button>

        <button
          type="button"
          disabled={formData.deliveryType === EDelivery.COURIER}
          onClick={handleCourierDelivery}
        >
          Доставка
        </button>
      </div>
    </section>
  );
};

export default DeliverySelect;
