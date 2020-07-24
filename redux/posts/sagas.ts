import { put, call, select, all, takeEvery } from 'redux-saga/effects';
import { getPostsHasFetched, getPostsIsFetching } from './selectors';
import { FETCH_POSTS } from './types';
import { fetchPostsSucceeded, fetchPostsFailed, setPostsIsFetching } from './actions';

import { getPosts } from '../../services/posts';

export const watchers = [
    {
        type: FETCH_POSTS,
        saga: fetchPostsSaga,
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

export function* postsSaga() {
    yield all(watchers.map(watcher => takeEvery(watcher.type, watcher.saga)));
}
