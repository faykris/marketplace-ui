import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product, ProductPayload } from "../../types/product.ts";
import productService from "../../services/productService.ts";

interface ProductState {
  products: Product[];
  productsByOwnerId?: Product[];
  shoppingCartProducts?: Product[];
  loading: boolean;
  error?: string | null;
}

const initialState: ProductState = {
  products: [],
  productsByOwnerId: [],
  shoppingCartProducts: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await productService.getAllProducts();
  }
);

export const searchProducts = createAsyncThunk<
  Product[],
  { query: string; fromSellerDashboard?: boolean }
>("products/searchProducts", async ({ query }) => {
  return await productService.searchProducts(query);
});

export const getProductsByOwnerId = createAsyncThunk<Product[], string>(
  "products/getProductsByOwnerId",
  async (filters: string) => {
    return await productService.getProductsByOwnerId(filters);
  }
);

export const createProduct = createAsyncThunk<Product, ProductPayload>(
  "products/createProduct",
  async (newProduct: ProductPayload) => {
    return await productService.createProduct(newProduct);
  }
);

export const deleteProduct = createAsyncThunk<Product, string>(
  "products/deleteProduct",
  async (productId: string) => {
    return await productService.deleteProduct(productId);
  }
);

export const buyProducts = createAsyncThunk(
  "products/buyProducts",
  async (items: { productId: string; quantity: number }[]) => {
    return await productService.buyProducts(items);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductsByOwnerId: (state) => {
      state.productsByOwnerId = [];
      state.error = null;
    },
    resetShoppingCartQuantity: (state) => {
      state.shoppingCartProducts = [];
    },
    addToShoppingCart: (state, action) => {
      const existingProduct = state.shoppingCartProducts?.find(
        (p) => p.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.shoppingCartQuantity =
          (existingProduct.shoppingCartQuantity || 1) + 1;
      } else {
        state.shoppingCartProducts?.push({
          ...action.payload,
          shoppingCartQuantity: 1,
        });
      }
    },
    removeFromShoppingCart: (state, action) => {
      const existingProduct = state.shoppingCartProducts?.find(
        (p) => p.id === action.payload
      );
      if (existingProduct) {
        if (
          existingProduct.shoppingCartQuantity &&
          existingProduct.shoppingCartQuantity > 1
        ) {
          existingProduct.shoppingCartQuantity--;
        } else {
          state.shoppingCartProducts = state.shoppingCartProducts?.filter(
            (p) => p.id !== action.payload
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.fromSellerDashboard) {
          state.productsByOwnerId = action.payload;
        } else {
          state.products = action.payload;
        }
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error searching products";
      })
      .addCase(getProductsByOwnerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByOwnerId.fulfilled, (state, action) => {
        state.loading = false;
        state.productsByOwnerId = action.payload;
      })
      .addCase(getProductsByOwnerId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Error fetching products by owner ids";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error adding product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error deleting the product";
      })
      .addCase(buyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyProducts.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.shoppingCartProducts = [];
      })
      .addCase(buyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error buying products";
      });
  },
});

export const {
  resetProductsByOwnerId,
  addToShoppingCart,
  removeFromShoppingCart,
  resetShoppingCartQuantity,
} = productSlice.actions;
export default productSlice.reducer;
