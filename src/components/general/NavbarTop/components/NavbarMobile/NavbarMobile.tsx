import React from "react";
import styles from "./NavbarMobile.module.css";
import { Offcanvas } from "react-bootstrap";
import { SITE_NAME } from "@/constants/seo";
import { LINK_HOME, LIST_LINKS } from "@/constants/links";
import { useRouter } from "next/navigation";

interface INavbarMobile {
  show: boolean;
  handleClose: () => void;
  scrolled: boolean;
}

const NavbarMobile: React.FC<INavbarMobile> = ({
  show,
  handleClose,
  scrolled,
}) => {
  const router = useRouter();

  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    event.preventDefault();
    router.push(link);
    handleClose();
  };

  return (
    <Offcanvas
      className={`${styles.NavbarMobile} ${scrolled ? styles.scrolled : ""}`}
      show={show}
      onHide={handleClose}
      placement={"end"}
    >
      <Offcanvas.Header>
        <img src={"/Logo.svg"} className={styles.logo} alt={SITE_NAME} />

        <img
          onClick={handleClose}
          className={styles.openMenu}
          src={"/icons/x.svg"}
          alt="Закрыть меню"
        />
      </Offcanvas.Header>

      <Offcanvas.Body className={styles.body}>
        <nav>
          <a href={LINK_HOME} onClick={(e) => handleLink(e, LINK_HOME)}>
            Главная
          </a>
          {LIST_LINKS.map((elem) => (
            <a
              href={elem.link}
              key={elem.title}
              onClick={(e) => handleLink(e, elem.link)}
            >
              {elem.title}
            </a>
          ))}
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NavbarMobile;
