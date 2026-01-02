import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishReducer from "./slices/wishSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        wish: wishReducer
    }
});


export default store;