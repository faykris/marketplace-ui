import { User } from "../../types/user.ts";
import { AccountOptions } from "../../components/AccountOptions/AccountOptions.tsx";
import { useState } from "react";
import { Popover } from "../../components/Popover/Popover.tsx";
import styles from "./AccountPopover.module.css";

type Props = {
  currentUser: User;
};

export const AccountPopover = ({ currentUser }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      setIsOpen={setOpen}
      isOpen={open}
      triggerComponent={
        <button className={styles.userContainer} onClick={() => setOpen(true)}>
          <span className="material-symbols-outlined">person</span>
          <span className={styles.username}>{currentUser.username}</span>
        </button>
      }
    >
      <AccountOptions onClosePopup={() => setOpen(false)} />
    </Popover>
  );
};
