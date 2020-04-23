import {
  GlobalSelectionActions,
  GlobalSelectionActionTypes
} from '../actions/global-selection.actions';

export interface DataSelectionState {
  dataSelections: any[];
}

export const initialState: DataSelectionState = {
  dataSelections: []
};

export function dataSelectionReducer(
  state = initialState,
  action: GlobalSelectionActions
): DataSelectionState {
  switch (action.type) {
    case GlobalSelectionActionTypes.UpsertDataSelections: {
      return {
        dataSelections: action.dataSelections
      };
    }

    default: {
      return state;
    }
  }
}
