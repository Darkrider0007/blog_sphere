import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
  fullName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    signup: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (
        storedUser &&
        storedUser.username === action.payload.username &&
        storedUser.password === action.payload.password
      ) {
        state.user = storedUser;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
      } else {
        state.error = "Invalid username or password";
        state.isAuthenticated = false;
        state.loading = false;
      }
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { signup, login, logout, updateProfile, setLoading, clearError } =
  authSlice.actions;
export default authSlice.reducer;
