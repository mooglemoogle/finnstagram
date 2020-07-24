import { AppState } from '../rootReducer';

export const getPosts = (state: AppState) => state.posts.map;
export const getPostsHasFetched = (state: AppState) => state.posts.hasFetched;
export const getPostsIsFetching = (state: AppState) => state.posts.isFetching;
