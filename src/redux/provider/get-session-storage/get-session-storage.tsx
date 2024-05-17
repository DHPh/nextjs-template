"use client";

//! TEST SESSION STORAGE
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { User, loginSuccess } from "../../slice/auth-slice";

interface GetSessionStorageProps {
    children: React.ReactNode;
}

export default function GetSessionStorage({ children }: GetSessionStorageProps) {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const user: User | null = JSON.parse(sessionStorage.getItem("user") || "null");

        if (user) {
            dispatch(loginSuccess(user));
        }
    }, []);

    return children;
}
