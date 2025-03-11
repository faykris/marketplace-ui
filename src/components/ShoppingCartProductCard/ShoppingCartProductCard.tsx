import styles from "./ShoppingCartProductCard.module.css";
import { Product } from "../../types/product.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store.ts";
import {
  addToShoppingCart,
  removeFromShoppingCart,
} from "../../state/product/productSlice.ts";
import { QuantityCounter } from "../../components/QuantityCounter/QuantityCounter.tsx";

export const ShoppingCartProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddProduct = () => {
    dispatch(addToShoppingCart(product));
  };

  const handleRemoveProduct = () => {
    dispatch(removeFromShoppingCart(product.id));
  };

  return (
    <div className={styles.shoppingCartProductCart}>
      <img
        src={product.image_url}
        alt={product.name}
        height={60}
        className={styles.image}
      />
      <div className={styles.productInfo}>
        <div className={styles.details}>
          <p className={styles.productName}>{product.name}</p>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
      </div>
      <QuantityCounter
        product={product}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />
    </div>
  );
};
