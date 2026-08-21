import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LINKS } from "../../Constants/links";
import styles from "./not-found.module.css";

export const NotFound = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${show ? styles.visible : ""}`}>
        <div className={styles.code}>
          <span>4</span>
          <span className={styles.zero}>0</span>
          <span>4</span>
        </div>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Возможно, страница была удалена или адрес указан неверно.
        </p>
        <Link to={LINKS.MAIN} className={styles.button}>
          На главную
        </Link>
      </div>
    </div>
  );
};
