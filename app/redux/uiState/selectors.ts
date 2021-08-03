import { AppState } from '../rootReducer';

export const getCurrentUIArea = (state: AppState) => state.uiState.currentArea;
