import produce from 'immer';
import {
    Post,
    FETCH_POSTS_SUCCEEDED,
    FetchPostsSucceededAction,
    SET_POSTS_IS_FETCHING,
    SetPostsIsFetchingAction,
    PostsActionTypes,
    PostsState,
} from './types';

const initialState: PostsState = {
    map: new Map<string, Post>(),
    isFetching: false,
    hasFetched: null,
};

export const postsReducers = (state = initialState, action: PostsActionTypes) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCEEDED:
            return fetchPostsSucceeded(state, action);
        case SET_POSTS_IS_FETCHING:
            return setPostsIsFetching(state, action);
        default:
            return state;
    }
};

const fetchPostsSucceeded = (state: PostsState, action: FetchPostsSucceededAction) => {
    const { response } = action.payload;

    return produce(state, draft => {
        response.forEach(post => {
            draft.map.set(post.id, post);
        });
        draft.isFetching = false;
        draft.hasFetched = new Date().toISOString();
    });
};

const setPostsIsFetching = (state: PostsState, action: SetPostsIsFetchingAction) => {
    const { isFetching } = action.payload;

    return produce(state, draft => {
        draft.isFetching = isFetching;
    });
};
