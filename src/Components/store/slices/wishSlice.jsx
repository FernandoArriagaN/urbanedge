import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice ({
    name: 'wish',
    initialState: {
        wish: [],
        wishListOpen: false,
    },


    reducers: {
        addWish: (state, action) => {
            state.wish.push(action.payload)
        },
        removeWish: (state, action) => {
            state.wish = state.wish.filter(product => product.id !== action.payload)
        },


        openWishList: (state) => {
        state.wishListOpen = true;
        },
        closeWishList: (state) => {
        state.wishListOpen = false;
        },
        toggleWishList: (state) => {
        state.wishListOpen = !state.wishListOpen;
        }
  
    }

     
});




export const {
  addWish,
  removeWish,
  openWishList,
  closeWishList,
  toggleWishList
} = wishSlice.actions;

export default wishSlice.reducer;
