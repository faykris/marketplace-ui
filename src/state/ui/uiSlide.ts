import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  shoppingCartOpen: boolean;
}

const initialState: UiState = {
  shoppingCartOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openShoppingCart: (state) => {
      state.shoppingCartOpen = true;
    },
    closeShoppingCart: (state) => {
      state.shoppingCartOpen = false;
    },
  },
});

export const { openShoppingCart, closeShoppingCart } = uiSlice.actions;
export default uiSlice.reducer;
