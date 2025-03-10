import { useState } from "react";
import { Dialog } from "../../components/Dialog/Dialog.tsx";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { AddProductForm } from "../../components/AddProductForm/AddProductForm.tsx";
import styles from "./AddProductDialog.module.css";

export const AddProductDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      isOpen={open}
      setIsOpen={setOpen}
      title="Add product"
      description="Add a new product to your store."
      triggerComponent={
        <PrimaryButton
          className={styles.addProductButton}
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Add product
        </PrimaryButton>
      }
    >
      <AddProductForm onCloseDialog={() => setOpen(false)} />
    </Dialog>
  );
};
