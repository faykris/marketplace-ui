import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials } from "../../types/auth.ts";
import authService from "../../services/authService.ts";
import { User } from "../../types/user.ts";

interface AuthState {
  user?: User | null;
  token?: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  loading: false,
  error: undefined,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: Credentials) => {
    return await authService.register(credentials);
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: Credentials) => {
    return await authService.login(credentials);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (!("error" in action.payload) && "token" in action.payload) {
          state.loading = false;

          if (action.payload.token) {
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("userId", action.payload.id.toString());
          }
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (!("error" in action.payload) && "token" in action.payload) {
          state.loading = false;

          localStorage.setItem("authToken", action.payload.token);
          localStorage.setItem("userId", action.payload.id.toString());
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
