import styles from "./AdminShell.module.css";

export const ADMIN_TABS = [
  { id: "orders", label: "Заказы" },
  { id: "categories", label: "Категории" },
  { id: "products", label: "Товары" },
  { id: "gallery", label: "Галерея" },
  { id: "promocodes", label: "Промокоды" },
] as const;

export type AdminTabId = (typeof ADMIN_TABS)[number]["id"];

interface IAdminShell {
  active: AdminTabId;
  onChange: (id: AdminTabId) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const AdminShell = ({ active, onChange, onLogout, children }: IAdminShell) => {
  return (
    <div className={`admin-scope ${styles.shell}`}>
      <div className={styles.inner}>
        <header className={styles.top}>
          <div>
            <p className={styles.kicker}>Кирпичный завод Ковернино</p>
            <h1>Админ-панель</h1>
          </div>
          <button type="button" className={styles.logout} onClick={onLogout}>
            Выйти
          </button>
        </header>

        <nav className={styles.nav} aria-label="Разделы админки">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={active === tab.id ? styles.tabActive : styles.tab}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default AdminShell;
