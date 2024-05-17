interface ApiResponseProps {
    status: string; // "OK/ERROR",
    data: string; // {bỏ toàn bộ output vô đây},
    message: string; // "Nội dung thông báo",
    message_vi: string; // "Như ở trên nhưng tiếng việt",
}

export default ApiResponseProps;
