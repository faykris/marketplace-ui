import styles from "./QuantityCounter.module.css";
import { cx } from "class-variance-authority";
import { Product } from "../../types/product.ts";

type Props = {
  product: Product;
  handleRemoveProduct: () => void;
  handleAddProduct: () => void;
  className?: string;
};

export const QuantityCounter = ({
  product,
  handleRemoveProduct,
  handleAddProduct,
  className,
}: Props) => {
  return (
    <div className={cx(styles.quantityContainer, className)}>
      <button
        className={styles.modifyProductQuantityButton}
        onClick={handleRemoveProduct}
      >
        <span
          className={cx("material-symbols-outlined", styles.removeProductIcon)}
        >
          remove
        </span>
      </button>
      <span className={styles.quantity}>
        {product.shoppingCartQuantity || 0}
      </span>
      <button
        className={styles.modifyProductQuantityButton}
        onClick={handleAddProduct}
        disabled={product.quantity === product.shoppingCartQuantity}
      >
        <span
          className={cx("material-symbols-outlined", styles.addProductIcon)}
        >
          add
        </span>
      </button>
    </div>
  );
};
