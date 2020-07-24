export const FETCH_POSTS = 'POSTS/FETCH_POSTS';
export const FETCH_POSTS_SUCCEEDED = 'POSTS/FETCH_POSTS_SUCCEEDED';
export const FETCH_POSTS_FAILED = 'POSTS/FETCH_POSTS_FAILED';
export const SET_POSTS_IS_FETCHING = 'POSTS/SET_POSTS_IS_FETCHING';

export interface Post {
    id: string;
    userId: string;
    mediaItems: MediaItem[];
    caption: string;
    likes: number;
    comments: Comment[];
}

export interface Comment {
    id: string;
    userId: string;
    postId: string;
    body: string;
    replyToId?: string;
}

export interface MediaItem {
    id: string;
    postId: string;
    uri: string;
}

export interface PostsState {
    map: Map<string, Post>;
    isFetching: boolean;
    hasFetched: string | null;
}

export interface FetchPostsAction {
    type: typeof FETCH_POSTS;
    payload: {};
}

export interface FetchPostsSucceededAction {
    type: typeof FETCH_POSTS_SUCCEEDED;
    payload: {
        response: Post[];
    };
}

export interface FetchPostsFailedAction {
    type: typeof FETCH_POSTS_FAILED;
    payload: {
        reason: string;
    };
}

export interface SetPostsIsFetchingAction {
    type: typeof SET_POSTS_IS_FETCHING;
    payload: { isFetching: boolean };
}

export type PostsActionTypes =
    | FetchPostsAction
    | FetchPostsSucceededAction
    | FetchPostsFailedAction
    | SetPostsIsFetchingAction;
