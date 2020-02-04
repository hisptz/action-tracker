import {
  actionTrackerConfigurationReducer,
  initialState
} from './action-tracker-configuration.reducer';

describe('ActionTrackerConfiguration Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = actionTrackerConfigurationReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
