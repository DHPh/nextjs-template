"use client";

import { Provider } from "react-redux";
import store from "../store/store";
import GetLocalStorage from "./get-local-storage/get-local-storage";
import GetSessionStorage from "./get-session-storage/get-session-storage";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <GetLocalStorage>
                <GetSessionStorage>{children}</GetSessionStorage>
            </GetLocalStorage>
        </Provider>
    );
}
