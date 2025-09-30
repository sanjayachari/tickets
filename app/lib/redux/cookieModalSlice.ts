import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const cookieModalSlice = createSlice({
  name: "cookieSettings",
  initialState,
  reducers: {
    openCookieModal: (state) => {
      state.isModalOpen = true;
    },
    closeCookieModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openCookieModal, closeCookieModal } = cookieModalSlice.actions;

export default cookieModalSlice.reducer;
