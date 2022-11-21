import { configureStore, combineReducers } from "@reduxjs/toolkit";
import addBloodGroupReducer from "./reducers/addBloodGroupSlice";
import counterReducer from "./reducers/counterSlice";
import donorListReducer from "./reducers/donarsListSlice";
import donorFilterReducer from "./reducers/donorListFilterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  addBloodGroup: addBloodGroupReducer,
  donorList: donorListReducer,
  donorsFilter: donorFilterReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
