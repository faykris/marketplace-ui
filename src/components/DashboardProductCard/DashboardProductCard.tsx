import { Product } from "../../types/product.ts";
import { ProductOptionsPopover } from "../../components/ProductOptionsPopover/ProductOptionsPopover.tsx";
import styles from "./DashboardProductCard.module.css";
import { cx } from "class-variance-authority";

type Props = {
  product: Product;
  isAdmin?: boolean;
};

export const DashboardProductCard = ({ product, isAdmin }: Props) => {
  const createdAt = new Date(product.createdAt);

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.adminProductCard}>
      <img
        src={product.image_url}
        alt={product.name}
        height={110}
        width={110}
        className={cx(styles.image, styles.mobileImage)}
      />
      <div className={styles.mainContent}>
        <div className={styles.productInfo}>
          <img
            src={product.image_url}
            alt={product.name}
            height={110}
            width={110}
            className={cx(styles.image, styles.desktopImage)}
          />
          <div className={styles.details}>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productDetail}>
              <b>SKU:</b> {product.sku}
            </p>
            <p className={styles.productDetail}>
              <b>Seller:</b> {product.ownerUsername}
            </p>
            <p className={styles.productDetail}>
              <b>Created:</b> {formattedDate}
            </p>
            <span className={styles.productQuantityTag}>
              {product.quantity} available
            </span>
          </div>
        </div>
        <div className={styles.priceAndActions}>
          <div className={styles.priceContainer}>
            <p className={styles.priceTitle}>Price</p>
            <p className={styles.price}>${product.price}</p>
          </div>
          {!isAdmin && (
            <div className={styles.actions}>
              <ProductOptionsPopover productId={product.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};