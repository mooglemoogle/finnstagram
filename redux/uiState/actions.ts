import { MOVE_TO_AREA, UIStateActionTypes, Areas } from './types';

export const MoveToArea = (area: Areas): UIStateActionTypes => {
    return {
        type: MOVE_TO_AREA,
        payload: {
            area,
        },
    };
};
