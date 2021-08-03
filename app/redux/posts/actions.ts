import {
    Post,
    FETCH_POSTS,
    FETCH_POSTS_FAILED,
    FETCH_POSTS_SUCCEEDED,
    SET_POSTS_IS_FETCHING,
    PostsActionTypes,
    CreatePost,
    CREATE_POST,
    CREATE_POST_FAILED,
    CREATE_POST_SUCCEEDED,
} from './types';

export const fetchPosts = (): PostsActionTypes => {
    return {
        type: FETCH_POSTS,
        payload: {},
    };
};

export const fetchPostsSucceeded = (response: Post[]): PostsActionTypes => {
    return {
        type: FETCH_POSTS_SUCCEEDED,
        payload: {
            response,
        },
    };
};

export const fetchPostsFailed = (reason: string): PostsActionTypes => {
    return {
        type: FETCH_POSTS_FAILED,
        payload: {
            reason,
        },
    };
};

export const setPostsIsFetching = (isFetching: boolean): PostsActionTypes => {
    return {
        type: SET_POSTS_IS_FETCHING,
        payload: {
            isFetching,
        },
    };
};

export const createPost = (post: CreatePost): PostsActionTypes => {
    return {
        type: CREATE_POST,
        payload: {
            post,
        },
    };
};

export const createPostSucceeded = (post: Post): PostsActionTypes => {
    return {
        type: CREATE_POST_SUCCEEDED,
        payload: {
            post,
        },
    };
};

export const createPostFailed = (post: CreatePost, error: Error): PostsActionTypes => {
    return {
        type: CREATE_POST_FAILED,
        payload: {
            post,
            error,
        },
    };
};
