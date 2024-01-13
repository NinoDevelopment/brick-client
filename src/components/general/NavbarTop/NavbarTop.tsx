import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Link from "next/link";
import {LINK_ABOUT, LINK_CONTACTS, LINK_DELIVERY, LINK_HOME, LIST_LINKS} from "@/constants/links";
import styles from "./NavbarTop.module.css";
import ShopCartLink from "@/components/general/NavbarTop/components/ShopCartLink/ShopCartLink";
import {usePathname} from "next/navigation";
import {APP_TITLE} from "@/constants/general";
import NavbarMobile from "@/components/general/NavbarTop/components/NavbarMobile/NavbarMobile";

const NavbarTop = () => {

	const path = usePathname();
	const [showMobile, setShowMobile] = useState<boolean>(false);

	const darkClass = () => {
		if (path === LINK_ABOUT || path === '/' || path === LINK_DELIVERY || path === LINK_CONTACTS) return '';
		return styles.dark;
	}

	return (
		<Navbar sticky={"top"} className={`${styles.NavbarTop} ${darkClass()}`}>
			<Container className={styles.container}>
				<Link href={LINK_HOME} className={styles.logo}>
					<img src={darkClass() ? "/Logo-dark.svg" : "/Logo.svg"} alt={APP_TITLE} />
				</Link>

				<div className={styles.right}>
					<Nav className={styles.linksContainer}>
						{
							LIST_LINKS.map(elem => (
								<Link
									key={elem.title}
									href={elem.link}
									className={path === elem.link ? styles.active : ""}
								>
									{elem.title}
								</Link>
							))
						}
					</Nav>

					<ShopCartLink />

					<img
						onClick={() => setShowMobile(!showMobile)}
						className={styles.openMenu}
						src={"/icons/menu.svg"}
						alt={APP_TITLE}
					/>
				</div>
			</Container>

			{/*mobile menu*/}
			<NavbarMobile show={showMobile} handleClose={() => setShowMobile(false)} />
		</Navbar>
	);
};

export default NavbarTop;
