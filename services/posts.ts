import { Post } from '../redux/posts/types';

export const getPosts = (): Promise<Post[]> => {
    // Mock function
    return new Promise(resolve =>
        resolve([
            {
                id: '1',
                userId: '1',
                mediaItems: [
                    {
                        id: '1',
                        postId: '1',
                        uri: 'http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg',
                    },
                ],
                caption: 'Test Post 1',
                comments: [],
                likes: 21,
            },
            {
                id: '2',
                userId: '1',
                mediaItems: [
                    {
                        id: '2',
                        postId: '2',
                        uri: 'http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg',
                    },
                ],
                caption: 'Test Post 2',
                comments: [],
                likes: 63,
            },
        ])
    );
};
