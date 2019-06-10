import { createSelector } from '@ngrx/store';

import { getRootState, State } from '../reducers';
import {
  adapter,
  ReportVisualizationState
} from '../reducers/report-visualization.reducer';

export const getReportVisualizationState = createSelector(
  getRootState,
  (state: State) => state.reportVisualization
);

export const { selectAll: getReportVisualizations } = adapter.getSelectors(
  getReportVisualizationState
);

export const getReportVisualizationLoadingStatus = createSelector(
  getReportVisualizationState,
  (state: ReportVisualizationState) => state.loading
);
