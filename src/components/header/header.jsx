import styles from "./header.module.css";
import logo3 from "../../image/logo3.png";
import { SocialLinks } from "../social_links/social_links";
import { Link } from "react-router-dom";
import { LINKS } from "../../Constants/links";
import { scrollToSection } from "../../Utils/smooth-scroll";
export const Header = () => {
  return (
    <header className={styles.header} id="main">
      
        <div className={styles.header_top}>
          <ul className={styles.header_top_text}>
            <li>г. Томск, ул. Черноморская, д. 44/3</li>
            <li>Телефон: <a className={styles.header_phone} href="tel:+79039554324"> +7 (903) 955-43-24 </a></li>
            <time dateTime="Mo-Fr 09:00-18:00">Пн-Пт: 9:00-18:00</time>
          </ul>
          <div className={styles.header_bottom_logo}>
            <Link to={LINKS.MAIN}>
              <img title="На главную страницу" className={styles.header_logo} src={logo3} alt="logo boat" />
            </Link>
            <h1 className={styles.header_title}>Ремонт ПВХ лодок в Томске</h1>
          </div>
          <hr className={styles.header_hr}></hr>
          <nav >
            <ul className={styles.header_nav_container}>
              <Link to={LINKS.MAIN}>
                <li>Главная</li>
              </Link>
              <Link to={LINKS.MAIN} onClick={() => scrollToSection("main")}>
              <li>Примеры работ</li>
              </Link>
              <li>О нас</li>
              <Link to={LINKS.CONTACTS}>
              <li>Контакты</li>
              </Link>
            </ul>
          </nav>
        </div>
     
      <div className={styles.header_container}>
      
          <SocialLinks />
    
      </div>
    </header>
  );
};
