import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product, ProductPayload } from "../../types/product.ts";
import productService from "../../services/productService.ts";

interface ProductState {
  products: Product[];
  productsByOwnerId?: Product[];
  loading: boolean;
  error?: string | null;
}

const initialState: ProductState = {
  products: [],
  productsByOwnerId: [],
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductsByOwnerId: (state) => {
      state.productsByOwnerId = [];
      state.error = null;
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
      });
  },
});

export const { resetProductsByOwnerId } = productSlice.actions;
export default productSlice.reducer;
