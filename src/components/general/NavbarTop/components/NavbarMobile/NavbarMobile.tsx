import React from 'react';
import styles from "./NavbarMobile.module.css";
import {Offcanvas} from "react-bootstrap";
import {APP_TITLE} from "@/constants/general";
import {LINK_PRIVACY, LINK_REQUISITES, LIST_LINKS} from "@/constants/links";
import {useRouter} from "next/navigation";

interface INavbarMobile {
	show: boolean,
	handleClose: () => void,
}

const NavbarMobile: React.FC<INavbarMobile> = ({ show, handleClose }) => {

	const router = useRouter()

	const handleLink = (event:any, link:string) => {
		event.preventDefault();
		router.push(link);
		handleClose();
	}

	return (
		<Offcanvas
			className={styles.NavbarMobile}
			show={show}
			onHide={handleClose}
			placement={"end"}
		>
			<Offcanvas.Header>
				<img
					src={"/Logo.svg"}
					className={styles.logo}
					alt={APP_TITLE}
				/>

				<img
					onClick={handleClose}
					className={styles.openMenu}
					src={"/icons/menu.svg"}
					alt={APP_TITLE}
				/>
			</Offcanvas.Header>

			<Offcanvas.Body className={styles.body}>
				<nav>
					{
						LIST_LINKS.map(elem => (
							<a key={elem.title} onClick={e => handleLink(e, elem.link)}>
								{elem.title}
							</a>
						))
					}
				</nav>

				<footer>
					<a onClick={e => handleLink(e, LINK_REQUISITES)}>Реквизиты и юр. информация</a>
					<a onClick={e => handleLink(e, LINK_PRIVACY)}>Политика конфиденциальности</a>
				</footer>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default NavbarMobile;
