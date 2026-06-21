import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "codesync_theme";

function loadThemeFromStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  } catch {
    return "dark";
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: loadThemeFromStorage(),
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, action.payload);
      } catch {
        // Ignore storage errors
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
