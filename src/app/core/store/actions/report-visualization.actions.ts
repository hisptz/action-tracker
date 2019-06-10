import { createAction, props } from '@ngrx/store';

export const addReportVisualizations = createAction(
  '[Report] Add report visualizations',
  props<{ visualizations: any }>()
);

export const loadReportVisualizations = createAction(
  '[Report] Load report visualizations'
);
