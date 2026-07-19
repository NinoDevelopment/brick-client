import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import {
  LINK_ABOUT,
  LINK_CALCULATOR,
  LINK_CATALOG,
  LINK_CONTACTS,
  LINK_DELIVERY,
  LINK_GALLERY,
  LINK_HOME,
  LIST_LINKS,
} from "@/constants/links";
import styles from "./NavbarTop.module.css";
import ShopCartLink from "@/components/general/NavbarTop/components/ShopCartLink/ShopCartLink";
import { usePathname } from "next/navigation";
import NavbarMobile from "@/components/general/NavbarTop/components/NavbarMobile/NavbarMobile";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/constants/seo";

const isHeroPage = (path: string) => {
  if (
    path === LINK_HOME ||
    path === LINK_ABOUT ||
    path === LINK_CALCULATOR ||
    path === LINK_CATALOG ||
    path === LINK_CONTACTS ||
    path === LINK_GALLERY
  ) {
    return true;
  }

  if (path === LINK_DELIVERY || path.startsWith(`${LINK_DELIVERY}/`)) {
    return true;
  }

  return false;
};

const NavbarTop = () => {
  const path = usePathname();
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const hero = isHeroPage(path);
  const light = !hero;

  useEffect(() => {
    const handleScroll = () => {
      const scrollThresholdPercent = 0.2;
      const scrollThreshold = window.innerHeight * scrollThresholdPercent;

      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [path]);

  const showDarkAssets = light;
  const showScrolled = scrolled && hero;

  return (
    <>
      <Script type="application/ld+json" id="navigation-meta">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SiteNavigationElement",
          name: "Основное меню",
          description: "Навигация по сайту Кирпичного завода Ковернино",
          url: SITE_URL,
          significantLinks: LIST_LINKS.map((link) => ({
            "@type": "SiteNavigationElement",
            name: link.title,
            url: `${SITE_URL}${link.link}`,
          })),
        })}
      </Script>

      <Navbar
        role="navigation"
        aria-label="Основное меню"
        sticky={"top"}
        className={`${styles.NavbarTop} ${light ? styles.light : ""} ${showScrolled ? styles.scrolled : ""}`}
      >
        <Container className={styles.container}>
          <Link href={LINK_HOME} className={styles.logo}>
            <img
              src={showDarkAssets ? "/Logo-dark.svg" : "/Logo.svg"}
              alt={SITE_NAME}
            />
          </Link>

          <div className={styles.right}>
            <Nav className={styles.linksContainer}>
              {LIST_LINKS.map((elem) => (
                <Link
                  key={elem.title}
                  href={elem.link}
                  className={path === elem.link ? styles.active : ""}
                >
                  {elem.title}
                </Link>
              ))}
            </Nav>

            <ShopCartLink />

            <img
              onClick={() => setShowMobile(!showMobile)}
              className={styles.openMenu}
              src={showDarkAssets ? "/icons/menu-dark.svg" : "/icons/menu.svg"}
              alt="Открыть меню"
            />
          </div>
        </Container>

        <NavbarMobile
          show={showMobile}
          handleClose={() => setShowMobile(false)}
          scrolled={showScrolled}
        />
      </Navbar>
    </>
  );
};

export default NavbarTop;
