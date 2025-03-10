import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import { fetchProducts } from "../../state/product/productSlice.ts";
import { Spinner } from "../../components/Spinner/Spinner.tsx";
import { DashboardProductCard } from "../../components/DashboardProductCard/DashboardProductCard.tsx";
import styles from "./AdminDashboard.module.css";
import { fetchAllUsers } from "../../state/user/userSlice.ts";

export const AdminDashboard = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { productsByOwnerId, loading, products } = useSelector(
    (state: RootState) => state.product
  );
  const adminProducts =
    productsByOwnerId && productsByOwnerId.length > 0
      ? productsByOwnerId
      : products;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchProducts());
    }
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const sortedProducts = adminProducts
    ? [...adminProducts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Admin</h2>
        </div>
        <div className={styles.productList}>
          {sortedProducts?.map((product) => (
            <DashboardProductCard
              key={product.id}
              product={product}
              isAdmin={currentUser?.role === "admin"}
            />
          ))}
        </div>
        {(!adminProducts || adminProducts?.length === 0) && (
          <div className={styles.emptyContainer}>
            <p className={styles.noProducts}>
              {currentUser ? `Empty` : "Unauthorized"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
