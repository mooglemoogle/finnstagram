export const MOVE_TO_AREA = 'UI_STATE/MOVE_TO_AREA';

export enum Areas {
    FEED = 'FEED',
    ADD = 'ADD',
    USER = 'USER',
}

export interface UIState {
    currentArea: Areas;
}

export interface MoveToAreaAction {
    type: typeof MOVE_TO_AREA;
    payload: {
        area: Areas;
    };
}

export type UIStateActionTypes = MoveToAreaAction;
