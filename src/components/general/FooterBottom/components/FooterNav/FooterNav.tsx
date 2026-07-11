import styles from "./FooterNav.module.css";
import { LIST_LINKS } from "@/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const path = usePathname();

  return (
    <nav className={styles.FooterNav} role="navigation" aria-label="Меню в подвале">
      {LIST_LINKS.map((elem) => (
        <Link
          key={elem.title}
          href={elem.link}
          className={path === elem.link ? styles.active : ""}
        >
          {elem.title}
        </Link>
      ))}
    </nav>
  );
};

export default FooterNav;
