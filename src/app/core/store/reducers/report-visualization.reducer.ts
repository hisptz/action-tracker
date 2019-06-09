import { Action, createReducer, on } from '@ngrx/store';
import { addReportVisualizations } from '../actions/report-visualization.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ReportVisualizationState extends EntityState<any> {}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

const initialState: ReportVisualizationState = adapter.getInitialState({});

const reducer = createReducer(
  initialState,
  on(addReportVisualizations, (state, { visualizations }) => {
    return adapter.addAll(visualizations, state);
  })
);

export function reportVisualizationReducer(state, action: Action) {
  return reducer(state, action);
}
