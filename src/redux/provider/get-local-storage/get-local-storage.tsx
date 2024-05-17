"use client";

// import { useLayoutEffect } from "react";
// import { useDispatch } from "react-redux";
// import { changeLanguage } from "@/redux/slice/language-slice";
// import locale from "@/messages/detect-location";

interface GetLocalStorageProps {
    children: React.ReactNode;
}

export default function GetLocalStorage({ children }: GetLocalStorageProps) {
    // const dispatch = useDispatch();

    // useLayoutEffect(() => {
    //     const language: string | null = localStorage.getItem("language") || null;

    //     if (language) {
    //         dispatch(changeLanguage(language));
    //     } else {
    //         dispatch(changeLanguage(locale));
    //     }
    // }, []);

    return children;
}
