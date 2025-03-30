import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth/authSlice";
import blogReducer from "./Slices/blog/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
