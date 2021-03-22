import {
    Post,
    FETCH_POSTS,
    FETCH_POSTS_FAILED,
    FETCH_POSTS_SUCCEEDED,
    SET_POSTS_IS_FETCHING,
    PostsActionTypes,
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
