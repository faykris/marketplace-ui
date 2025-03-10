import { Product } from "../../types/product.ts";
import styles from "./ProductCard.module.css";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";

export const ProductCard = ({ product }: { product: Product }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className={styles.productRoot}>
      <img
        src={product.image_url}
        alt={product.name}
        height={150}
        className={styles.image}
      />
      <div className={styles.details}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.sku}>
          <b>SKU:</b> {product.sku}
        </p>
        <p className={styles.seller}>
          <b>Seller username:</b> {product.ownerUsername}
        </p>
        <p className={styles.price}>{formattedPrice}</p>
        <div className={styles.actions}>
          <PrimaryButton className={styles.addToCartButton} variant="outline">
            Add
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
