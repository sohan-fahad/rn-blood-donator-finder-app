import { configureStore, combineReducers } from "@reduxjs/toolkit";
import addBloodGroupReducer from "./reducers/addBloodGroupSlice";
import counterReducer from "./reducers/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  addBloodGroup: addBloodGroupReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
