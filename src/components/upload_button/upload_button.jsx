import styles from "./upload_button.module.css";

export const UploadButton = ({ ...props }) => {
  return (
    <div className={styles.button_container}>
      <button className={styles.button} {...props}>{props.children}</button>
    </div>
  );
};
