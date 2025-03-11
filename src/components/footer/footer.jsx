import { Link } from "react-router-dom";
import { SocialLinks } from "../social_links/social_links";
import styles from "./footer.module.css";
import { LINKS } from "../../Constants/links";
import { WeatherBlock } from "../weather-block/weather-block";
import { scrollToSection } from "../../Utils/smooth-scroll";
export const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_social}>
        <SocialLinks />
      </div>
      <div className={styles.footer_list}>
        <ul className={styles.footer_list_item}>
          <Link to={LINKS.MAIN} onClick={() => scrollToSection("main")}>
            <li>Главная</li>
          </Link>
          <Link to={LINKS.ORDER}>
            <li>Оставить заявку</li>
          </Link>
          <li>О нас</li>
          <Link to={LINKS.CONTACTS}>
            <li>Контакты</li>
          </Link>
        </ul>
      </div>
      <div className={styles.footer_text}>
        <WeatherBlock />
        <p> © 2020. Все права защищены.</p>
      </div>
    </div>
  );
};
