"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

function useTheme() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof window === "undefined") return;

        const savedTheme = localStorage.getItem("theme") as Theme | null;

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
}

export default useTheme;
