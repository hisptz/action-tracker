import { createSelector } from "@ngrx/store";
import {
  getActionTrackerWidgetState,
  ActionTrackerWidgetState
} from "../reducers";
import { selectAllUsers } from "../reducers/user.reducer";
import { User } from "../../models";
export const getUserState = createSelector(
  getActionTrackerWidgetState,
  (state: ActionTrackerWidgetState) => state.user
);

export const getAllUser = createSelector(
  getUserState,
  selectAllUsers
);

export const getCurrentUser = createSelector(
  getAllUser,
  (users: User[]) => users[0]
);
