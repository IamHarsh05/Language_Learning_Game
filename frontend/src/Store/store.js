import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "../Pages/Home/tabSlice";

const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});

export default store;
