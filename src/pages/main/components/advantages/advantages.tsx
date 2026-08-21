import { ShieldCheck, Droplet, Wrench } from "lucide-react";
import { SectionTitle } from "../section-title/section-title";
import styles from "./advantages.module.css";

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    title: "Гарантия 1 год",
    text: "На все виды ремонтных работ предоставляем гарантию 1 год.",
  },
  {
    icon: Droplet,
    title: "Профессиональные материалы",
    text: "Используем только качественные клеи, ткани и комплектующие от проверенных производителей.",
  },
  {
    icon: Wrench,
    title: "Качественная сварка",
    text: "Современное оборудование для сварки ПВХ обеспечивает прочность и герметичность шва.",
  },
];

export const Advantages = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle title="Почему выбирают BoatFix" />

        <div className={styles.grid}>
          {ADVANTAGES.map(({ icon: Icon, title, text }) => (
            <article key={title} className={styles.card}>
              <Icon className={styles.icon} aria-hidden="true" />
              <h3 className={styles.card_title}>{title}</h3>
              <p className={styles.card_text}>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
