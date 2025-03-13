import styles from "./error.module.css";
export const Error = ({children}) => {
return (
    <div className={styles.error_container}>

        <div className={styles.error}>{children}</div>
    </div>
);
}