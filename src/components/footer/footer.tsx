import { Link } from "react-router-dom";
import { SocialLinks } from "../social_links/social_links";
import styles from "./footer.module.css";
import { LINKS } from "../../Constants/links";
import { scrollToSection } from "../../Utils/smooth-scroll";

export const Footer = () => {
  const thisYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <nav className={styles.footer_nav}>
          <Link to={LINKS.MAIN}>Главная</Link>
          <Link to={LINKS.MAIN} onClick={() => scrollToSection("examples")}>
            Примеры работ
          </Link>
          <Link to={LINKS.CONTACTS}>Контакты</Link>
        </nav>
        <div className={styles.footer_social}>
          <SocialLinks />
        </div>
      </div>
      <p className={styles.footer_copy}>&copy; {thisYear}. Все права защищены.</p>
    </footer>
  );
};
