import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js"
const Store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default Store;