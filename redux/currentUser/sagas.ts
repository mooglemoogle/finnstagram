import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { getCurrentUserHasFetched, getCurrentUserIsFetching } from './selectors';
import { FETCH_CURRENT_USER } from './types';
import { fetchCurrentUserSucceeded, fetchCurrentUserFailed, setCurrentUserIsFetching } from './actions';

import { getCurrentUser } from '../../services/currentUser';

export const watchers = [
    {
        type: FETCH_CURRENT_USER,
        saga: fetchCurrentUserSaga,
    },
];

export function* fetchCurrentUserSaga() {
    try {
        const isFetching = yield select(getCurrentUserIsFetching);
        const hasFetched = yield select(getCurrentUserHasFetched);

        if (isFetching || hasFetched) {
            return;
        }

        yield put(setCurrentUserIsFetching(true));

        const currentUser = yield call(getCurrentUser);

        yield put(fetchCurrentUserSucceeded(currentUser));
    } catch (error) {
        yield put(fetchCurrentUserFailed(error));
    }
}

export function* currentUserSaga() {
    yield all(watchers.map(watcher => takeEvery(watcher.type, watcher.saga)));
}
