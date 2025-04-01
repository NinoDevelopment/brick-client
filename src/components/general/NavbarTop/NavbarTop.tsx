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
import { APP_TITLE } from "@/constants/general";
import NavbarMobile from "@/components/general/NavbarTop/components/NavbarMobile/NavbarMobile";
import Script from "next/script";

const NavbarTop = () => {
  const path = usePathname();
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const darkClass = () => {
    if (
      path === "/" ||
      path === LINK_ABOUT ||
      path === LINK_CALCULATOR ||
      path === LINK_CATALOG ||
      path === LINK_CONTACTS ||
      path === LINK_DELIVERY ||
      path === LINK_GALLERY
    )
      return "";
    return styles.dark;
  };

  return (
     <>
       <Script type="application/ld+json" id="navigation-meta">
         {JSON.stringify({
           "@context": "https://schema.org",
           "@type": "SiteNavigationElement",
           "name": "Основное меню",
           "description": "Навигация по сайту Кирпичного завода Ковернино",
           "url": "https://kzk.ooo",
           "significantLinks": LIST_LINKS.map(link => ({
             "@type": "SiteNavigationElement",
             "name": link.title,
             "url": `https://kzk.ooo/${link.link}`
           }))
         })}
       </Script>

       <Navbar
          role="navigation"
          aria-label="Основное меню"
          sticky={"top"}
          className={`${styles.NavbarTop} ${darkClass()} ${scrolled ? styles.scrolled : ""}`}
       >
         <Container className={styles.container}>
           <Link href={LINK_HOME} className={styles.logo} itemProp="url">
             <img
                src={darkClass() ? "/Logo-dark.svg" : "/Logo.svg"}
                alt={APP_TITLE}
                itemProp="logo"
             />
           </Link>

           <div className={styles.right}>
             <Nav className={styles.linksContainer}>
               {LIST_LINKS.map((elem) => (
                  <Link
                     key={elem.title}
                     href={elem.link}
                     className={path === elem.link ? styles.active : ""}
                     itemProp="mainEntityOfPage"
                  >
                    {elem.title}
                  </Link>
               ))}
             </Nav>

             <ShopCartLink/>

             <img
                onClick={() => setShowMobile(!showMobile)}
                className={styles.openMenu}
                src={darkClass() ? "/icons/menu-dark.svg" : "/icons/menu.svg"}
                alt={APP_TITLE}
             />
           </div>
         </Container>

         {/*mobile menu*/}
         <NavbarMobile
            show={showMobile}
            handleClose={() => setShowMobile(false)}
            scrolled={scrolled}
         />
       </Navbar>
     </>
  );
};

export default NavbarTop;
