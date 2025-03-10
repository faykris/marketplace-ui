import styles from "./Spinner.module.css";

export const Spinner = () => (
  <div className={styles.spinnerRoot}>
    <span className={styles.spinner} />
  </div>
);
