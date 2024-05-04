import React from 'react';
import {EDelivery, IOrderForm} from "@/types/order";
import {SHOPS_ADDRESSES} from "@/constants/general";
import styles from "./DeliverySelect.module.css";

interface IDeliverySelect {
    formData: IOrderForm,
    setFormData: (data:IOrderForm) => void,
}

const DeliverySelect: React.FC<IDeliverySelect> = ({ formData, setFormData }) => {

    const handleSelfPickup = () => {
        const firstShop = SHOPS_ADDRESSES[0];
        if (firstShop) {
            setFormData({
                ...formData,
                deliveryType: EDelivery.SELF,
                shopAddress: firstShop.address
            });
        }
    };

    const handleCourierDelivery = () => {
        setFormData({
            ...formData,
            deliveryType: EDelivery.COURIER
        });
    };

    return (
        <div className={styles.DeliverySelect}>
            <button
                disabled={formData.deliveryType === EDelivery.SELF}
                onClick={handleSelfPickup}
            >
                Самовывоз
            </button>

            <button
                disabled={formData.deliveryType === EDelivery.COURIER}
                onClick={handleCourierDelivery}
            >
                Доставка
            </button>
        </div>
    );
};

export default DeliverySelect;