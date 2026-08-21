import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import logo3 from "../../image/logo3.png";
import styles from "./footer.module.css";
import { LINKS } from "../../Constants/links";
import { CONTACTS, SOCIAL_LINKS } from "../../Constants/contacts";

const NAV_ITEMS = [
  { label: "Главная", to: LINKS.MAIN },
  { label: "До / После", to: `${LINKS.MAIN}#examples` },
  { label: "Цены", to: LINKS.PRICES },
  { label: "Контакты", to: LINKS.CONTACTS },
];

export const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_grid}>
          <div className={styles.brand_col}>
            <Link to={LINKS.MAIN} className={styles.logo}>
              <img src={logo3} alt="BoatFix — ремонт ПВХ лодок" />
              <span className={styles.logo_text}>
                <span className={styles.logo_title}>
                  Boat<span className={styles.logo_accent}>Fix</span>
                </span>
                <span className={styles.logo_subtitle}>Ремонт ПВХ лодок</span>
              </span>
            </Link>
            <p className={styles.brand_desc}>
              Профессиональный ремонт, тюнинг и оснащение ПВХ лодок в Томске.{" "}
              <br></br> Качество, проверенное временем.
            </p>
            <div className={styles.socials}>
              <a
                href={SOCIAL_LINKS.vk}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.social_vk}`}
                aria-label="Мы ВКонтакте"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.16 17.86c-5.61 0-8.82-3.85-8.96-10.28h2.82c.1 4.71 2.17 6.71 3.82 7.12V7.58h2.65v4.07c1.63-.18 3.34-2.03 3.92-4.07h2.65a7.9 7.9 0 0 1-3.64 5.14 8.18 8.18 0 0 1 4.26 5.14h-2.92a5.12 5.12 0 0 0-4.27-3.71v3.71h-.33Z" />
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.social_tg}`}
                aria-label="Наш Telegram"
              >
                <FaTelegramPlane aria-hidden="true" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.social_wa}`}
                aria-label="Наш WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav
            className={styles.nav_col}
            aria-label="Навигация в подвале сайта"
          >
            <h3 className={styles.col_title}>Навигация</h3>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contacts_col}>
            <h3 className={styles.col_title}>Контакты</h3>
            <ul>
              {CONTACTS.phones.map((phone) => (
                <li key={phone.href}>
                  <FiPhone className={styles.contact_icon} aria-hidden="true" />
                  <a href={phone.href}>{phone.display}</a>
                </li>
              ))}
              <li>
                <FiMail className={styles.contact_icon} aria-hidden="true" />
                <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
              </li>
              <li>
                <FiMapPin className={styles.contact_icon} aria-hidden="true" />
                <span>{CONTACTS.address}</span>
              </li>
              <li>
                <FiClock className={styles.contact_icon} aria-hidden="true" />
                <span>{CONTACTS.workHours}</span>
              </li>
            </ul>
          </div>

          <div className={styles.map_col}>
            <h3 className={styles.col_title}>Мы на карте</h3>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac42a86e85248138d80776b8664d50e6b5906223dd70494afc1b13c53b7fe452d&amp;source=constructor"
              title="BoatFix на карте — г. Томск, ул. Черноморская, д. 44/3"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className={styles.footer_bottom}>
        <div className={`container ${styles.footer_bottom_inner}`}>
          <span>&copy; {thisYear} BoatFix Tomsk. Все права защищены.</span>
          <Link to="/" onClick={(e) => e.preventDefault()}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
};
