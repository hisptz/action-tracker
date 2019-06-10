import { Action, createReducer, on } from '@ngrx/store';
import {
  addReportVisualizations,
  loadReportVisualizations
} from '../actions/report-visualization.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ReportVisualizationState extends EntityState<any> {
  loading: boolean;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

const initialState: ReportVisualizationState = adapter.getInitialState({
  loading: false
});

const reducer = createReducer(
  initialState,
  on(addReportVisualizations, (state, { visualizations }) => {
    return adapter.addAll(visualizations, { ...state, loading: false });
  }),
  on(loadReportVisualizations, state => ({ ...state, loading: true }))
);

export function reportVisualizationReducer(state, action: Action) {
  return reducer(state, action);
}
