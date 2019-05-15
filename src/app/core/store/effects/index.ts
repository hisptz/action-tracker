import { UserEffects } from './user.effects';
import { SystemInfoEffects } from './system-info.effects';
import { RouterEffects } from './router.effects';
import { ActionTrackerConfigurationEffects } from './action-tracker-configuration.effects';
import { ActionTrackerDataEffects } from './action-tracker-data.effects';

export const effects: any[] = [
  UserEffects,
  SystemInfoEffects,
  RouterEffects,
  ActionTrackerConfigurationEffects,
  ActionTrackerDataEffects
];
