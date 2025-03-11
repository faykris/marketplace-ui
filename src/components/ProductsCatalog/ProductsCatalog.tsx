import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import { fetchProducts } from "../../state/product/productSlice.ts";
import { ProductCard } from "../../components/ProductCard/ProductCard.tsx";
import { Spinner } from "../../components/Spinner/Spinner.tsx";
import styles from "./ProductsCatalog.module.css";
import { useNavigate } from "react-router-dom";

export const ProductsCatalog = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const sortedProducts = products
    ? [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [currentUser?.role, navigate]);

  if (error) {
    toast.error("Failed to fetch products");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.productsRoot}>
      <div className={styles.productList}>
        {currentUser?.role !== "admin" &&
          sortedProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
