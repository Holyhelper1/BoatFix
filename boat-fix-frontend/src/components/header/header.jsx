import styles from "./header.module.css";
import logo3 from "../../image/logo3.png";
import { SocialLinks } from "../social_links/social_links";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.header_top}>
          <ul className={styles.header_top_text}>
            <li>г.Томск, ул.Пушкина, д.10</li>
            <li>Телефон: 8-800-555-35-35</li>
            <li> Пн-Пт: 9:00-18:00</li>
          </ul>
          <div className={styles.header_bottom_logo}>
            <img className={styles.logo} src={logo3} alt="logo boat" />
            <div>Ремонт ПВХ лодок в Томске</div>
          </div>
          <hr className={styles.hr_header}></hr>
          <nav className={styles.header_nav_container}>
            <ul>
              <Link to="/BoatFix">
                <li>Главная</li>
              </Link>
              <li>Примеры работ</li>
              <li>О нас</li>
              <li>Контакты</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles.header_container}>
        <div className={styles.header_logo_container}>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};
