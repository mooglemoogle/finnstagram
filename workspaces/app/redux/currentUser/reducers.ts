import produce from 'immer';
import {
    FETCH_CURRENT_USER_SUCCEEDED,
    FetchCurrentUserSucceededAction,
    SET_CURRENT_USER_IS_FETCHING,
    SetCurrentUserIsFetchingAction,
    CurrentUserActionTypes,
    CurrentUserState,
} from './types';

const initialState: CurrentUserState = {
    currentUser: null,
    isFetching: false,
    hasFetched: null,
};

export const currentUserReducers = (
    state = initialState,
    action: CurrentUserActionTypes
) => {
    switch (action.type) {
        case FETCH_CURRENT_USER_SUCCEEDED:
            return fetchCurrentUserSucceeded(state, action);
        case SET_CURRENT_USER_IS_FETCHING:
            return setCurrentUserIsFetching(state, action);
        default:
            return state;
    }
};

const fetchCurrentUserSucceeded = (
    state: CurrentUserState,
    action: FetchCurrentUserSucceededAction
) => {
    const { response } = action.payload;

    return produce(state, draft => {
        draft.currentUser = response;
        draft.isFetching = false;
        draft.hasFetched = new Date().toISOString();
    });
};

const setCurrentUserIsFetching = (
    state: CurrentUserState,
    action: SetCurrentUserIsFetchingAction
) => {
    const { isFetching } = action.payload;

    return produce(state, draft => {
        draft.isFetching = isFetching;
    });
};
