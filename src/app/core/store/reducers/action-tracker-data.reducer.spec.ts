import {
  actionTrackerDataReducer,
  initialState
} from './action-tracker-data.reducer';

describe('ActionTrackerData Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = actionTrackerDataReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
