import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    toast: toastReducer,
  },
});
