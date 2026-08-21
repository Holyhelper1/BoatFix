import styles from "./contacts.module.css";
import { Button } from "../../components";
import { Link } from "react-router-dom";

export const Contacts = () => {
  return (
    <div className={styles.contacts_container}>
      <Link to="/order">
        <Button>Оставить заявку</Button>
      </Link>
      <ul className={styles.contacts_info}>
        <li>Контакты</li>
        <li>
          Адрес:&nbsp;
          <a
            className={styles.contacts_address}
            href="https://yandex.ru/maps/-/CHBTzK1z"
            target="_blank"
            rel="noopener noreferrer"
          >
            г. Томск, ул. Черноморская, д. 44/3
          </a>
        </li>
        <li>
          Телефон:&nbsp;
          <a className={styles.contacts_phone} href="tel:+79039554324">
            +7 (903) 955-43-24
          </a>
        </li>
      </ul>
      <iframe
        className={styles.contacts_map}
        title="map_tomsk_boat_fix"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac42a86e85248138d80776b8664d50e6b5906223dd70494afc1b13c53b7fe452d&amp;source=constructor"
        width="100%"
        height="550"
        frameBorder="0"
      />
    </div>
  );
};
