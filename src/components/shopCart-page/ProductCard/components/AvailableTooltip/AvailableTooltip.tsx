import React, {useRef, useState} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import Link from "next/link";
import {LINK_DELIVERY} from "@/constants/links";
import {APP_TITLE} from "@/constants/general";
import styles from "./AvailableTooltip.module.css";


const AvailableTooltip = ({ available } : { available: boolean }) => {

	// tooltip
	const [show, setShow] = useState(false);
	const target = useRef(null);

	return (
		<>
			<p
				className={styles.available}
				hidden={available}
				ref={target}
				onClick={() => setShow(!show)}
			>
				Предзаказ
				<img src="/icons/info.svg" alt={APP_TITLE}/>
			</p>

			<Overlay
				rootClose={true}
				onHide={() => setShow(false)}
				target={target.current}
				show={show}
				placement="top"
			>
				<Tooltip className={styles.tooltip}>
					Этот товар доступен только для предзаказа <br/>
					<Link href={LINK_DELIVERY}>Подробнее</Link>
				</Tooltip>
			</Overlay>
		</>
	);
};

export default AvailableTooltip;
