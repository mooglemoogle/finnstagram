import { put, call, select, all, takeEvery } from 'redux-saga/effects';
import { getPostsHasFetched, getPostsIsFetching } from './selectors';
import { CreatePostAction, CREATE_POST, FETCH_POSTS } from './types';
import { fetchPostsSucceeded, fetchPostsFailed, setPostsIsFetching, createPostSucceeded, createPostFailed } from './actions';

import { createPost, getPosts } from '../../services/posts';

export const watchers = [
    {
        type: FETCH_POSTS,
        saga: fetchPostsSaga,
    },
    {
        type: CREATE_POST,
        saga: createPostSaga,
    },
];

export function* fetchPostsSaga() {
    try {
        const isFetching = yield select(getPostsIsFetching);
        const hasFetched = yield select(getPostsHasFetched);

        if (isFetching || hasFetched) {
            return;
        }

        yield put(setPostsIsFetching(true));

        const posts = yield call(getPosts);

        yield put(fetchPostsSucceeded(posts));
    } catch (error) {
        yield put(fetchPostsFailed(error));
    }
}

export function* createPostSaga({payload: {post}}: CreatePostAction) {
    try {
        const createdPost = yield call(createPost, post);

        yield put(createPostSucceeded(createdPost));
    } catch (error) {
        yield put(createPostFailed(post, error));
    }
}

export function* postsSaga() {
    yield all(watchers.map(watcher => takeEvery(watcher.type, watcher.saga)));
}
