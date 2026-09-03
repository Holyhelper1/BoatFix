import styles from "./section-title.module.css";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export const SectionTitle = ({ title, subtitle, id }: SectionTitleProps) => {
  return (
    <div className={styles.header} id={id}>
      <h2 className={styles.title}>
        <span className={styles.dash} aria-hidden="true" />
        {title}
        <span className={styles.dash} aria-hidden="true" />
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
