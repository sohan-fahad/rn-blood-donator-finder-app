// import { createSlice } from "@reduxjs/toolkit";

// export const addAreaListSlice = createSlice({
//   name: "areaList",
//   initialState: {
//     value: [],
//   },
//   reducers: {
//     addAreas: (state, action) => {
//       state.value = action.payload;
//     },
//     removeAreas: (state) => {
//       state = [];
//     },
//   },
// });

// export const { addAreas, removeAreas } = addAreaListSlice.actions;
// export const selectAreas = (state) => state.areaList.value;
// export default addAreaListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const addAreaListSlice = createSlice({
  name: "areaList",
  initialState: {
    value: [],
  },
  reducers: {
    addAreas: (state, action) => {
      state.value = action.payload;
    },
    removeAreas: (state) => {
      state = [];
    },
  },
});

export const { addAreas, removeAreas } = addAreaListSlice.actions;
export const getAreaList = (state) => state.areaList.value;
export default addAreaListSlice.reducer;
