export default interface MessagesProps {
    login: {
        title: string;
        username: string;
        password: string;
        forget_password: string;
        new_account: string;
        google_login: string;
    };
}

export interface MessageLanguageListProps {
    [key: string]: {
        symbol: string;
        language_tag: string;
        language_pack: string;
        name: string;
    };
}
