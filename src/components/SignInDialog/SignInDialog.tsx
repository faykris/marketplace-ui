import { useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog.tsx";
import { AccountButton } from "../../components/AccountButton/AccountButton.tsx";
import { SignInForm } from "../../components/SignInForm/SignInForm.tsx";

export const SignInDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      isOpen={open}
      setIsOpen={setOpen}
      title="Sign In"
      description="Welcome back! Enter your credentials to sign in."
      triggerComponent={
        <AccountButton onClick={() => setOpen(!open)}>Sign in</AccountButton>
      }
    >
      <SignInForm onCloseDialog={() => setOpen(false)} />
    </Dialog>
  );
};
