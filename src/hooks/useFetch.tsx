"use client";

import { useState, useEffect, useCallback } from "react";
import ApiResponseProps from "@/api/api-response-interface";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetch<T>(url: string, options?: RequestInit) {
    const [state, setState] = useState<UseFetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });
    const [controller, setController] = useState<AbortController | null>(null);

    const fetchData = useCallback(async () => {
        // Abort previous request
        if (controller) {
            controller.abort();
        }

        // Create new controller
        const newController = new AbortController();
        setController(newController);

        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await fetch(url, {
                ...options,
                signal: newController.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = (await response.json()) as ApiResponseProps;

            // Parse the data field if it's a string containing JSON
            let parsedData;
            try {
                parsedData =
                    typeof result.data === "string" ? JSON.parse(result.data) : result.data;
            } catch (e) {
                parsedData = result.data;
            }

            setState({
                data: parsedData as T,
                loading: false,
                error: null,
            });
        } catch (error) {
            if ((error as Error).name !== "AbortError") {
                setState({
                    data: null,
                    loading: false,
                    error: error as Error,
                });
            }
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();

        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [fetchData]);

    // Allow manual refetch
    const refetch = () => {
        fetchData();
    };

    return { ...state, refetch };
}

export default useFetch;
