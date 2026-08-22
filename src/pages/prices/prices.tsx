import { Link } from "react-router-dom";
import { Wrench, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./prices.module.css";
import { LINKS } from "../../Constants/links";

export const Prices = () => {
  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.icon_wrap}>
            <Wrench className={styles.icon} aria-hidden="true" />
          </div>
          <h1 className={styles.title}>Цены</h1>
          <p className={styles.text}>
            Эта страница находится в разработке. Мы готовим для вас подробный
            прайс на все виды работ.
          </p>
          <p className={styles.hint}>
            Хотите узнать стоимость ремонта прямо сейчас? Оставьте заявку с
            фото повреждений — рассчитаем в течение 30 минут.
          </p>
          <div className={styles.actions}>
            <Link to={LINKS.MAIN} className={styles.btn_secondary}>
              <ArrowLeft aria-hidden="true" />
              На главную
            </Link>
            <Link to={LINKS.ORDER} className={styles.btn_primary}>
              Оставить заявку
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
