import { ButtonHTMLAttributes } from "react";
import styles from "./upload_button.module.css";

export const UploadButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className={styles.button_container}>
      <button className={styles.button} {...props}>
        {children}
      </button>
    </div>
  );
};
