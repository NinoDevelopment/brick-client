import React from 'react';
import {Modal, Spinner} from "react-bootstrap";
import styles from "./ModalConfirm.module.css";

interface IModalConfirm {
	show: boolean,
	title: string,
	handleClose: () => void,
	handleConfirm: () => void,
	load: boolean,
}

const ModalConfirm: React.FC<IModalConfirm> = ({ show, handleClose, title, handleConfirm, load }) => {
	return (
		<Modal className={styles.ModalConfirm} show={show} onHide={handleClose}>
			<Modal.Body className={styles.modalBody}>
				<div className={styles.content}>
					<h3>Подтвердите действие</h3>
					<p>Вы действительно хотите <b>{title}</b>?</p>
				</div>

				<footer>
					<button className={styles.agree} onClick={handleConfirm}>
						{load ? <Spinner size={"sm"} /> : 'Подтвердить'}
					</button>
					<button onClick={handleClose}>
						Отмена
					</button>
				</footer>
			</Modal.Body>
		</Modal>
	);
};

export default ModalConfirm;
