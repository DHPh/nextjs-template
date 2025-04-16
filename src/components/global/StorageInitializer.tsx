"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { User } from "@/stores/useAuthStore";

interface StorageInitializerProps {
    children: React.ReactNode;
}

export default function StorageInitializer({ children }: StorageInitializerProps) {
    const { setLanguage } = useLanguageStore();
    const { login } = useAuthStore();

    useEffect(() => {
        // Initialize language from localStorage
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }

        // Initialize auth from sessionStorage
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser) as User;
                login(user);
            } catch (error) {
                console.error("Failed to parse stored user:", error);
            }
        }
    }, []);

    return <>{children}</>;
}
