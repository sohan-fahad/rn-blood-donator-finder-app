import { createSlice } from "@reduxjs/toolkit";

export const addBloodGroupSlice = createSlice({
  name: "blood",
  initialState: {
    value: "",
  },
  reducers: {
    addBloodGroup: (state, action) => {
      state.value = action.payload;
    },
    removeBloodGroup: (state) => {
      state = "";
    },
  },
});

export const { addBloodGroup, removeBloodGroup } = addBloodGroupSlice.actions;
export const selectBloodGroup = (state) => state.addBloodGroup.value;
export default addBloodGroupSlice.reducer;
