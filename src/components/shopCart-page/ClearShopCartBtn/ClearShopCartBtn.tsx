import React, {useState} from 'react';
import {useAppDispatch} from "@/store/store";
import {clearShopCart} from "@/store/slices/shopCartSlice";
import ModalConfirm from "@/ui/ModalConfirm/ModalConfirm";
import {TOAST_SUCCESS} from "@/constants/toasts";
import styles from "./ClearShopCartBtn.module.css";


const ClearShopCartBtn = () => {

	const [show, setShow] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const handleClear = () => {
		dispatch(clearShopCart());
		TOAST_SUCCESS("Корзина очищена!");
	}

	return (
		<>
			<button className={styles.clearBtn} onClick={() => setShow(true)}>
				Очистить корзину
			</button>

			<ModalConfirm
				show={show}
				title={"Очистить корзину"}
				handleClose={() => setShow(false)}
				handleConfirm={handleClear}
				load={false}
			/>
		</>
	);
};

export default ClearShopCartBtn;
