import { Link } from "react-router-dom";
import styles from "./consent-checkbox.module.css";
import { LINKS } from "../../Constants/links";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
}

export const ConsentCheckbox = ({
  checked,
  onChange,
  error = false,
}: ConsentCheckboxProps) => {
  return (
    <label
      className={`${styles.consent} ${error ? styles.consent_error : ""}`}
      data-error={error || undefined}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={error || undefined}
      />
      <span className={styles.box} aria-hidden="true">
        <svg
          className={styles.checkmark}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.checkmark_path}
            d="M2.5 8.5L6 12L13.5 4.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.text}>
        Я согласен на обработку персональных данных и ознакомлен с{" "}
        <Link
          to={LINKS.PRIVACY_POLICY}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          политикой конфиденциальности
        </Link>
      </span>
    </label>
  );
};
