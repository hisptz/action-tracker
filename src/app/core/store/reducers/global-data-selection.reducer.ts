import {
  GlobalSelectionActions,
  GlobalSelectionActionTypes
} from '../actions/global-selection.actions';

export interface State {
  dataSelections: any[];
}

export const initialState: State = {
  dataSelections: []
};

export function reducer(
  state = initialState,
  action: GlobalSelectionActions
): State {
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
