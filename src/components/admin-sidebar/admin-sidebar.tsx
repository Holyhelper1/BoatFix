import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  FiArchive,
  FiBell,
  FiClipboard,
  FiLogOut,
  FiSettings,
  FiVolume2,
} from "react-icons/fi";
import { auth } from "../../firebase";
import avatarImg from "../../image/Avatar.webp";
import styles from "./admin-sidebar.module.css";
import { CustomSelect } from "../custom-select/custom-select";
import {
  DEFAULT_SOUND_ID,
  NOTIFICATION_SOUNDS,
  type NotificationSoundOption,
} from "../../Constants/notification-sounds";
import {
  getSavedSoundId,
  playNotificationSound,
  saveSoundId,
} from "../../Utils/notification-sound";

interface AdminSidebarProps {
  activeSection: "orders" | "archive";
  activeCount: number;
  unseenCount: number;
}

const SOUND_OPTIONS = [
  { value: DEFAULT_SOUND_ID, label: "Без звука" },
  ...NOTIFICATION_SOUNDS.map((sound) => ({
    value: sound.id,
    label: sound.label,
  })),
];

export const AdminSidebar = ({
  activeSection,
  activeCount,
  unseenCount,
}: AdminSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = auth.currentUser?.email ?? "";
  const [soundId, setSoundId] = useState<NotificationSoundOption>(
    getSavedSoundId
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  const handleSoundChange = (value: NotificationSoundOption) => {
    setSoundId(value);
    saveSoundId(value);
    playNotificationSound(value);
  };

  const hasUnseen = unseenCount > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.admin_block}>
          <span className={styles.avatar}>
            <img src={avatarImg} alt="Аватар администратора" />
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
          {hasUnseen ? (
            <span className={`${styles.count} ${styles.count_unseen}`}>
              {unseenCount}
            </span>
          ) : (
            activeCount > 0 && <span className={styles.count}>{activeCount}</span>
          )}
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

      <section className={styles.notifications} aria-label="Уведомления">
        <span className={styles.notifications_label}>
          <FiBell aria-hidden="true" />
          Уведомления
        </span>
        <div className={styles.sound_row}>
          <div className={styles.sound_select}>
            <CustomSelect
              value={soundId}
              options={SOUND_OPTIONS}
              onChange={handleSoundChange}
              ariaLabel="Мелодия уведомлений"
            />
          </div>
          <button
            type="button"
            className={styles.sound_preview}
            onClick={() => playNotificationSound(soundId)}
            disabled={soundId === DEFAULT_SOUND_ID}
            aria-label="Послушать выбранную мелодию"
            title="Послушать"
          >
            <FiVolume2 aria-hidden="true" />
          </button>
        </div>
      </section>

      <button type="button" className={styles.logout} onClick={handleLogout}>
        <FiLogOut aria-hidden="true" />
        Выйти из панели
      </button>
    </aside>
  );
};
