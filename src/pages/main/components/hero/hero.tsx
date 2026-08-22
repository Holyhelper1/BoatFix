import styles from "./hero.module.css";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { LINKS } from "../../../../Constants/links";

const FEATURES = [
  "Качественные материалы",
  "Опытные специалисты",
  "Гарантия на работы 1 год",
];

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.hero_content}`}>
        <h1 className={styles.hero_title}>
          Ремонт ПВХ лодок
          <span className={styles.hero_title_accent}> в Томске</span>
        </h1>

        <p className={styles.hero_subtitle}>
          Профессиональный ремонт, тюнинг и установка аксессуаров для ПВХ лодок
          любой сложности.
        </p>

        <ul className={styles.hero_features}>
          {FEATURES.map((feature) => (
            <li key={feature} className={styles.hero_feature}>
              <FiCheckCircle className={styles.hero_feature_icon} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <Link to={LINKS.ORDER} className={styles.hero_cta}>
          Оставить заявку
          <FiArrowRight className={styles.hero_cta_arrow} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};
