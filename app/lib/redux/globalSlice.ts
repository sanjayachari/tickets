import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrencyInfo = {
  currencyCode: string;
  currencySymbol: string;
  currencyValue: number;
  countryCode: string;
};

export type GlobalState = {
  currency: CurrencyInfo;
  language: string;
  theme: "light" | "dark";
};

const initialState: GlobalState = {
  currency: {
    currencyCode: "INR",
    currencySymbol: "₹",
    currencyValue: 1,
    countryCode: "IN",
  },
  language: "en",
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateCurrencyInfo: (state, action: PayloadAction<CurrencyInfo>) => {
      state.currency = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { updateCurrencyInfo, updateLanguage, toggleTheme } =
  globalSlice.actions;

export default globalSlice.reducer;
