import { useDispatch, useSelector } from "react-redux";
import { cx } from "class-variance-authority";
import { Popover } from "../../components/Popover/Popover.tsx";
import { RootState, AppDispatch } from "../../state/store.ts";
import { ShoppingCartProductCard } from "../../components/ShoppingCartProductCard/ShoppingCartProductCard.tsx";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import styles from "./ShoppingCartPopover.module.css";
import {
  buyProducts,
  fetchProducts,
} from "../../state/product/productSlice.ts";
import toast from "react-hot-toast";
import { closeShoppingCart, openShoppingCart } from "../../state/ui/uiSlide.ts";

export const ShoppingCartPopover = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shoppingCartOpen = useSelector(
    (state: RootState) => state.ui.shoppingCartOpen
  );
  const { shoppingCartProducts } = useSelector(
    (state: RootState) => state.product
  );
  const totalCartQuantity =
    shoppingCartProducts?.reduce(
      (acc, product) => acc + (product.shoppingCartQuantity || 0),
      0
    ) || 0;

  const handleBuyProducts = async () => {
    if (!shoppingCartProducts || shoppingCartProducts.length === 0) return;

    const items = shoppingCartProducts.map((product) => ({
      productId: product.id,
      quantity: product.shoppingCartQuantity || 1,
    }));

    try {
      const result = await dispatch(buyProducts(items)).unwrap();

      if (result.message === "Products purchased successfully") {
        dispatch(fetchProducts());
        toast.success("Products purchased successfully!");
      }
    } catch (e) {
      toast.error("Error buying products, please try again.");
    }
  };

  return (
    <Popover
      setIsOpen={(isOpen) => {
        if (!isOpen) {
          dispatch(closeShoppingCart());
        }
      }}
      isOpen={shoppingCartOpen}
      triggerComponent={
        <div className={styles.triggerContainer}>
          <button
            className={styles.cartButton}
            onClick={() => dispatch(openShoppingCart())}
          >
            <span className={cx(styles.cartIcon, "material-icons")}>
              shopping_cart
            </span>
          </button>
          <span className={styles.totalCartQuantity}>{totalCartQuantity}</span>
        </div>
      }
      contentClassName={styles.popoverContent}
    >
      <div className={styles.content}>
        <p className={styles.title}>Shopping Cart</p>
        {shoppingCartProducts && shoppingCartProducts.length > 0 ? (
          <div className={styles.productList}>
            {shoppingCartProducts?.map((product) => (
              <ShoppingCartProductCard
                product={product}
                key={`card-product-${product.id}`}
              />
            ))}
            <div className={styles.action}>
              <PrimaryButton variant="default" onClick={handleBuyProducts}>
                Buy products
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCartContainer}>
            <div className={styles.emptyCart}>
              <span className={cx(styles.emptyCartIcon, "material-icons")}>
                add_shopping_cart
              </span>
            </div>
            <p className={styles.emptyDescription}>
              You haven't added any products yet
            </p>
          </div>
        )}
      </div>
    </Popover>
  );
};
