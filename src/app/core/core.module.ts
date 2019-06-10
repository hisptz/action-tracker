import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { RoutingModule } from '../app.routes';
import { NavigationBarComponent } from './containers/navigation-bar/navigation-bar.component';
import {
  Dhis2ApiService,
  IndexDbService,
  IndexDbServiceConfig
} from './services';
import { effects } from './store/effects';
import { metaReducers, reducers } from './store/reducers';
import { RouteSerializer } from './utils';
import { MatButtonModule } from '@angular/material/button';

export function initialize(dhis2ApiService: Dhis2ApiService) {
  return () => dhis2ApiService.initialize();
}

export function initializeDb(indexDbServiceConfig: IndexDbServiceConfig) {
  return () => new IndexDbService(indexDbServiceConfig);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),

    RoutingModule,

    // ngrx/router-store keeps router state up-to-date in the store
    StoreRouterConnectingModule.forRoot(),

    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [NavigationBarComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [Dhis2ApiService],
      multi: true
    },
    { provide: RouterStateSerializer, useClass: RouteSerializer }
  ],
  exports: [RoutingModule, NavigationBarComponent]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }

  static forRoot(config: IndexDbServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: IndexDbServiceConfig, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeDb,
          deps: [IndexDbServiceConfig],
          multi: true
        }
      ]
    };
  }
}
