import { useLanguageStore } from "@/stores/useLanguageStore";
import MessagesProps from "./messages-interface";
import enUS from "./languages/en-us";
import ruRU from "./languages/ru-ru";
import viVN from "./languages/vi-vn";

export default function useMessages(): MessagesProps {
    let messages: MessagesProps;

    const { language } = useLanguageStore();

    switch (language) {
        case "en-us":
            messages = enUS;
            break;
        case "ru-ru":
            messages = ruRU;
            break;
        case "vi-vn":
            messages = viVN;
            break;
        default:
            messages = viVN;
    }

    return messages;
}
