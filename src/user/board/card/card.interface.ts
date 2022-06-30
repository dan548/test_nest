export interface CommentResponse {
    uuid: string;
    content: string;
}

export interface CardResponse {
    uuid: string;
    title: string;
    order: number;
    comments: CommentResponse[]
}