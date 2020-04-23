import * as _ from 'lodash';
import { User } from '../../../../../../core/models/user.model';

export function getFilteredInterventionsBasedOnSharing(
  interventions: any[],
  currentUser: User
): any[] {
  if (!interventions || !currentUser) {
    return [];
  }

  // get user interventions
  const userIntervention = _.filter(
    interventions,
    (intervention: any) =>
      intervention.user && intervention.user.id === currentUser.id
  );

  // get interventions based on user groups accesses
  const interventionsByUserGroupsAccess = _.filter(
    interventions,
    (intervention: any) =>
      _.some(
        intervention.userGroupAccesses || [],
        (userGroupAccess: any) =>
          _.filter(
            currentUser.userGroups || [],
            (userGroup: any) => userGroup.id === userGroupAccess.id
          ).length > 0
      )
  );

  // get interventions based on user accesses
  const interventionsByUsersAccess = _.filter(
    interventions,
    (intervention: any) =>
      _.some(
        intervention.userAccesses || [],
        (userAccess: any) => userAccess.id === currentUser.id
      )
  );

  // get intervention based on public or external access
  const interventionsByPublicOrExternalAccess = _.filter(
    interventions,
    (intervention: any) =>
      intervention.externalAccess || intervention.publicAccess !== '--------'
  );

  return _.uniqBy(
    [
      ...userIntervention,
      ...interventionsByUserGroupsAccess,
      ...interventionsByUsersAccess,
      ...interventionsByPublicOrExternalAccess
    ],
    'id'
  );
}
