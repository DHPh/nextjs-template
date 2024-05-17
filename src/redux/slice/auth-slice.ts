/* eslint-disable no-param-reassign */
//! TEST REDUX SLICE, MODIFY AS NEEDED
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    name: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            //! TEST SAVING TO SESSION STORAGE
            if (state.user?.email !== action.payload.email) {
                sessionStorage.setItem("user", JSON.stringify(action.payload));
                console.log("sessionStorage", sessionStorage);
            }
            console.log("loginSuccess", action.payload);
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            sessionStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
