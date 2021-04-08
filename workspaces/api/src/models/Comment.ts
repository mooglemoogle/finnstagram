export interface Comment {
    userId: string;
    id: string;
    postId: string;
    createdDate: string;
    body: string;
    replyToId?: string;
    likes: number;
    liked: boolean;
}
