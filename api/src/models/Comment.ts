import { ObjectId } from 'mongodb';

export interface Comment {
    _id: ObjectId;
    user_id: ObjectId;
    createdDate: string;
    body: string;
    replyToId?: ObjectId;
    likes: number;
    liked?: boolean;
}
