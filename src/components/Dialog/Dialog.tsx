import { ReactNode } from "react";
import * as DialogRadix from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";
import styles from "./Dialog.module.css";

type Props = {
  triggerComponent: ReactNode;
  children: ReactNode;
  title: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Dialog = ({
  triggerComponent,
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: Props) => {
  return (
    <DialogRadix.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogRadix.Trigger asChild>{triggerComponent}</DialogRadix.Trigger>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={styles.overlay} />
        <DialogRadix.Content className={styles.content}>
          <DialogRadix.Title className={styles.title}>
            {title}
          </DialogRadix.Title>
          {description && (
            <DialogRadix.Description className={styles.description}>
              {description}
            </DialogRadix.Description>
          )}
          {children}
          <DialogRadix.Close asChild>
            <button className={styles.iconButton} aria-label="Close">
              <span
                className={cx("material-symbols-outlined", styles.closeIcon)}
              >
                close
              </span>
            </button>
          </DialogRadix.Close>
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
};
