import { Comment } from '@finn/models/Comment';
import { MediaItem } from '@finn/models/MediaItem';
import posts from '@finn/routes/posts';
import { ObjectId } from 'mongodb';

export interface Post {
    _id: ObjectId;
    user_id: ObjectId;
    createdDate: Date;
    caption: string;
    likes: number;
    published: boolean;
    liked?: boolean;
    comments: Comment[];
    media: MediaItem[];
}

export type CreatePost = Pick<Post, 'caption' | 'comments' | 'media'>;
