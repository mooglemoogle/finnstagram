import { Post } from '@finn/models/Post';
import { commentMap } from '../comments';

const post: Post = {
    id: '2',
    userId: '1',
    createdDate: '2020-09-11T00:01:02.123',
    caption: 'Test Post 2',
    likes: 63,
    liked: false,
    media: [
        {
            id: '3',
            postId: '2',
            createdDate: '2020-09-11T00:01:02.123',
            uri: 'http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg',
        },
    ],
    topComments: [commentMap['3']],
};

export default post;
