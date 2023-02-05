import { createSlice } from "@reduxjs/toolkit";

const initialCartsState = { mealsNumber: 0, showCart: false };

const headerSlice = createSlice({
  name: "header",
  initialState: initialCartsState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export default headerSlice.reducer;
export const headerActions = headerSlice.actions;
