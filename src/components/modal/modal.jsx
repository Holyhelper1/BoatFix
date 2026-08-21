import styles from "./modal.module.css";

export const Modal = ({ onClose, errorMessage, successMessage }) => {
  const isSuccess = !!successMessage && !errorMessage;

  return (
    <div className={styles.modal_container} onClick={onClose}>
      <div
        className={isSuccess ? styles.modal_body_success : styles.modal_body_error}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.modal_text}>
          {isSuccess ? successMessage : errorMessage}
        </p>
        <button className={styles.modal_button} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
