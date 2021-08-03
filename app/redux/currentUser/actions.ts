import {
    CurrentUser,
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_FAILED,
    FETCH_CURRENT_USER_SUCCEEDED,
    SET_CURRENT_USER_IS_FETCHING,
    CurrentUserActionTypes,
} from './types';

export const fetchCurrentUser = (): CurrentUserActionTypes => {
    return {
        type: FETCH_CURRENT_USER,
        payload: {},
    };
};

export const fetchCurrentUserSucceeded = (
    response: CurrentUser
): CurrentUserActionTypes => {
    return {
        type: FETCH_CURRENT_USER_SUCCEEDED,
        payload: {
            response,
        },
    };
};

export const fetchCurrentUserFailed = (
    reason: string
): CurrentUserActionTypes => {
    return {
        type: FETCH_CURRENT_USER_FAILED,
        payload: {
            reason,
        },
    };
};

export const setCurrentUserIsFetching = (
    isFetching: boolean
): CurrentUserActionTypes => {
    return {
        type: SET_CURRENT_USER_IS_FETCHING,
        payload: {
            isFetching,
        },
    };
};
