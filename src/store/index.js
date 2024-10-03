/*
Readme
==============================================================================
Directory
store
    |- slices
    |       |-yourSlice1.js (Eg.: constantSlice.js)
    |       |-yourSlice2.js
    |       |-yourSlice3.js
    |- index.js
*/

import { configureStore } from "@reduxjs/toolkit";
import { dark, userSlice } from "./slices/constantSlice";

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        dark: dark.reducer,
    }
})

export default store;