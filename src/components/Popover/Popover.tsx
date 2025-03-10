import { Popover as PopoverRadix } from "radix-ui";
import { ReactNode } from "react";
import { cx } from "class-variance-authority";
import styles from "./Popover.module.css";

type Props = {
  triggerComponent: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  contentClassName?: string;
};

export const Popover = ({
  triggerComponent,
  isOpen,
  setIsOpen,
  children,
  contentClassName,
}: Props) => {
  return (
    <PopoverRadix.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverRadix.Trigger asChild>{triggerComponent}</PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content
          className={cx(styles.popoverContent, contentClassName)}
          sideOffset={5}
        >
          {children}
          <PopoverRadix.Arrow className={styles.popoverArrow} />
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};
