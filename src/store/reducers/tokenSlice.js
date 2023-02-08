import { createSlice } from "@reduxjs/toolkit";

export const tokenInfoSlice = createSlice({
  name: "tokenInfo",
  initialState: {
    value: { token: "", refreshToken: "" },
  },
  reducers: {
    addTokenInfo: (state, action) => {
      state.value = action.payload;
    },
    removeTokenInfo: (state) => {
      state.value = { token: "", refreshToken: "" };
    },
  },
});

export const { addTokenInfo, removeTokenInfo } = tokenInfoSlice.actions;

export const getTokenInfo = (state) => state.addTokenInfo.value;
export default tokenInfoSlice.reducer;
