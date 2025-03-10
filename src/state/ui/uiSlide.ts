import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  showLoginModal: boolean;
  showRegisterModal: boolean;
}

const initialState: UiState = {
  showLoginModal: false,
  showRegisterModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
    },
    toggleRegisterModal: (state) => {
      state.showRegisterModal = !state.showRegisterModal;
    },
  },
});

export default uiSlice.reducer;
