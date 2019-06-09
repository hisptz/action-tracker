import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { adapter } from '../reducers/report-visualization.reducer';

export const getReportVisualizationState = createSelector(
  getRootState,
  (state: State) => state.reportVisualization
);

export const { selectAll: getReportVisualizations } = adapter.getSelectors(
  getReportVisualizationState
);
