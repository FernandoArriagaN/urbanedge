import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    cartOpen: false,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      const priceNumber = Number(newItem.price) || 0;

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          Math.round((existingItem.totalPrice + priceNumber) * 100) / 100;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          quantity: 1,
          price: priceNumber, 
          totalPrice: priceNumber,
        });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },


    clearCart: (state) => {
      state.items = [];
    },

    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = Math.round((existingItem.totalPrice - existingItem.price) * 100) / 100;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },

    openCart: (state) => { state.cartOpen = true; },
    closeCart: (state) => { state.cartOpen = false; },
    toggleCart: (state) => { state.cartOpen = !state.cartOpen; }
  }
});


export const {
  addItem,
  removeItem,
  clearCart, 
  decreaseQuantity,
  openCart,
  closeCart,
  toggleCart
} = cartSlice.actions;

export default cartSlice.reducer;