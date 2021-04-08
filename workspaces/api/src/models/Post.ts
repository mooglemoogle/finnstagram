import { Comment } from '@finn/models/Comment';
import { MediaItem } from '@finn/models/MediaItem';

export interface Post {
    id: string;
    userId: string;
    createdDate: string;
    caption: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
    media: MediaItem[];
}
