import styles from "./AccountButton.module.css";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const AccountButton = ({ children, onClick }: Props) => {
  return (
    <button className={styles.accountButton} onClick={onClick}>
      {children}
    </button>
  );
};
