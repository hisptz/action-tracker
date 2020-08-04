import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { selectAllUsers } from '../reducers/user.reducer';
import { User } from '../../models';
import { indexOf } from 'lodash';
export const getUserState = createSelector(
  getRootState,
  (state: State) => state.user
);

export const getAllUser = createSelector(getUserState, selectAllUsers);

export const getCurrentUser = createSelector(
  getAllUser,
  (users: User[]) => users[0]
);

export const getCurrentUserOrgUnit = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => (user ? user.organisationUnits : [])
);

export const getCurrentUserManagementAuthoritiesStatus = createSelector(
  getCurrentUser,
  (currentUser: User) => {
    if (!currentUser) {
      return false;
    }

    return currentUser && currentUser.authorities
      ? currentUser.authorities.includes('ALL')
      : false;
  }
);

export const getCanCreateActions = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => {
    if (
      user &&
      user.authorities &&
      (user.authorities.includes('ALL') ||
        user.authorities.includes('ACTION_TRACKER_CREATE_ACTION'))
    ) {
      return true;
    }
    return false;
  }
);
export const getCanEditActions = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => {
    if (
      user &&
      user.authorities &&
      (user.authorities.includes('ALL') ||
        user.authorities.includes('ACTION_TRACKER_EDIT_ACTION'))
    )
    {
      return true;
    }
    return false;
  }
);
export const getCanDeleteActions = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => {
    if (
      user &&
      user.authorities &&
      (user.authorities.includes('ALL') ||
        user.authorities.includes('ACTION_TRACKER_DELETE_ACTION'))
    ) {
      return true;
    }
    return false;
  }
);

export const getCanCreateActionProgress = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => {
    if (
      user &&
      user.authorities &&
      (user.authorities.includes('ALL') ||
        user.authorities.includes('ACTION_TRACKER_CREATE_PROGRESS'))
    )  {
      return true;
    }
    return false;
  }
);
export const getCanEditActionProgress = createSelector(
  getUserState,
  getCurrentUser,
  (state, user) => {
    if (
      user &&
      user.authorities &&
      (user.authorities.includes('ALL') ||
        user.authorities.includes('ACTION_TRACKER_EDIT_PROGRESS'))
    )  {
      return true;
    }
    return false;
  }
);
