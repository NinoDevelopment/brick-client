import React from 'react';
import styles from "./NavbarMobile.module.css";
import {Offcanvas} from "react-bootstrap";
import {APP_TITLE} from "@/constants/general";
import {LIST_LINKS} from "@/constants/links";
import {useRouter} from "next/navigation";

interface INavbarMobile {
	show: boolean,
	handleClose: () => void,
	scrolled: boolean
}

const NavbarMobile: React.FC<INavbarMobile> = ({ show, handleClose, scrolled }) => {
	const router = useRouter()

	const handleLink = (event:any, link:string) => {
		event.preventDefault();
		router.push(link);
		handleClose();
	}

	return (
		<Offcanvas
			className={`${styles.NavbarMobile} ${scrolled ? styles.scrolled : ''}`}
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
					src={"/icons/x.svg"}
					alt={APP_TITLE}
				/>
			</Offcanvas.Header>

			<Offcanvas.Body className={styles.body}>
				<nav>
					<a onClick={e => handleLink(e, '/')}>
						Главная
					</a>
					{
						LIST_LINKS.map(elem => (
							<a key={elem.title} onClick={e => handleLink(e, elem.link)}>
								{elem.title}
							</a>
						))
					}
				</nav>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default NavbarMobile;
