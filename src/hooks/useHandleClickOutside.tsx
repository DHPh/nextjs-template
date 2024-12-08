import { useRef, useEffect } from "react";

export default function useHandleClickOutside<T extends HTMLElement>(callback: () => void) {
    const ref = useRef<T>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
    return ref;
}
