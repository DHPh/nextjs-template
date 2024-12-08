import { useEffect, useState } from "react";

interface KeyInfo {
    key: string;
    target: HTMLElement;
}

function useKeyDownEvent(onKeyDown?: (e: KeyInfo) => void) {
    const [keyInfo, setKeyInfo] = useState<KeyInfo>({
        key: "",
        target: document.body,
    });

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            setKeyInfo({ key: e.key, target });
            if (onKeyDown) {
                onKeyDown({ key: e.key, target });
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, [onKeyDown]);

    return keyInfo;
}

export default useKeyDownEvent;
