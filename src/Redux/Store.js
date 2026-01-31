import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slice/authSlice";
import { productSlice } from "./Slice/productSlice";
import { userSlice } from "./Slice/userSlice";
import userAuthSlice from "./Slice/userAuthSlice";
import cartSlice from "./Slice/cartSlice";

export const Store = configureStore({
    reducer:{
        authKey : authSlice.reducer,
        prodKey : productSlice.reducer,
        userKey : userSlice.reducer,
        userAuthKey : userAuthSlice,
        cartKey : cartSlice,
    }
})