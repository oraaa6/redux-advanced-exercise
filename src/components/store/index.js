import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./mealCounter-slice";
import headerSlice from "./header-slice";

const store = configureStore({
  reducer: { cart: cartSlice, header: headerSlice },
});

export default store;
