import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store.ts";
import { getProductsByOwnerId } from "../../state/product/productSlice.ts";
import { DashboardProductCard } from "../../components/DashboardProductCard/DashboardProductCard.tsx";
import { Spinner } from "../../components/Spinner/Spinner.tsx";
import { AddProductDialog } from "../../components/AddProductDialog/AddProductDialog.tsx";
import styles from "./SellerDashboard.module.css";

export const SellerDashboard = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { productsByOwnerId, loading } = useSelector(
    (state: RootState) => state.product
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getProductsByOwnerId(currentUser.id));
    }
  }, [currentUser?.id, dispatch]);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [currentUser?.role, navigate]);

  if (loading) {
    return <Spinner />;
  }

  const sortedProducts = productsByOwnerId
    ? [...productsByOwnerId].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  return (
    <div className={styles.sellerDashboard}>
      <div className={styles.container}>
        <div className={styles.optionsContainer}>
          <h2 className={styles.title}>My products</h2>
          <div className={styles.options}>
            {currentUser && <AddProductDialog />}
          </div>
        </div>
        <div className={styles.productList}>
          {sortedProducts?.map((product) => (
            <DashboardProductCard key={product.id} product={product} />
          ))}
        </div>
        {(!productsByOwnerId || productsByOwnerId?.length === 0) && (
          <div className={styles.emptyContainer}>
            <p className={styles.noProducts}>
              {currentUser ? `No products` : "Unauthorized"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
