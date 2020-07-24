import produce from 'immer';
import {
    Areas,
    MOVE_TO_AREA,
    MoveToAreaAction,
    UIState,
    UIStateActionTypes,
} from './types';

const initialState: UIState = {
    currentArea: Areas.FEED,
};

export const uiStateReducers = (
    state = initialState,
    action: UIStateActionTypes
) => {
    switch (action.type) {
        case MOVE_TO_AREA:
            return moveToAreaReducer(state, action);
        default:
            return state;
    }
};

const moveToAreaReducer = (state: UIState, action: MoveToAreaAction) => {
    const { area } = action.payload;

    return produce(state, draft => {
        draft.currentArea = area;
    });
};
