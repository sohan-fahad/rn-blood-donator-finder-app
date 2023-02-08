import { createSlice } from "@reduxjs/toolkit";

export const donorListSlice = createSlice({
  name: "donorsList",
  initialState: {
    value: [],
  },
  reducers: {
    addDonars: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeDonors: (state) => {
      state.value = [];
    },
  },
});

export const { addDonars, removeDonors } = donorListSlice.actions;
export const selectedDonorList = (state) => state.donorList.value;
export default donorListSlice.reducer;
