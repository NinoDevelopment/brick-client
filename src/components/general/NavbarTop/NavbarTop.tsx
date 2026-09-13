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
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { SITE_NAME, SITE_URL } from "@/constants/seo";

const MOBILE_MAX_WIDTH = 991;

const isHeroPage = (path: string) => {
  if (
    path === LINK_HOME ||
    path === LINK_ABOUT ||
    path === LINK_CALCULATOR ||
    path === LINK_CATALOG ||
    path.startsWith(`${LINK_CATALOG}/`) ||
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
  const [showMobile, setShowMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const hero = isHeroPage(path);
  const light = !hero;

  useEffect(() => {
    setShowMobile(false);
  }, [path]);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const syncMobile = () => {
      setIsMobile(media.matches);
      if (!media.matches) {
        setShowMobile(false);
      }
    };

    syncMobile();
    media.addEventListener("change", syncMobile);
    return () => media.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThresholdPercent = 0.2;
      const scrollThreshold = window.innerHeight * scrollThresholdPercent;
      setScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  const showDarkAssets = light;
  const showScrolled = scrolled && hero;

  return (
    <>
      <JsonLd
        id="navigation-meta"
        data={{
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
        }}
      />

      <Navbar
        role="navigation"
        aria-label="Основное меню"
        expand="lg"
        fixed="top"
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
            {isMobile === false && (
              <Nav className={styles.linksContainer}>
                {LIST_LINKS.map((elem) => (
                  <Link
                    key={elem.title}
                    href={elem.link}
                    className={
                      path === elem.link ||
                      (elem.link !== LINK_HOME && path.startsWith(`${elem.link}/`))
                        ? styles.active
                        : ""
                    }
                  >
                    {elem.title}
                  </Link>
                ))}
              </Nav>
            )}

            <ShopCartLink />

            {isMobile === true && (
              <button
                type="button"
                onClick={() => setShowMobile(true)}
                className={styles.openMenu}
                aria-label="Открыть меню"
                aria-expanded={showMobile}
              >
                <img
                  src={
                    showDarkAssets ? "/icons/menu-dark.svg" : "/icons/menu.svg"
                  }
                  alt=""
                />
              </button>
            )}
          </div>
        </Container>
      </Navbar>

      {light && <div className={styles.offset} aria-hidden="true" />}

      <NavbarMobile
        show={Boolean(isMobile && showMobile)}
        handleClose={() => setShowMobile(false)}
        scrolled={showScrolled}
      />
    </>
  );
};

export default NavbarTop;
