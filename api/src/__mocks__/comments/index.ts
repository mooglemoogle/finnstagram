import { Comment } from '@finn/models/Comment';

const comments: Comment[] = [
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
    {
        userId: 'Franco',
        id: '3',
        postId: '2',
        createdDate: '2020-09-11T00:01:02.123',
        body: "Too slow, sucka'!",
        likes: 10,
        liked: false,
    },
];

const commentMap = comments.reduce<Record<string, Comment>>((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

export { commentMap };

export default comments;
