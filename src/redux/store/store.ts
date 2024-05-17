"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/auth-slice";
import languageSlice from "../slice/language-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        language: languageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
