import { createSlice } from "@reduxjs/toolkit";

export const donorListFilterSlice = createSlice({
  name: "filterDonors",
  initialState: {
    value: { bloodGroup: "", division: "", district: "", subDistrict: "" },
  },
  reducers: {
    addDonatorFilter: (state, action) => {
      state.value = action.payload;
    },
    removeFilter: (state) => {
      state.value = {
        bloodGroup: "",
        division: "",
        district: "",
        subDistrict: "",
      };
    },
  },
});

export const { addDonatorFilter, removeFilter } = donorListFilterSlice.actions;
export const selectFilterObj = (state) => state.donorsFilter.value;
export default donorListFilterSlice.reducer;
