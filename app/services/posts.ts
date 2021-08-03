import { api } from './rest';
import { CreatePost, Post } from '../redux/posts/types';
import { AxiosResponse } from 'axios';

export async function getPosts(): Promise<Post[]> {
    return api.get<Post[]>('/posts').then(response => {
        return response.data;
    });
}

export async function createPost(post: CreatePost): Promise<Post> {
    return api.post<CreatePost, AxiosResponse<Post>>('/posts', post).then(response => {
        return response.data;
    });
}
