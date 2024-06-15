import React from "react";
import styles from "./ShopCartBtn.module.css";
import { IProductId } from "@/types/products";
import { useDispatch } from "react-redux";
import { IShopCartItem } from "@/types/shopCart";
import { addItem, removeItem } from "@/store/slices/shopCartSlice";

interface IShopCartBtn {
  shopCartData: IShopCartItem[];
  product: IProductId;
}

const ShopCartBtn: React.FC<IShopCartBtn> = ({ shopCartData, product }) => {
  const dispatch = useDispatch();

  const thisItem = shopCartData.find((item) => item.itemId === product._id);

  const shopCartObject: IShopCartItem = {
    itemId: product._id,
    quantity: thisItem?.quantity || product.pack,
    price: product.price,
    pack: product.pack,
  };

  const handleAdd = () => dispatch(addItem(shopCartObject));

  const handleRemove = () => dispatch(removeItem(shopCartObject));

  if (thisItem) {
    return (
      <div className={styles.ShopCartBtnActive}>
        <div>
          <button type="button" onClick={handleRemove}>
            -
          </button>

          <button disabled>{thisItem.quantity / thisItem.pack}</button>

          <button type="button" onClick={handleAdd}>
            +
          </button>
        </div>
        <div className={styles.QuantityInfo}>
          <h6>
            Всего <span>{thisItem.quantity}</span> шт
          </h6>
        </div>
      </div>
    );
  }

  return (
    <button className={styles.ShopCartBtn} type="button" onClick={handleAdd}>
      В корзину
    </button>
  );
};

export default ShopCartBtn;
