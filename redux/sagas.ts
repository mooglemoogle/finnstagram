import { spawn } from '@redux-saga/core/effects';
import { currentUserSaga } from './currentUser';
import { postsSaga } from './posts';

export default function* rootSaga() {
    yield spawn(currentUserSaga);
    yield spawn(postsSaga);
}
