import { Post } from '@finn/models/Post';
import { commentMap } from '@finn/mocks/comments';

const post: Post = {
    id: '1',
    userId: '1',
    createdDate: '2020-09-10T00:31:32.123Z',
    caption: 'Test Post 1',
    likes: 21,
    liked: false,
    media: [
        {
            id: '1234',
            postId: '1',
            createdDate: '2020-09-10T00:31:32.123Z',
            uri: 'http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg',
        },
    ],
    topComments: [commentMap['1'], commentMap['2']],
};

export default post;
