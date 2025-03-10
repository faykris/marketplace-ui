import styles from "./PrimaryButton.module.css";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cx } from "class-variance-authority";

export type Props = { variant: "outline" | "default" } & PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export const PrimaryButton = ({
  children,
  variant,
  onClick,
  className,
}: Props) => {
  return (
    <button
      className={cx(styles.primaryButton, className, {
        [styles.outlineVariant]: variant === "outline",
        [styles.defaultVariant]: variant === "default",
      })}
      onClick={onClick}
      role="button"
    >
      {children}
    </button>
  );
};
