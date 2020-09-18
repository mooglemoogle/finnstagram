import { api } from './rest';
import { Post } from '../redux/posts/types';

export async function getPosts(): Promise<Post[]> {
    // return api.get<Post[]>('/posts').then(response => {
    //     return response.data;
    // });

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
                comments: [
                    {
                        userId: 'Gordon',
                        id: '1',
                        postId: '1',
                        body: 'First!',
                    },
                    {
                        userId: 'Franco',
                        id: '2',
                        postId: '1',
                        body: 'What a great picture! And great word wrapping wrapping wrapping wrapping wrapping.',
                    },
                ],
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
                comments: [
                    {
                        userId: 'Franco',
                        id: '1',
                        postId: '2',
                        body: "Too slow, sucka'!",
                    },
                ],
                likes: 63,
            },
        ])
    );
}
