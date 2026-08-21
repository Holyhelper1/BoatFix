import { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./faq-accordion.module.css";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.question} className={styles.item}>
            <button
              type="button"
              id={buttonId}
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <FiChevronDown
                className={`${styles.icon} ${isOpen ? styles.icon_open : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`${styles.panel} ${isOpen ? styles.panel_open : ""}`}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
