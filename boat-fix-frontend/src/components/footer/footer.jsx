import { Link } from "react-router-dom";
import { SocialLinks } from "../social_links/social_links";
import styles from "./footer.module.css";
export const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div>
        <SocialLinks />
      </div>
      <div>
        <ul className={styles.footer_list}>
        <Link to="/BoatFix">
                <li>Главная</li>
              </Link>
          
          <li>Примеры работ</li>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div className={styles.footer_text}>
        <p> © 2020. Все права защищены.</p>
      </div>
    </div>
  );
};
