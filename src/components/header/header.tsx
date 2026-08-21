import { useState } from "react";
import styles from "./header.module.css";
import logo3 from "../../image/logo3.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { LINKS } from "../../Constants/links";
import { CONTACTS, SOCIAL_LINKS } from "../../Constants/contacts";

const NAV_ITEMS = [
  { label: "Главная", to: LINKS.MAIN },
  { label: "До / После", to: `${LINKS.MAIN}#examples` },
  { label: "Цены", to: LINKS.PRICES },
  { label: "Контакты", to: LINKS.CONTACTS },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header_inner}`}>
        <Link to={LINKS.MAIN} className={styles.logo} onClick={closeMenu}>
          <img src={logo3} alt="BoatFix — ремонт ПВХ лодок" />
          <span className={styles.logo_text}>
            <span className={styles.logo_title}>
              Boat<span className={styles.logo_accent}>Fix</span>
            </span>
            <span className={styles.logo_subtitle}>Ремонт ПВХ лодок</span>
          </span>
        </Link>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.nav_open : ""}`}
          aria-label="Основная навигация"
        >
          {NAV_ITEMS.map((item) =>
            item.to === `${LINKS.MAIN}#examples` ? (
              <a
                key={item.label}
                href="#examples"
                className={
                  location.hash === "#examples" ? styles.nav_link_active : ""
                }
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === LINKS.MAIN}
                className={({ isActive }) =>
                  isActive ? styles.nav_link_active : ""
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            )
          )}

          <div className={styles.nav_contacts_mobile}>
            {CONTACTS.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className={styles.phone}>
                {phone.display}
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.header_right}>
          <div className={styles.phones}>
            {CONTACTS.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className={styles.phone}>
                <FiPhone className={styles.phone_icon} aria-hidden="true" />
                {phone.display}
              </a>
            ))}
          </div>

          <div className={styles.messengers}>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messenger}
              aria-label="Написать в WhatsApp"
            >
              <FaWhatsapp className={styles.messenger_icon_whatsapp} />
              WhatsApp
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messenger}
              aria-label="Написать в Telegram"
            >
              <FaTelegramPlane className={styles.messenger_icon_telegram} />
              Telegram
            </a>
          </div>

          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burger_open : ""}`}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};
