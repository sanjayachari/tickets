import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;
