import { Product } from "../../types/product.ts";
import styles from "./ProductCard.module.css";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import {
  addToShoppingCart,
  removeFromShoppingCart,
} from "../../state/product/productSlice.ts";
import { QuantityCounter } from "../../components/QuantityCounter/QuantityCounter.tsx";
import { openShoppingCart } from "../../state/ui/uiSlide.ts";

export const ProductCard = ({ product }: { product: Product }) => {
  const { shoppingCartProducts } = useSelector(
    (state: RootState) => state.product
  );
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(product.price);
  const productInCart = shoppingCartProducts?.find((p) => p.id === product.id);
  const hasAddedProductToShoppingCart =
    productInCart && (productInCart.shoppingCartQuantity || 0) > 0;

  const dispatch = useDispatch<AppDispatch>();

  const handleAddProduct = () => {
    dispatch(addToShoppingCart(product));

    if (!hasAddedProductToShoppingCart) {
      dispatch(openShoppingCart());
    }
  };

  const handleRemoveProduct = () => {
    dispatch(removeFromShoppingCart(product.id));
  };

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
          <b>Seller:</b> {product.ownerUsername}
        </p>
        <p className={styles.quantity}>
          <b>Available:</b> {product.quantity}
        </p>
        <p className={styles.price}>{formattedPrice}</p>
        <div className={styles.actions}>
          {productInCart && (productInCart.shoppingCartQuantity || 0) > 0 ? (
            <QuantityCounter
              product={productInCart}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              className={styles.quantityAddRemove}
            />
          ) : (
            <PrimaryButton
              className={styles.addToCartButton}
              variant="outline"
              onClick={handleAddProduct}
            >
              Add
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};
