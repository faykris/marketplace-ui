import React from "react";
import styles from "./TopNavBar.module.css";
import { cx } from "class-variance-authority";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store.ts";
import {
  fetchProducts,
  searchProducts,
} from "../../state/product/productSlice.ts";
import { SignInDialog } from "../SignInDialog/SignInDialog.tsx";
import { SignUpDialog } from "../SignUpDialog/SignUpDialog.tsx";
import { AccountPopover } from "../../components/AccountPopover/AccountPopover.tsx";
import { FiltersPopover } from "../../components/FiltersPopover/FiltersPopover.tsx";
import { ShoppingCartPopover } from "../../components/ShoppingCartPopover/ShoppingCartPopover.tsx";

export const TopNavBar = () => {
  const location = useLocation();
  const isSellerDashboardScreen = location.pathname === "/seller-dashboard";
  const { currentUser } = useSelector((state: RootState) => state.user);
  const filterSearchResultBySeller =
    isSellerDashboardScreen && currentUser?.role === "seller";
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [otherFilters, setOtherFilters] = useState("");

  const handleSearch = () => {
    const allFilters = `${searchQuery}${otherFilters}`;

    if (filterSearchResultBySeller) {
      const currentOwnerIdFilter = `&ownerIds=${currentUser.id}`;
      if (allFilters.trim() === "") {
        dispatch(
          searchProducts({
            query: currentOwnerIdFilter,
            fromSellerDashboard: filterSearchResultBySeller,
          })
        );
      } else {
        dispatch(
          searchProducts({
            query: `${allFilters}${currentOwnerIdFilter}`,
            fromSellerDashboard: filterSearchResultBySeller,
          })
        );
      }
    } else {
      if (allFilters.trim() === "") {
        dispatch(fetchProducts());
      } else {
        dispatch(
          searchProducts({
            query: allFilters,
          })
        );
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onSearchWithFilters = (
    minPrice?: number,
    maxPrice?: number,
    sellerIds?: string[]
  ) => {
    const minPriceString =
      minPrice !== undefined ? `&minPrice=${minPrice}` : "";
    const maxPriceString =
      maxPrice !== undefined ? `&maxPrice=${maxPrice}` : "";
    const sellerIdsString =
      sellerIds && sellerIds.length > 0
        ? `&ownerIds=${sellerIds.join(",")}`
        : "";
    const searchString = searchQuery ? searchQuery : "";
    const filters = `${searchString}${minPriceString}${maxPriceString}${sellerIdsString}`;

    setOtherFilters(`${minPriceString}${maxPriceString}${sellerIdsString}`);

    dispatch(
      searchProducts({
        query: filters,
        fromSellerDashboard: filterSearchResultBySeller,
      })
    );
  };

  return (
    <div className={styles.topNavBar}>
      <h1 className={styles.title}>MagicMarketplace</h1>
      <div className={styles.search}>
        <div className={styles.searchInput}>
          <input
            placeholder="Search by name or sku..."
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton}>
            <span
              className={cx(styles.sendIcon, "material-symbols-outlined")}
              onClick={handleSearch}
            >
              send
            </span>
          </button>
          <FiltersPopover onSearchWithFilters={onSearchWithFilters} />
        </div>
      </div>
      <div className={styles.accountActions}>
        {!currentUser && (
          <div>
            <SignUpDialog />
            <SignInDialog />
          </div>
        )}
        {currentUser && <AccountPopover currentUser={currentUser} />}
        {currentUser?.role !== "admin" && <ShoppingCartPopover />}
      </div>
    </div>
  );
};
