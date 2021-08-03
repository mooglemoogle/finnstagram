import { AppState } from '../rootReducer';

export const getCurrentUser = (state: AppState) => state.currentUser.currentUser;
export const getCurrentUserHasFetched = (state: AppState) => state.currentUser.hasFetched;
export const getCurrentUserIsFetching = (state: AppState) => state.currentUser.isFetching;
