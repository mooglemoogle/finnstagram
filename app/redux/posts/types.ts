export const FETCH_POSTS = 'POSTS/FETCH_POSTS';
export const FETCH_POSTS_SUCCEEDED = 'POSTS/FETCH_POSTS_SUCCEEDED';
export const FETCH_POSTS_FAILED = 'POSTS/FETCH_POSTS_FAILED';
export const SET_POSTS_IS_FETCHING = 'POSTS/SET_POSTS_IS_FETCHING';
export const CREATE_POST = 'POSTS/CREATE_POST';
export const CREATE_POST_SUCCEEDED = 'POSTS/CREATE_POST_SUCCEEDED';
export const CREATE_POST_FAILED = 'POSTS/CREATE_POST_FAILED';
export const UPDATE_POST = 'POSTS/UPDATE_POST';
export const UPDATE_POST_SUCCEEDED = 'POSTS/UPDATE_POST_SUCCEEDED';
export const UPDATE_POST_FAILED = 'POSTS/UPDATE_POST_FAILED';

export interface Post {
    _id: string;
    user_id: string;
    media: MediaItem[];
    caption: string;
    likes: number;
    comments: Comment[];
}

export interface CreatePost {
    media: CreateMediaItem[];
    caption?: string;
}

export interface Comment {
    _id: string;
    user_id: string;
    displayName: string;
    body: string;
    replyToId?: string;
}

export interface CreateComment {
    body: string;
    replyToId?: string;
}

export interface MediaItem {
    _id: string;
    uri: string;
    liveUri?: string;
}

export interface CreateMediaItem {
    uri: string;
    liveUri?: string;
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

export interface CreatePostAction {
    type: typeof CREATE_POST;
    payload: { post: CreatePost }
}

export interface CreatePostSucceededAction {
    type: typeof CREATE_POST_SUCCEEDED;
    payload: { post: Post }
}

export interface CreatePostFailedAction {
    type: typeof CREATE_POST_FAILED;
    payload: { post: CreatePost, error: Error }
}

export interface UpdatePostAction {
    type: typeof UPDATE_POST;
    payload: { post: CreatePost }
}

export interface UpdatePostSucceededAction {
    type: typeof UPDATE_POST_SUCCEEDED;
    payload: { post: Post }
}

export interface UpdatePostFailedAction {
    type: typeof UPDATE_POST_FAILED;
    payload: { post: CreatePost, error: Error }
}

export type PostsActionTypes =
    | FetchPostsAction
    | FetchPostsSucceededAction
    | FetchPostsFailedAction
    | SetPostsIsFetchingAction
    | CreatePostAction
    | CreatePostSucceededAction
    | CreatePostFailedAction
    | UpdatePostAction
    | UpdatePostSucceededAction
    | UpdatePostFailedAction;
