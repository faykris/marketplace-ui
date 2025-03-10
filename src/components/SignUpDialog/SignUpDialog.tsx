import { useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog.tsx";
import { AccountButton } from "../../components/AccountButton/AccountButton.tsx";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm.tsx";

export const SignUpDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      isOpen={open}
      setIsOpen={setOpen}
      title="Sign Up"
      description="Join MagicMarketplace to list and sell your products."
      triggerComponent={
        <AccountButton onClick={() => setOpen(!open)}>Sign up</AccountButton>
      }
    >
      <SignUpForm onCloseDialog={() => setOpen(false)} />
    </Dialog>
  );
};
