import styles from "./header.module.css";
import logo3 from "../../image/logo3.png";
import { SocialLinks } from "../social_links/social_links";
import { Link } from "react-router-dom";
import { LINKS } from "../../Constants/links";
import { scrollToSection } from "../../Utils/smooth-scroll";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <span>г. Томск, ул. Черноморская, д. 44/3</span>
          <span className={styles.top_bar_sep}>|</span>
          <time dateTime="Mo-Fr 09:00-18:00">Пн-Пт: 9:00-18:00</time>
        </div>
        <div className={styles.top_bar_right}>
          <a className={styles.top_phone} href="tel:+79039554324">
            +7 (903) 955-43-24
          </a>
          <span className={styles.top_bar_sep}>|</span>
          <a className={styles.top_phone} href="tel:83822224324">
            8(382) 222-43-24
          </a>
          <SocialLinks />
        </div>
      </div>

      <div className={styles.main_bar}>
        <Link to={LINKS.MAIN} className={styles.header_logo_link}>
          <img className={styles.header_logo} src={logo3} alt="logo boat" />
          <span className={styles.header_title}>Ремонт ПВХ лодок</span>
        </Link>

        <nav className={styles.header_nav}>
          <Link to={LINKS.MAIN}>Главная</Link>
          <Link to={LINKS.MAIN} onClick={() => scrollToSection("examples")}>
            Примеры работ
          </Link>
          <Link to={LINKS.CONTACTS}>Контакты</Link>
        </nav>

        <Link to={LINKS.ORDER} className={styles.cta_button}>
          <span>Оставить заявку</span>
          <span className={styles.cta_arrow}>&rarr;</span>
        </Link>
      </div>
    </header>
  );
};
