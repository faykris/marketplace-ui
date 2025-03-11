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
      title="Log In"
      description="Welcome back! Enter your credentials to log in."
      triggerComponent={
        <AccountButton onClick={() => setOpen(!open)}>Log in</AccountButton>
      }
    >
      <SignInForm onCloseDialog={() => setOpen(false)} />
    </Dialog>
  );
};
