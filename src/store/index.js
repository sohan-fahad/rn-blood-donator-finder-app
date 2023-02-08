import { configureStore, combineReducers } from "@reduxjs/toolkit";
import addBloodGroupReducer from "./reducers/addBloodGroupSlice";
import counterReducer from "./reducers/counterSlice";
import donorListReducer from "./reducers/donarsListSlice";
import donorFilterReducer from "./reducers/donorListFilterSlice";
import loadingBtnReducer from "./reducers/isLoadingBtnSlice";
import userInfoReducer from "./reducers/userInfoSlice";
import tokenInfoReducer from "./reducers/tokenSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  addBloodGroup: addBloodGroupReducer,
  donorList: donorListReducer,
  donorsFilter: donorFilterReducer,
  btnLoaging: loadingBtnReducer,
  addUserInfo: userInfoReducer,
  addTokenInfo: tokenInfoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
