import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import styles from "./contacts.module.css";
import { CONTACTS, SOCIAL_LINKS } from "../../Constants/contacts";
import { LINKS } from "../../Constants/links";

export const Contacts = () => {
  return (
    <div className="container">
      <div className={styles.contacts}>
        <aside className={styles.sidebar}>
          <Link to={LINKS.ORDER} className={styles.cta}>
            Оставить заявку
            <FiArrowRight aria-hidden="true" />
          </Link>

          <section className={styles.card}>
            <h1 className={styles.title}>Контакты</h1>
            <ul className={styles.list}>
              <li className={styles.item}>
                <FiMapPin className={styles.icon} aria-hidden="true" />
                <div>
                  <span className={styles.label}>Адрес</span>
                  <a
                    href="https://yandex.ru/maps/-/CHBTzK1z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.value_link}
                  >
                    {CONTACTS.address}
                  </a>
                </div>
              </li>
              <li className={styles.item}>
                <FiClock className={styles.icon} aria-hidden="true" />
                <div>
                  <span className={styles.label}>Режим работы</span>
                  <span className={styles.value}>
                    {CONTACTS.workHours}
                  </span>
                </div>
              </li>
              <li className={styles.item}>
                <FiPhone className={styles.icon} aria-hidden="true" />
                <div>
                  <span className={styles.label}>Телефоны</span>
                  {CONTACTS.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className={`${styles.value_link} ${styles.phone}`}
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className={styles.item}>
                <FiMail className={styles.icon} aria-hidden="true" />
                <div>
                  <span className={styles.label}>E-mail</span>
                  <a
                    href={`mailto:${CONTACTS.email}`}
                    className={styles.value_link}
                  >
                    {CONTACTS.email}
                  </a>
                </div>
              </li>
            </ul>
          </section>

          <section className={styles.card}>
            <h2 className={styles.subtitle}>Мы на связи</h2>
            <div className={styles.socials}>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.social_whatsapp}`}
                aria-label="Написать в WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.social} ${styles.social_telegram}`}
                aria-label="Написать в Telegram"
              >
                <FaTelegramPlane aria-hidden="true" />
                Telegram
              </a>
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
                ВКонтакте
              </a>
            </div>
          </section>
        </aside>

        <section className={styles.map_card}>
          <iframe
            title="BoatFix на карте — г. Томск, ул. Черноморская, д. 44/3"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac42a86e85248138d80776b8664d50e6b5906223dd70494afc1b13c53b7fe452d&amp;source=constructor"
            allowFullScreen
          />
        </section>
      </div>
    </div>
  );
};
