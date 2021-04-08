import { Post } from '@finn/models/Post';

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
    comments: [
        {
            userId: 'Gordon',
            id: '1',
            postId: '1',
            createdDate: '2020-09-10T00:31:32.123Z',
            body: 'Ooga Booga!',
            likes: 10,
            liked: false,
        },
        {
            userId: 'Franco',
            id: '2',
            postId: '1',
            createdDate: '2020-09-10T00:31:32.123Z',
            body: 'What a great picture! And great word wrapping wrapping wrapping wrapping wrapping.',
            likes: 14,
            liked: false,
        },
    ],
};

export default post;
