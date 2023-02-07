import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: {},
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.value = action.payload;
    },
    removeUserInfo: (state) => {
      state.value = {};
    },
  },
});

export const { addUserInfo, removeUserInfo } = userInfoSlice.actions;

export const getUserInfo = (state) => state.addUserInfo.value;
export default userInfoSlice.reducer;
