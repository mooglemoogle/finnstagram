export const FETCH_CURRENT_USER = 'CURRENT_USER/FETCH_CURRENT_USER';
export const FETCH_CURRENT_USER_SUCCEEDED =
    'CURRENT_USER/FETCH_CURRENT_USER_SUCCEEDED';
export const FETCH_CURRENT_USER_FAILED =
    'CURRENT_USER/FETCH_CURRENT_USER_FAILED';
export const SET_CURRENT_USER_IS_FETCHING =
    'CURRENT_USER/SET_CURRENT_USER_IS_FETCHING';

export interface CurrentUser {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface CurrentUserState {
    currentUser: CurrentUser | null;
    isFetching: boolean;
    hasFetched: string | null;
}

export interface FetchCurrentUserAction {
    type: typeof FETCH_CURRENT_USER;
    payload: {};
}

export interface FetchCurrentUserSucceededAction {
    type: typeof FETCH_CURRENT_USER_SUCCEEDED;
    payload: {
        response: CurrentUser;
    };
}

export interface FetchCurrentUserFailedAction {
    type: typeof FETCH_CURRENT_USER_FAILED;
    payload: {
        reason: string;
    };
}

export interface SetCurrentUserIsFetchingAction {
    type: typeof SET_CURRENT_USER_IS_FETCHING;
    payload: { isFetching: boolean };
}

export type CurrentUserActionTypes =
    | FetchCurrentUserAction
    | FetchCurrentUserSucceededAction
    | FetchCurrentUserFailedAction
    | SetCurrentUserIsFetchingAction;
