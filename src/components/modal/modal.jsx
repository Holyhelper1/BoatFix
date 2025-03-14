import styles from "./modal.module.css";

export const Modal = ({ onClose, errorMessage, successMessage }) => {
  return (
    <div className={styles.modal_container}>
      {successMessage && (
        <div className={styles.modal_body_success}>
          <p className={styles.modal_text}>{successMessage}</p>
          <button className={styles.modal_button} onClick={onClose}>
            Закрыть
          </button>
        </div>
      )}
      {errorMessage && (
        <div className={styles.modal_body_error}>
          <p className={styles.modal_text}>{errorMessage}</p>
          <button className={styles.modal_button} onClick={onClose}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};
