import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload; // osobny obiekt to bedzie, który będzie pushowany do tej pustej tablicy
      const existingItem = state.items.find((item) => item.id === newItem.id); //sprawdza czy ten item (obiekt) istnieje juz w tablicy
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } // jeśli to nie jest isniejący item w tablicy, to go dodaje
      else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemToCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id); // znalezienie itemu ktory ma zostac usuniety
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id); // jesli któreś id nie będzie pasowało, to stwórz nową tablicę bez tego elementu
      } // jeśli jest item w ilości 1, to usun calkowicie z tablicy
      else {
        existingItem.quantity--; //jesli w tabicy jest ten item, który jest w ilosci wiekszej niz 1, to po prostu zredukuj do mniejszej liczby
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
