import { Link } from "react-router-dom";
import { SocialLinks } from "../social_links/social_links";
import styles from "./footer.module.css";
import { LINKS } from "../../Constants/links";
import { WeatherBlock } from "../weather-block/weather-block";
export const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_social}>
        <SocialLinks />
      </div>
      <div className={styles.footer_list}>
        <ul className={styles.footer_list_item}>
          <Link to={LINKS.MAIN}>
            <li>Главная</li>
          </Link>
          <li>Примеры работ</li>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div className={styles.footer_text}>
        <WeatherBlock />
        <p> © 2020. Все права защищены.</p>
      </div>
    </div>
  );
};
