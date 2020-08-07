/*
 * Copyright (C) Zoomdata, Inc. 2012-2020. All rights reserved.
 */

import { combineReducers } from 'redux';
import { currentUserReducers } from './currentUser';
import { postsReducers } from './posts';
import { uiStateReducers } from './uiState';

export const rootReducer = combineReducers({
    currentUser: currentUserReducers,
    uiState: uiStateReducers,
    posts: postsReducers,
});

export type AppState = ReturnType<typeof rootReducer>;
