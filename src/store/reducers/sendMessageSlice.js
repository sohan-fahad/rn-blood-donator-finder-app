import { createSlice } from "@reduxjs/toolkit";

export const sendMessageSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: {
      appreciator: "",
      appreciated: "",
      type: "",
    },
  },
  reducers: {
    sendMessageInfo: (state, action) => {
      state.value.appreciator = action.payload?.appreciator;
      state.value.appreciated = action.payload?.appreciated;
      state.value.type = action.payload?.type;
    },
  },
});

export const { sendMessageInfo } = sendMessageSlice.actions;

export const getSendCrediential = (state) => state.sendMessage.value;
export default sendMessageSlice.reducer;
