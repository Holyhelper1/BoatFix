import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  FiArchive,
  FiClipboard,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { auth } from "../../firebase";
import logo3 from "../../image/logo3.png";
import styles from "./admin-sidebar.module.css";

interface AdminSidebarProps {
  activeSection: "orders" | "archive";
  newCount: number;
}

export const AdminSidebar = ({ activeSection, newCount }: AdminSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = auth.currentUser?.email ?? "";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <img src={logo3} alt="BoatFix" className={styles.logo} />

        <div className={styles.admin_block}>
          <span className={styles.avatar}>
            <FiUser aria-hidden="true" />
          </span>
          <span className={styles.admin_info}>
            <span className={styles.admin_name}>Администратор</span>
            {email && <span className={styles.admin_email}>{email}</span>}
          </span>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Меню панели администратора">
        <button
          type="button"
          className={`${styles.item} ${
            activeSection === "orders" ? styles.item_active : ""
          }`}
          onClick={() => navigate("/admin/orders")}
        >
          <FiClipboard className={styles.icon} aria-hidden="true" />
          Активные заказы
          {newCount > 0 && <span className={styles.count}>{newCount}</span>}
        </button>

        <button
          type="button"
          className={`${styles.item} ${
            activeSection === "archive" ? styles.item_active : ""
          }`}
          onClick={() => navigate("/admin/archive")}
        >
          <FiArchive className={styles.icon} aria-hidden="true" />
          Архив заказов
        </button>

        <button type="button" className={styles.item} disabled>
          <FiSettings className={styles.icon} aria-hidden="true" />
          Настройки сайта
          <span className={styles.soon}>Скоро</span>
        </button>
      </nav>

      <button type="button" className={styles.logout} onClick={handleLogout}>
        <FiLogOut aria-hidden="true" />
        Выйти из панели
      </button>
    </aside>
  );
};
