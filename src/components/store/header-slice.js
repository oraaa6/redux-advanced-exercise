import { createSlice } from "@reduxjs/toolkit";

const initialCartsState = { showCart: false, notification: null };

const headerSlice = createSlice({
  name: "header",
  initialState: initialCartsState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }; // wyświetlanie statusu, tytułu, wiadomosci(error itp) podczas request PUT
    },
  },
});

export default headerSlice.reducer;
export const headerActions = headerSlice.actions;
