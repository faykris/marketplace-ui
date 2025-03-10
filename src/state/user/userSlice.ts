import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user.ts";
import userService from "../../services/userService.ts";

interface UserState {
  currentUser: User | null;
  sellers?: User[];
  loading: boolean;
  error?: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: undefined,
};

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId: string) => {
    return await userService.getUserById(userId);
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    return await userService.getAllUsers();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.filter((user) => user.role === "seller");
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
