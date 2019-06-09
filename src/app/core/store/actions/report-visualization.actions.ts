import { createAction, props } from '@ngrx/store';

export const addReportVisualizations = createAction(
  '[Report] Add visualizations',
  props<{ visualizations: any }>()
);
