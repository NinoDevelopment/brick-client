import styles from "./FooterNav.module.css";
import { LIST_LINKS } from "@/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";

const FooterNav = () => {
  const path = usePathname();

  return (
     <>
       <Script type="application/ld+json" id="footer-navigation-meta">
         {JSON.stringify({
           "@context": "https://schema.org",
           "@type": "SiteNavigationElement",
           "name": "Меню в подвале",
           "description": "Навигация по сайту Кирпичного завода Ковернино",
           "url": "https://kzk.ooo",
           "significantLinks": LIST_LINKS.map(link => ({
             "@type": "SiteNavigationElement",
             "name": link.title,
             "url": `https://kzk.ooo/${link.link}`
           }))
         })}
       </Script>

       <nav className={styles.FooterNav} role="navigation">
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
       </nav>
     </>
  );
};

export default FooterNav;
