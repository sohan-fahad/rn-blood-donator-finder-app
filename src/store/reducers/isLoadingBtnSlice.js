import { createSlice } from "@reduxjs/toolkit";

const isLoadingBtnSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    startLoading: (state) => {
      state.value = true;
    },
    stopLoading: (state) => {
      state.value = false;
    },
  },
});

export const { startLoading, stopLoading } = isLoadingBtnSlice.actions;
export const selectLoagingState = (state) => state.btnLoaging.value;
export default isLoadingBtnSlice.reducer;
