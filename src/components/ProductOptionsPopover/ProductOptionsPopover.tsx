import { useState } from "react";
import toast from "react-hot-toast";
import { cx } from "class-variance-authority";
import { Popover } from "../../components/Popover/Popover.tsx";
import styles from "./ProductOptionsPopover.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import {
  deleteProduct,
  getProductsByOwnerId,
} from "../../state/product/productSlice.ts";

type Props = {
  productId: string;
};

export const ProductOptionsPopover = ({ productId }: Props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onRemoveProduct = async () => {
    const result = await dispatch(deleteProduct(productId)).unwrap();

    if (currentUser?.id) {
      if ("error" in result) {
        toast.error("Deletion failed, please try again.");
      } else {
        toast.success("Deletion successful!");
        setOpen(false);
        dispatch(getProductsByOwnerId(currentUser.id));
      }
    }
  };

  return (
    <Popover
      setIsOpen={setOpen}
      isOpen={open}
      triggerComponent={
        <button className={styles.menuButton} onClick={() => setOpen(true)}>
          <span
            className={cx("material-symbols-outlined", styles.menuButtonIcon)}
          >
            menu
          </span>
        </button>
      }
    >
      <div className={styles.contentOptions}>
        <button role="button" onClick={onRemoveProduct}>
          Remove product
        </button>
      </div>
    </Popover>
  );
};
